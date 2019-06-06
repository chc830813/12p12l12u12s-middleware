'use strict';
var exec = require('child_process').exec;
let PLUS_URL = "http://13.209.69.153:38090/rpc";
// 取得 最近的块信息
function last_block() {
    return new Promise(function(resolve, reject) {
        var cmd = 'curl -d \'{"jsonrpc": "2.0", "method": "get_dynamic_global_properties", "id": 1}\' ' + PLUS_URL;
        console.log('cmd:' + cmd);
        exec(cmd, function(err, stdout, stderr){
            if (err){
                console.log(err);
                reject(err);
            }else{
                var property = JSON.parse(stdout);
                resolve(property['result']['last_irreversible_block_num']);
            }
        });
    })
}

// 取得充值历史信息
function account_history() {
    var fromaccount = "p2p"
    var query_num = 3
    var cmd = 'curl -H "Content-Type:application/json" -X POST --data \'{"method":"call","params":[3, "get_account_history", ["1.2.21", "1.11.0", 10, "1.11.0"]],"id":1}\' ' + PLUS_URL;
    // console.log('cmd:' + cmd);
    return new Promise(function(resolve, reject) {
        exec(cmd, function(err, stdout, stderr){
            if (err){
                console.log(err);
                reject(err);
            }else{
                let results_old = JSON.parse(stdout);
                // console.log("res:" + JSON.stringify(results_old))
                resolve(results_old);
            }
        })
    })
}
// 取得区块的时间
function get_time(block_num) {
    return new Promise(function(resolve, reject) {
        let cmd2 = 'curl -d \'{"jsonrpc": "2.0", "method": "get_block", "params": ["' + block_num + '"], "id": 1}\' ' + PLUS_URL;

        exec(cmd2, function (err2, stdout2, stderr2) {
            if (err2) {
                console.log(err2);
                reject(err2);
            } else {
                var blockInfo = JSON.parse(stdout2);
                resolve(new Date(blockInfo['result']['timestamp']).getTime() / 1000);

            }
        })
    })
}
async function sleep(time = 0) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve();
    }, time);
  })
};

async  function main_2() {
    // todo 到账账户id p2p
    var id = "1.2.21";
    var history_transactions = await account_history();
    let transactions = [];
    var last_block = await last_block();

    for (var history_transaction of history_transactions['result']){
        if (history_transaction['op'][0] == 0 && history_transaction['op'][1]['to'] == id && "1.11.0" == history_transaction['op'][1]['amount']['asset_id'] && history_transaction['op']['block_num'] < last_block){

            var block_timestamp = await  get_time(history_transaction['op']['block_num']);
            let transaction = {};
            transaction['asset'] = "PLUS";
            if (history_transaction['op'][1]['to'] == id){
                transaction['account'] = "p2p";
            }
            transaction['address'] = history_transaction['memo'].replace(/\s+/g,'');
            // transaction['confirmations'] = last_irreversible_block_num >= history_transaction['op']['block_num'] ? 1:0;
            transaction['category'] = 'receive';
            transaction['txid'] = history_transaction['op']['id'];
            // todo 保留几位小数
            transaction['amount'] = history_transaction['op'][1]['amount']['amount'] / 8);
            transaction['blockhash'] = history_transaction['op']['block_num'].toString();
            transaction['blockindex'] = history_transaction['op']['trx_in_block'];
            transaction['blocktime'] = block_timestamp;
            transaction['timereceived'] = transaction['blocktime'];
            transaction['time'] = transaction['blocktime'];
            transaction['nonce'] = history_transaction['memo']['nonce'];
            transactions.push(transaction);
        }
    }
    console.log(JSON.stringify(transactions))
}

// main_1();