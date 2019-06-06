# PluschainJS (pluschainJS)

使用Pluschain 中间件是平台接入最简单的方式。主要提供三方面的接口：查询，转账等，获得相应的 API，方便的与Pluschain链进行交互。

Pluschain中间件是通过node 的API接口与Pluschain网络通讯，为平台服务商提供方便的访问链上数据的接口，保证传统业务代码能在只做尽量少的改动情况下，也能达到上链的要求。具体示意图如下：

Security issues might be eligible for a bounty through the [HackTheDex](https://wallet.pltoken.io) program.

部署:
clone 源码 git clone https://github.com/chc830813/plus-middleware.git
修改中间件配置 参照配置文件说明()，修改文件plus-middleware/config.js
安装中间件服务所需node库 进入 ~/plus-middleware/ 目录 npm install
启动中间件服务 npm start





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
