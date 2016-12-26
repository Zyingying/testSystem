"use strict"
const React = require("react");

class Help extends React.Component{
    goback(){
        history.go(-1);
    }

    render(){
        return <div className="f-page m-help">
            <div className="w-help">
                <i className="i-close close" onClick={()=>{this.goback()}}></i>
                <h1>如何参加拼团</h1>
                <div className="step">

                </div>

            </div>
            <ol className="text t-aside">
                <li>(1)选择商品开团：选择拼团商品下单，团长完成支付后，团即刻开启。在活动期间内，参团人数需至少在24小时内达到规定人数，此团方能成功，否则超过活动期，或者超过组团时间，此团均为失败。</li>
                <li>(2)团长：开团且该团第一位支付成功的人。</li>
                <li>(3)参团成员：通过团长邀请购买该商品的成员即为参团人员，参团人员也可通过分享团链接给微信好友邀请更多的成员参加。</li>
                <li>(4)拼团成功：在规定期间内，所有团成员完成支付之后，订单状态即会变更为“已确认”，此组团即算作成功，卖家即为每个团员进行单独发货。</li>
                <li>(5)拼团失败：从团长开团24小时内未能找到相应开团人数的好友参团，或者组团时间超过活动时间，均为该团失败。系统会在1-2个工作日内提交处理，审核通过之后会退款到原支付账户。</li>
                <li>(6)拼团，是基于好友的组团购买，获取团购优惠，为了保证广大消费者的权益，网易邮箱应用中心有权将判定为黄牛倒货的团解散并取消订单。</li>
            </ol>
        </div>;


    }
}
module.exports = Help;