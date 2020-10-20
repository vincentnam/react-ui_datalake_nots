"use strict";

const URL = require('url-parse');
const requestp = require('request-promise');

const SwiftContainer = require('./SwiftContainer');
const SwiftEntity = require('./SwiftEntity');
const SwiftAuthenticator = require('./SwiftAuthenticator');
const KeystoneV3Authenticator = require('./KeystoneV3Authenticator');

class SwiftClient extends SwiftEntity {
    constructor(authenticator) {
        super('Container', null, authenticator);
        
    }

    create(name, publicRead, meta, extra) {
        if (typeof publicRead === 'undefined') {
            publicRead = false;
        }

        if (publicRead) {
            if (!extra)
                extra = {};

            extra['x-container-read'] = '.r:*';
        }

        return this.authenticator.authenticate().then(auth => requestp({
            method: 'PUT',
            uri: `${auth.url}/${name}`,
            headers: this.headers(meta, extra, auth.token)
        }));
    }

    /**
     * Gets cluster configuration parameters
     * @returns {Promise.<Object>}
     */
    async info() {
        const auth = await this.authenticator.authenticate();
        const infoUrl = (new URL(auth.url)).origin + "/info";
        return requestp({
            method: 'GET',
            uri: infoUrl,
            json: true
        })
    }

    container(name) {
        return new SwiftContainer(name, this.authenticator);
    }
}

SwiftClient.SwiftAuthenticator = SwiftAuthenticator;
SwiftClient.KeystoneV3Authenticator = KeystoneV3Authenticator;

module.exports = SwiftClient;