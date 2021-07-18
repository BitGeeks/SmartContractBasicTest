/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { ViAsset } from './vi-asset';

@Info({title: 'ViAssetContract', description: 'Vi Smart Contract' })
export class ViAssetContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async viAssetExists(ctx: Context, viAssetId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(viAssetId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createViAsset(ctx: Context, viAssetId: string, value: string): Promise<void> {
        const exists = await this.viAssetExists(ctx, viAssetId);
        if (exists) {
            throw new Error(`The vi asset ${viAssetId} already exists`);
        }
        const viAsset = new ViAsset();
        viAsset.value = value;
        const buffer = Buffer.from(JSON.stringify(viAsset));
        await ctx.stub.putState(viAssetId, buffer);
        
        const eventPayload: Buffer = Buffer.from(`Created asset ${viAssetId} (${value})`);
        ctx.stub.setEvent('myEvent', eventPayload);
    }

    @Transaction(false)
    @Returns('ViAsset')
    public async readViAsset(ctx: Context, viAssetId: string): Promise<ViAsset> {
        const exists = await this.viAssetExists(ctx, viAssetId);
        if (!exists) {
            throw new Error(`The vi asset ${viAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(viAssetId);
        const viAsset = JSON.parse(buffer.toString()) as ViAsset;
        return viAsset;
    }

    @Transaction()
    public async updateViAsset(ctx: Context, viAssetId: string, newValue: string): Promise<void> {
        const exists = await this.viAssetExists(ctx, viAssetId);
        if (!exists) {
            throw new Error(`The vi asset ${viAssetId} does not exist`);
        }
        const viAsset = new ViAsset();
        viAsset.value = newValue;
        const buffer = Buffer.from(JSON.stringify(viAsset));
        await ctx.stub.putState(viAssetId, buffer);
    }

    @Transaction()
    public async deleteViAsset(ctx: Context, viAssetId: string): Promise<void> {
        const exists = await this.viAssetExists(ctx, viAssetId);
        if (!exists) {
            throw new Error(`The vi asset ${viAssetId} does not exist`);
        }
        await ctx.stub.deleteState(viAssetId);
    }

    @Transaction(false)
    public async queryAllAssets(ctx: Context): Promise<string> {
        const startKey = '000';
        const endKey = '999';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

}
