"use strict"
const React = require("react");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const PersonalAction = require("pin-alt/src/actions/personalAction");
const PersonalStore = require("pin-alt/src/stores/personalStore");

class Nav extends  React.Component{

    constructor(props){
        super(props);
    }
    static getStores(){
        return [PersonalStore];
    }

    static getPropsFromStores(){
        return PersonalStore.getState();
    }

    componentWillMount(){
        let {activeOn, grouponBadge, orderBadge} = this.props;
        if(!orderBadge){
            PersonalAction.getUnpaidOrders();
        }

    }

    render(){
        let {activeOn, grouponBadge, orderBadge,unpaidedOrderCount} = this.props;
        let nopay = orderBadge || unpaidedOrderCount;

        let homeClass = activeOn== 0 ? 'active' : '';
        let grouponClass = activeOn== 1 ? 'active' : '';
        let orderClass = activeOn== 2 ? 'active' : '';
        let userClass = activeOn== 3 ? 'active' : '';

        return <nav className="w-nav">
                    <Link to="/" className={homeClass}>
                        <i className={'i-home ' + homeClass}></i>首页
                    </Link>

                    <Link to="/myGroupons" className={grouponClass}>
                        <i className={"i-group " + grouponClass}></i>我的团{grouponBadge && <em className="w-badge">grouponBadge</em>}
                        </Link>

                    <Link to="/myOrders" className={orderClass}>
                        <i className={"i-order " + orderClass}></i>我的订单{nopay > 0 ? <em className="w-badge">{nopay}</em> : null}
                    </Link>

                    <Link to="/personal" className={userClass}>
                        <i className={"i-user " + userClass}></i>个人
                    </Link>

                </nav>;
    }
}
module.exports = connectToStores(Nav);