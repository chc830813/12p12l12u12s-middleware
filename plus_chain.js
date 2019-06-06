'use strict';
const conf = require('./config.json');
import {Apis} from "bitsharesjs-ws";
import {ChainStore, FetchChain, PrivateKey, TransactionHelper, Aes, TransactionBuilder} from "./lib";
// p2p 的私钥
var privKey = conf.privKey;
let pKey = PrivateKey.fromWif(privKey);

function transfer(fromAccount_1, toAccount_1, sendAmount_1,symbol ,memo_1,nonce_1){

    console.log("nonce22:" + nonce_1)
    return  new Promise((resolve, reject) => {
        Apis.instance(conf.PLUS_WS, true)
            .init_promise.then((res) => {
            console.log("connected to:", res[0].network_name, "network");
            ChainStore.init().then(() => {
                // let fromAccount = "p2p";
                let fromAccount = fromAccount_1;
                let memoSender = fromAccount;
                // let memo = "Testing transfer from node.js";
                let memo = memo_1;
                // let toAccount = "init3";
                let toAccount = toAccount_1;
                let sendAmount = {
                    // amount: 2,
                    amount: sendAmount_1,
                    // asset: "PLUS"
                    asset: symbol
                }
// console.log(fromAccount,memoSender,memo,toAccount,sendAmount_1)
                Promise.all([
                    FetchChain("getAccount", fromAccount),
                    FetchChain("getAccount", toAccount),
                    FetchChain("getAccount", memoSender),
                    FetchChain("getAsset", sendAmount.asset),
                    FetchChain("getAsset", sendAmount.asset)
                ]).then((res)=> {
                    // console.log("got data:", res);
                    let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = res;

                    // Memos are optional, but if you have one you need to encrypt it here
                    let memoFromKey = memoSender.getIn(["options","memo_key"]);
                    // console.log("memo pub key:", memoFromKey);
                    let memoToKey = toAccount.getIn(["options","memo_key"]);
                    // console.log("memoToKey pub key:", memoToKey);
                    // let nonce = TransactionHelper.unique_nonce_uint64();
                    console.log("nonce:" + nonce_1)
                    let nonce = parseInt(nonce_1);


                    let memo_object = {
                        from: memoFromKey,
                        to: memoToKey,
                        nonce,
                        message: Aes.encrypt_with_checksum(
                            pKey,
                            memoToKey,
                            nonce,
                            memo
                        )
                    }
                    let tr = new TransactionBuilder()

                    tr.add_type_operation( "transfer", {
                        fee: {
                            amount: 0.1,
                            asset_id: feeAsset.get("id")
                        },
                        from: fromAccount.get("id"),
                        to: toAccount.get("id"),
                        amount: { amount: sendAmount.amount, asset_id: sendAsset.get("id") },
                        memo: memo_object
                    } )

                    tr.set_required_fees().then(() => {
                        tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
                        // console.log("serialized transaction:", tr.serialize());
                        tr.broadcast();
                        resolve(tr.serialize());
                    })
                }).catch(e => reject(e));
            });
        });
    })
}



function getAsset(asset){
    return  new Promise((resolve, reject) => {
        Apis.instance(conf.PLUS_WS, true)
            .init_promise.then((res) => {
            ChainStore.init().then(() => {
                Promise.all([
                    FetchChain("getAsset", asset),
                ]).then((res)=> {

                    let asset = res[0];
                    resolve({"id":asset.get("id"),"precision":asset.get("precision")});
                }).catch(e => reject(e));
            });
        });
    })
}


//
function wrr(cb) {
    transfer("p2p","init2",2,"Testing").then(re =>{

                cb(re);
          })

}
// wrr(function (er) {
//
//     console.log(er)
// })


module.exports = {
    transfer: transfer,
    getAsset: getAsset
}