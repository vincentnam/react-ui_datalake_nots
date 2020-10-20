"use strict";

const expect = require('chai').expect;
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const KeystoneV3Authenticator = require('../KeystoneV3Authenticator');
const credentials = require('./credentials.ksv3.json');

chai.use(chaiAsPromised);

describe('KeystoneV3Authenticator', function () {
  this.timeout(4000);

  describe('with valid credentials', () => {
    const client = new KeystoneV3Authenticator(credentials);

    describe('getToken', () => {
      it('can get a token', async () => {
        const token = await client.getToken();

        expect(token.token).to.be.a('string');
        expect(token.token.length).to.be.greaterThan(10);

        expect(token.expires).to.be.a.instanceOf(Date);

        expect(token.swiftUrl).to.be.a('string');
        expect(token.swiftUrl).to.contain('http');
      });

      it('fails with invalid credentials', async () => {
        const token = await client.getToken();

        expect(token.token).to.be.a('string');
        expect(token.token.length).to.be.greaterThan(10);

        expect(token.expires).to.be.a.instanceOf(Date);

        expect(token.swiftUrl).to.be.a('string');
        expect(token.swiftUrl).to.contain('http');
      });
    });

    describe('authenticate', () => {
      it('returns token and url', async () => {
        const result = await client.authenticate();

        expect(result.token).to.be.a('string');
        expect(result.token.length).to.be.greaterThan(10);

        expect(result.url).to.be.a('string');
        expect(result.url).to.contain('http');
      });

      it('returns the same token on repeated invocations', async () => {
        const result = await client.authenticate();
        const repeat = await client.authenticate();

        expect(result).to.eql(repeat);
      });
    });

    describe('with invalid credentials', () => {
      const invalidCredentials = Object.assign({}, credentials, { password: 'wrong' });
      const client = new KeystoneV3Authenticator(invalidCredentials);

      describe('getToken', () => {
        it('fails', () => {
          const token = client.getToken();
          expect(token).eventually.be.rejected.with.any;
        });
      });

      describe('authenticate', () => {
        it('fails', () => {
          const token = client.authenticate();
          expect(token).eventually.be.rejected.with.any;
        });
      });
    });
  });
});