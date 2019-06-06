// import {Apis} from "bitsharesjs-ws";
const {Apis} = require("bitsharesjs-ws")
// import {ChainStore} from "./lib";
const {ChainStore} = require("./lib")

Apis.instance("ws://13.124.230.82:38090", true).init_promise.then((res) => {
    // console.log("connected to:", res);
    // console.log("connected to:", res[0].network);
    ChainStore.init().then(() => {
        ChainStore.subscribe(getBitcrabAccount);
    });
});

function getBitcrabAccount() {

    var bitcrab = ChainStore.getAccount('p2p');

    if( bitcrab) {
        var bitcrabObj = bitcrab.toJS();
        console.log('my account', bitcrabObj);

        var balances = bitcrabObj.balances;

        // if( balances ){
        //     for (var assetId in balances ){
        //         var asset = ChainStore.getAsset(assetId);
        //
        //         if( asset ){
        //             var assetObj = asset.toJS();
        //             console.log('asset:', assetId, assetObj);
        //
        //             if( assetObj.dynamic_asset_data_id) {
        //                 var dynamicAsset = ChainStore.getObject(assetObj.dynamic_asset_data_id);
        //
        //                 if( dynamicAsset ){
        //                     var dynamicAssetObj = dynamicAsset.toJS();
        //                     console.log('asset dynamic:', assetId, dynamicAssetObj);
        //                 }
        //             }
        //         }
        //
        //         // var balance =;
        //
        //         var balance = ChainStore.getObject( balances[assetId]);
        //         console.log('asset balance:', assetId, balance.toJS());
        //
        //     }
        // }

        var history = bitcrabObj.history;

        if( history ){
            history.forEach( function(h){
                console.log('history', h);
                // console.log('opration', h.op);
            });

        }
    }

}