"use strict";

const EventEmitter = require('events');
const requestp = require('request-promise');

const AUTH_STATUS = {
    UNAUTHENTICATED: 0,
    AUTHENTICATED: 1,
    FAILED: 2
};

const AUTH_EVENT = 'authentication';

class SwiftAuthenticator extends EventEmitter {
    constructor(authUrl, username, password) {
        super();

        // Authenticated credentials
        let url;
        let token;

        // Authentication process flags
        let authStatus = AUTH_STATUS.UNAUTHENTICATED;
        let authError = null;

        // Starts authStatus process
        requestp({
            method: 'GET',
            uri: authUrl,
            headers: {
                'x-auth-user': username,
                'x-auth-key': password
            },
            resolveWithFullResponse: true
        }).then(response => {
            url = response.headers['x-storage-url'];
            token = response.headers['x-auth-token'];
            authStatus = AUTH_STATUS.AUTHENTICATED;
            this.emit(AUTH_EVENT);
        }).catch(err => {
            authStatus = AUTH_STATUS.FAILED;
            authError = err;
            this.emit(AUTH_EVENT);
        });

        this._authenticate = function () {
            let returnPromise;
            switch (authStatus) {
                case AUTH_STATUS.UNAUTHENTICATED:
                    returnPromise = new Promise((resolve, reject) => {
                        const authListener = () => {
                            this.removeListener(AUTH_EVENT, authListener);
                            if (authStatus === AUTH_STATUS.AUTHENTICATED) resolve({url: url, token: token});
                            if (authStatus === AUTH_STATUS.FAILED) reject(authError);
                        };

                        this.on(AUTH_EVENT, authListener);
                    });
                    break;
                case AUTH_STATUS.AUTHENTICATED:
                    returnPromise = new Promise(resolve => {
                        resolve({url: url, token: token});
                    });
                    break;
                case AUTH_STATUS.FAILED:
                    returnPromise = new Promise((resolve, reject) => {
                        reject(authError);
                    });
                    break;
            }

            return returnPromise;
        }
    }

    authenticate() {
        return this._authenticate();
    }
}

module.exports = SwiftAuthenticator;