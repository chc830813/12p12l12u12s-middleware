const eosInstance = require('./eos-instance');
var bodyParser = require("body-parser");
var path = require('path');
var express = require('express');
var app = express();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));

// 发送数据
app.get('/eosTransfer/:wallet_address/:money/:label', async function (req, res) {
    // console.log('req.body:'+  JSON.stringify(req.body));
    // var data = req.body;
    console.log('wallet_address:' + req.params.wallet_address)
    console.log('money:' + req.params.money)
    console.log('label:' + req.params.label)
    try {
        let r = await
            eosInstance.transact({
                actions: [{
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [{
                        actor: eosConfig.accounts[0],
                        permission: 'active',
                    }],
                    data: {
                        from: eosConfig.accounts[0],
                        to: req.params.wallet_address,
                        quantity: Number(req.params.money).toFixed(4) + ' EOS',
                        memo: req.params.label
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 5,
            });
        let txid = r.transaction_id;
        console.log("transaction_id:" + txid)
        res.json({txid: txid, code: 1})
        return;
    }catch (e){
        console.error(new Date().toLocaleString() +':eosTransfer fail:', e);
        res.json({code: 2})
        return;
    }
})

app.get('*',function (req,res) {
    res.json({code: 2})
});
app.listen(3002,function () {
    console.log("启动监听端口 3002");
});