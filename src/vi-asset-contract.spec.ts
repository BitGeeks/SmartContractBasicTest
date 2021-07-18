/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { ViAssetContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logging = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('ViAssetContract', () => {

    let contract: ViAssetContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new ViAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"vi asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"vi asset 1002 value"}'));
    });

    describe('#viAssetExists', () => {

        it('should return true for a vi asset', async () => {
            await contract.viAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a vi asset that does not exist', async () => {
            await contract.viAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createViAsset', () => {

        it('should create a vi asset', async () => {
            await contract.createViAsset(ctx, '1003', 'vi asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"vi asset 1003 value"}'));
        });

        it('should throw an error for a vi asset that already exists', async () => {
            await contract.createViAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The vi asset 1001 already exists/);
        });

    });

    describe('#readViAsset', () => {

        it('should return a vi asset', async () => {
            await contract.readViAsset(ctx, '1001').should.eventually.deep.equal({ value: 'vi asset 1001 value' });
        });

        it('should throw an error for a vi asset that does not exist', async () => {
            await contract.readViAsset(ctx, '1003').should.be.rejectedWith(/The vi asset 1003 does not exist/);
        });

    });

    describe('#updateViAsset', () => {

        it('should update a vi asset', async () => {
            await contract.updateViAsset(ctx, '1001', 'vi asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"vi asset 1001 new value"}'));
        });

        it('should throw an error for a vi asset that does not exist', async () => {
            await contract.updateViAsset(ctx, '1003', 'vi asset 1003 new value').should.be.rejectedWith(/The vi asset 1003 does not exist/);
        });

    });

    describe('#deleteViAsset', () => {

        it('should delete a vi asset', async () => {
            await contract.deleteViAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a vi asset that does not exist', async () => {
            await contract.deleteViAsset(ctx, '1003').should.be.rejectedWith(/The vi asset 1003 does not exist/);
        });

    });

});
