var exec = require('child_process').exec;
const conf = require('./config.json');
require('babel-register') ({
    presets: [ 'env' ]
})
var plus_chain =  require('./plus_chain');
async function sleep(time = 0) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
};

async function send(fromAccount, toAccount,sendAmount, symbol, memo, nonce){
    await sleep(1000);
    return await new Promise((resolve, reject) => {
        plus_chain.transfer(fromAccount, toAccount,sendAmount, symbol, memo, nonce).then((transaction)=>{
            console.log(JSON.stringify(transaction))
            resolve();
        })
    }).catch(e => {
        console.log("ee：" + e)
    })
}

// 取得某用户下某资产的余额
async function getBalance(account,symbol) {
    console.log("cmd: " + symbol)
    var asset  = await plus_chain.getAsset(symbol);
    return await new Promise(function(resolve, reject) {
        // 按照名字取取得余额
        var cmd = 'curl -H "Content-Type:application/json" -X POST --data \'{"method":"call","params":[0,"get_full_accounts",[["'+ account + '"],true]],"id":1}\' ' + conf.PLUS_URL;

        exec(cmd, function(err, stdout, stderr){
            if (err){
                console.log(err);
                reject(err);
            }else{
                var data = JSON.parse(stdout);
                var arry = data.result[0][1].balances;
                var bala = 0;
                for (var i of arry){
                    if(i.asset_type == asset.id){
                        bala = i.balance/Math.pow(10,asset.precision);
                    }
                }
                resolve({"balance": bala,"precision":asset.precision});
            }
        });
    })
}
async function transfer(fromAccount, toAccount, sendAmount, symbol, memo, nonce){
    // var id  = await nip.getAssetID("PLUS");
    var balance = await getBalance(fromAccount, symbol);
    // if(balance == 0 || a + fee <  balance)
    console.log("balance:" + balance)
    await send(fromAccount, toAccount, Number(sendAmount * Math.pow(10,balance.precision)), symbol, memo, nonce);
    console.log("end")
    await sleep(2000);
    process.exit(0);
}
// 金额
transfer("plus123456789123", "init2",  2, "CHK", "Testing",12342112121);

