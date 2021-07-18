/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

import * as assert from 'assert';
import * as fabricNetwork from 'fabric-network';
import { SmartContractUtil } from './ts-smart-contract-util';

import * as os from 'os';
import * as path from 'path';

describe('ViAssetContract-vibc@0.0.2' , () => {

    const homedir: string = os.homedir();
    const walletPath: string = path.join(homedir, '.fabric-vscode', 'environments', '1 Org Local Fabric', 'wallets', 'Org1');
    const gateway: fabricNetwork.Gateway = new fabricNetwork.Gateway();
    const fabricWallet: fabricNetwork.FileSystemWallet = new fabricNetwork.FileSystemWallet(walletPath);
    const identityName: string = 'org1Admin';
    let connectionProfile: any;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
    });

    beforeEach(async () => {
        const discoveryAsLocalhost: boolean = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled: boolean = true;

        const options: fabricNetwork.GatewayOptions = {
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled,
            },
            identity: identityName,
            wallet: fabricWallet,
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe('viAssetExists', () => {
        it('should submit viAssetExists transaction', async () => {
            // TODO: populate transaction parameters
            const viAssetId: string = 'EXAMPLE';
            const args: string[] = [ viAssetId];

            const response: Buffer = await SmartContractUtil.submitTransaction('ViAssetContract', 'viAssetExists', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createViAsset', () => {
        it('should submit createViAsset transaction', async () => {
            // TODO: populate transaction parameters
            const viAssetId: string = 'EXAMPLE';
            const value: string = 'EXAMPLE';
            const args: string[] = [ viAssetId, value];

            const response: Buffer = await SmartContractUtil.submitTransaction('ViAssetContract', 'createViAsset', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readViAsset', () => {
        it('should submit readViAsset transaction', async () => {
            // TODO: populate transaction parameters
            const viAssetId: string = 'EXAMPLE';
            const args: string[] = [ viAssetId];

            const response: Buffer = await SmartContractUtil.submitTransaction('ViAssetContract', 'readViAsset', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updateViAsset', () => {
        it('should submit updateViAsset transaction', async () => {
            // TODO: populate transaction parameters
            const viAssetId: string = 'EXAMPLE';
            const newValue: string = 'EXAMPLE';
            const args: string[] = [ viAssetId, newValue];

            const response: Buffer = await SmartContractUtil.submitTransaction('ViAssetContract', 'updateViAsset', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deleteViAsset', () => {
        it('should submit deleteViAsset transaction', async () => {
            // TODO: populate transaction parameters
            const viAssetId: string = 'EXAMPLE';
            const args: string[] = [ viAssetId];

            const response: Buffer = await SmartContractUtil.submitTransaction('ViAssetContract', 'deleteViAsset', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('queryAllAssets', () => {
        it('should submit queryAllAssets transaction', async () => {
            // TODO: Update with parameters of transaction
            const args: string[] = [];

            const response: Buffer = await SmartContractUtil.submitTransaction('ViAssetContract', 'queryAllAssets', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
