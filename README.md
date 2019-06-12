# PluschainJS (pluschainJS)

使用Pluschain 中间件是平台接入最简单的方式。主要提供三方面的接口：查询，转账等，获得相应的 API，方便的与Pluschain链进行交互。

Pluschain中间件是通过node 的API接口与Pluschain网络通讯，为平台服务商提供方便的访问链上数据的接口，保证传统业务代码能在只做尽量少的改动情况下，也能达到上链的要求。具体如下：

[PLUS](https://wallet.pltoken.io) 

部署:
===
clone 源码 git clone https://github.com/chc830813/plus-middleware.git
修改中间件配置 参照配置文件说明()，修改文件plus-middleware/config.js
安装中间件服务所需node库 进入 ~/plus-middleware/ 目录 npm install
启动中间件服务 npm start

启动:
===
##配置文件说明
配置文件的路径在代码路径下config.json 文件中，

```javaspcript
{
    // api服务器地址，测试网公共api地址如下，正式网部署请更改该地址
    "plus_ws": "ws://47.104.230.120:38090",
    // 服务rpc接口
    "plus_rpc": "http://47.104.230.120:38090/rpc",
    // 零钱用户的私钥 特别保密 重要
    "privKey": "",
    // 允许接入的IP列表，强制指定明确的来访IP地址，暂不支持"*" 或 "0.0.0.0"
    allow_ip: ["localhost", "127.0.0.1"]
}
```
##需要注意的是：
    在一般使用场景中，中间件值需要使用资金私钥，否则不要将资金私钥写进配置文件。
    中间件中使用了限制IP(allow_ip)来保证安全性，不过依然强烈建议内网部署，做好隔离，私钥的安全性较为重要。
    操作手续费以PLUS支付手续费
##启动正常看到如下信息：
connected to: PLUS network
synced and subscribed, chainstore ready
启动监听端口 3002

接口说明
请求文档及示例
1. 基础查询相关接口
1.1. 获取指定账户信息 getAccount
 请求类型：GET

 请求参数：

{String} account - 账号
 请求示例：

localhost:3002/plushapi/v2/getAccountDetails?account=plus123456789123 <br> 

返回结果：
```javaspcript
{<br>
>"code": 0, 
>"data": { 
>>>"data": [
>>>>[
>>>>>"plus123456789123",
>>>>>>{
>>>>>>>"account": {
>>>>>>>"id": "1.2.20",
>>>>>>>"membership_expiration_date": "2106-02-07T06:28:15",
>>>>>>>"registrar": "1.2.20",
>>>>>>>"referrer": "1.2.20",
>>>>>>>"lifetime_referrer": "1.2.20",
>>>>>>>"network_fee_percentage": 2000,
>>>>>>>>>>>>>>>>>>>>>>>>"lifetime_referrer_fee_percentage": 8000,<br>
>>>>>>>>>>>>>>>>>>>>>>>>"referrer_rewards_percentage": 0,<br>
>>>>>>>>>>>>>>>>>>>>>>>>"name": "plus123456789123",<br>
>>>>>>>>>>>>>>>>>>>>>>>>"vm_type": "",<br>
>>>>>>>>>>>>>>>>>>>>>>>>"vm_version": "",<br>
>>>>>>>>>>>>>>>>>>>>>>>>"code": "",<br>
>>>>>>>>>>>>>>>>>>>>>>>>"code_version": "",<br>
>>>>>>>>>>>>>>>>>>>>>>>>"abi": {<br>
>>>>>>>>>>>>>>>>>>>>>>>>"version": "token::abi/1.0",<br>
>>>>>>>>>>>>>>>>>>>>>>>>"types": [],<br>
>>>>>>>>>>>>>>>>>>>>>>>>"structs": [],<br>
>>>>>>>>>>>>>>>>>>>>>>>>"actions": [],<br>
>>>>>>>>>>>>>>>>>>>>>>>>"tables": [],<br>
>>>>>>>>>>>>>>>>>>>>>>>>"error_messages": [],<br>
>>>>>>>>>>>>>>>>>>>>>>>>"abi_extensions": []<br>
>>>>>>>>>>>>>>>>>>>>},<br>
>>>>>>>>>>>>>>>>>>>>"owner": {<br>
>>>>>>>>>>>>>>>>>>>>>>>>"weight_threshold": 1,<br>
>>>>>>>>>>>>>>>>>>>>>>>>"account_auths": [],<br>
>>>>>>>>>>>>>>>>>>>>>>>>"key_auths": [<br>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>[<br>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"PLUS7rfpjAKubCt6WGG3BpkBYbjt1yjCjpZvE8RG7ZHi13gie44yTM",<br>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1<br>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>]<br>
>>>>>>>>>>>>>>>>>>>>>>>>],<br>
>>>>>>>>>>>>>>>>>>>>"address_auths": []<br>
>>>>>>>>>>>>>>>>},<br>
>>>>>>>>>>>>>>>>"active": {<br>
>>>>>>>>>>>>>>>>>>>>"weight_threshold": 1,<br>
>>>>>>>>>>>>>>>>>>>>"account_auths": [],<br>
>>>>>>>>>>>>>>>>>>>>"key_auths": [<br>
>>>>>>>>>>>>>>>>>>>>>>>>[<br>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>"PLUS86ZS7oh4h4Eca9UYdJiKMh4KpzyAJFAMd5pW1aympQ5HTAAGuA",<br>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>1<br>
>>>>>>>>>>>>>>>>>>>>>>>>]<br>
>>>>>>>>>>>>>>>>>>>>],<br>
>>>>>>>>>>>>>>>>>>>>"address_auths": []<br>
>>>>>>>>>>>>>>>>},<br>
>>>>>>>>>>>>>>>>"options": {<br>
>>>>>>>>>>>>>>>>>>>>"memo_key": "PLUS86ZS7oh4h4Eca9UYdJiKMh4KpzyAJFAMd5pW1aympQ5HTAAGuA",<br>
>>>>>>>>>>>>>>>>>>>>"voting_account": "1.2.5",<br>
>>>>>>>>>>>>>>>>>>>>"num_witness": 0,<br>
>>>>>>>>>>>>>>>>>>>>"num_committee": 0,<br>
>>>>>>>>>>>>>>>>>>>>"votes": [],<br>
>>>>>>>>>>>>>>>>>>>>"extensions": []<br>
>>>>>>>>>>>>>>>>},<br>
>>>>>>>>>>>>>>>>"statistics": "2.6.20",<br>
>>>>>>>>>>>>>>>>"whitelisting_accounts": [],<br>
>>>>>>>>>>>>>>>>"blacklisting_accounts": [],<br>
>>>>>>>>>>>>>>>>"whitelisted_accounts": [],<br>
>>>>>>>>>>>>>>>>"blacklisted_accounts": [],<br>
>>>>>>>>>>>>>>>>"cashback_vb": "1.13.1",<br>
>>>>>>>>>>>>>>>>"owner_special_authority": [<br>
>>>>>>>>>>>>>>>>>>>>0,<br>
>>>>>>>>>>>>>>>>>>>>{}<br>
>>>>>>>>>>>>>>>>],<br>
>>>>>>>>>>>>>>>>"active_special_authority": [<br>
>>>>>>>>>>>>>>>>>>>>0,<br>
>>>>>>>>>>>>>>>>>>>>{}<br>
>>>>>>>>>>>>>>>>],<br>
>>>>>>>>>>>>>>>>"top_n_control_flags": 0<br>
                    },<br>
                    "statistics": {<br>
                        "id": "2.6.20",<br>
                        "owner": "1.2.20",<br>
                        "most_recent_op": "2.9.43",<br>
                        "total_ops": 19,<br>
                        "removed_ops": 0,<br>
                        "total_core_in_orders": 0,<br>
                        "lifetime_fees_paid": 1061505855,<br>
                        "pending_fees": 0,<br>
                        "pending_vested_fees": 0<br>
                    },<br>
                    "registrar_name": "plus123456789123",<br>
                    "referrer_name": "plus123456789123",<br>
                    "lifetime_referrer_name": "plus123456789123",<br>
                    "votes": [],<br>
                    "cashback_balance": {<br>
                        "id": "1.13.1",<br>
                        "owner": "1.2.20",<br>
                        "balance": {<br>
                            "amount": 565610938,<br>
                            "asset_id": "1.3.0"<br>
                        },<br>
                        "policy": [<br>
                            1,<br>
                            {<br>
                                "vesting_seconds": 1800,<br>
                                "start_claim": "1970-01-01T00:00:00",<br>
                                "coin_seconds_earned": "1018099688400",<br>
                                "coin_seconds_earned_last_update": "2019-06-10T09:40:00"<br>
                            }<br>
                        ]<br>
                    },<br>
                    "balances": [<br>
                        {<br>
                            "id": "2.5.2",<br>
                            "owner": "1.2.20",<br>
                            "asset_type": "1.3.0",<br>
                            "balance": "9998906494145"<br>
                        },<br>
                        {<br>
                            "id": "2.5.3",<br>
                            "owner": "1.2.20",<br>
                            "asset_type": "1.3.1",<br>
                            "balance": 9638192<br>
                        }<br>
                    ],<br>
                    "vesting_balances": [<br>
                        {<br>
                            "id": "1.13.1",<br>
                            "owner": "1.2.20",<br>
                            "balance": {<br>
                                "amount": 565610938,<br>
                                "asset_id": "1.3.0"<br>
                            },<br>
                            "policy": [<br>
                                1,<br>
                                {<br>
                                    "vesting_seconds": 1800,<br>
                                    "start_claim": "1970-01-01T00:00:00",<br>
                                    "coin_seconds_earned": "1018099688400",<br>
                                    "coin_seconds_earned_last_update": "2019-06-10T09:40:00"<br>
                                }<br>
                            ]<br>
                        }<br>
                    ],<br>
                    "limit_orders": [],<br>
                    "call_orders": [],<br>
                    "settle_orders": [],<br>
                    "proposals": [],<br>
                    "assets": [<br>
                        "1.3.1"<br>
                    ],<br>
                    "withdraws": []<br>
                }<br>
            ]<br>
        ]<br>
    },<br>
    "message": "操作成功"<br>
}
```






















请求返回 error code 状态说明
1001 无效的签名类型

1002 无效的签名时间

1003 请求已过期

1004 无效的操作时间

1005 无效的操作签名

1006 账号信息与链上不匹配（常见于私钥恢复之后，使用其他电脑的本地数据或旧的备份文件进行授权操作导致）

1007 未授权该平台

2000 api底层异常

2001 账号不存在

2002 无效的账号

2003 无效的转账金额

2004 零钱和积分不足支付操作手续费

2005 零钱不足

2006 无效的资产符号或id

3001 文章ID必须为该平台该发文人的上一篇文章ID +1（平台管理发文id）
