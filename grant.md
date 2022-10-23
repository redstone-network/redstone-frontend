# RedStone-Grant
##  Passive_Defense Pallet
1.1 交易限额配置
需求描述：提前配置转账限额，限制指定时间内的交易频率；保护用户在私钥被盗时短期内不遭受重大损失。
解决方案：
fn check_transfer_limit(origin, amount) -> bool
交易前先检查其交易金额，若无触发用户配置条件，则转账成功；否则，转账失败。


check_transfer_limit和set_alarm_transfer_limit设置的值相关吗？这个函数应该返回bool类型
相关，交易限制配置完毕后，每次交易自动检查，但这不是一个pub fn


1.2 冻结配置
需求描述：提前配置冻结交易时间、冻结交易类型、是否可以撤销冻结指令；当用户发现私钥被盗时，立即触发冻结操作，帮助用户进一步减少损失。
解决方案：
pub fn set_freeze_config(origin, freeze_time)
配置冻结账户时间
pub trigger_freeze_account(origin)
触发冻结指令，不可逆

1 set_freeze_config接口，reset_time 的用途是什么？
冻结之后，需要多久才能执行撤销解冻操作？
reset_time规定了重置时间，比如冻结时间为3天，重置时间为1个月。但考虑下，暂时无需reset_time的逻辑。

2 trigger_freeze_account接口，冻结时长 从设置的时间开始算吗？call_trigger_freeze_account_time + freeze_time?
trigger_freeze_account是一个主动调用方法，调用瞬间+freeze_time，是冻结交易时间

3 貌似漏了撤销解冻接口pub un_freeze_account(origin)
没有漏哈，一旦冻结，不可撤回，否则黑客拥有私钥，可以自然解冻

1.3 捕获账户权限配置
需求描述：提前配置N个好友地址和M个好友操作生效；
当用户发现私钥被盗时，先冻结账户，尽快联系好友。当超过M个好友投票通过时，被盗账户的权限将被接管，任何交易只有在N个好友投票后才能执行。这样即使黑客盗取了私钥，也无法进行有效的转账。
pub fn create_get_account_permissions(origin, account) -> transaction_hash

创建获取账户权限交易，返回交易哈希
pub fn cancel_get_account_permissions(origin, account)

创建取消获取账户权限交易，返回交易哈希
pub fn set_member(origin, account)

创建紧急好友列表
pub fn set_approvel_gap(origin, threshold)

创建投票通过阈值
pub fn operational_voting(origin, hash, vote)
输入交易哈希（若账户权限已经被接管，则转账也会触发审批交易），好友对交易投票审批

1 create_get_account_permissions，cancel_get_account_permissions 感觉加了get单词容易误解，以为复制多了个get，我理解是创建类似投票多签交易的接口。
比如get改为tranfer怎么样。 create_tranfer_account_permissions
哦，不是，这块只是创建一个权限账户申请请求hash，get这里≠获取

2 如果是链上代码，create_get_account_permissions返回值通过DispatchResult<hash>? 不确定能返回交易的hash
参考tips模块

3 pub fn set_member(origin, account) =》 pub fn set_member(origin, Vec<account>) //创建紧急好友列表，应该是数组
数组可以

##  Active_Alarming

2.1 告警条件配置

需求描述：任何超过限额的交易都会发送告警事件；例如，用户可以配置当一段时间内发生N笔超过限额的交易时，触发链下告警通知；用户可以配置，在一定时间内，不同的时间会触发不同的报警方式。
pub fn set_alarm_ frequency(origin, period, transactions, option) //每100个区块交易数量限制
配置告警频率，选择告警方式
pub fn set_alarm_transfer_limit(origin, amount, option) //单笔交易最大额度
配置告警金额，选择告警方式。这里option是一个enum

2.2  告警方式配置
需求描述：为用户提供三种链下通知方式：Mail、Slack、Discord。比如一般告警发送到Mail，重要告警发送到Slack，危急告警发送到Discord，实现告警的分级管理。
pub fn set_alarm_mail(origin, mail, info) //mail是收件地址？三要素是收件人，title，body
这个可以修改，根据实际情况
配置邮件告警信息
pub fn set_alarm_slack(origin, token, info) //token是登陆授权码，还是告警的代币？slack只要一个hook address就行
一样的，根据实际情况修改
配置slack告警信息
pub fn set_alarm_discord(origin, token, info)//token是登陆授权码，还是告警的代币？一样的，根据实际情况修改
配置discord告警信息
