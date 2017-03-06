"use strict";
const React = require("react");
const connectToStores = require("alt-utils/lib/connectToStores");
const PerMsgAction = require("../action/perMsgAction");
const PerMsgStore = require("../store/perMsgStore");
const MobileUtil = require("../mobileUtil");
const Msgbox = require('../module/msgbox');
const WeixinUtil = require("../weixinUtil");

const DatePicker = require("react-mobile-datepicker");

class personMsg extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    static getStores(){
        return [PerMsgStore];
    }
    //
    static getPropsFromStores(){
        return {
            ...PerMsgStore.getState()
        }
    }



    render(){
        let {userMsg} = this.props;


        return <div className="f-page personal personalMsg" ref="personalMsg">111

        </div>
    }
}

module.exports =  connectToStores(personMsg);