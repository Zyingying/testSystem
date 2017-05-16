"use strict";

require("./css/style.scss");
require('antd/lib/style/index.less');
require('antd/dist/antd.css')
require('babel-polyfill');

const React = require("react");
const WeixinUtil = require("./weixinUtil");
const MobileUtil = require("./mobileUtil");



class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            isLogin: undefined
        };

        this.listenAjax();
        // this.setCookie();

    }




    setCookie(){
        let query = this.props.location.query;
        let domain = location.host.replace(/^m\./, '.');

        let source = query.utm_source || search('utm_source');
        let medium = query.utm_medium || search('utm_medium');

        let cookie = {};

        cookie.utm_source = source || 'H5';

        if(medium){
            cookie.utm_medium = medium;
        }else{
            cookie.utm_medium = WeixinUtil.isWeixin() ? 'weixin' : 'wap';
        }

        MobileUtil.setCookie('pin_utm', JSON.stringify(cookie), domain);

        function search(key){
            let r = new RegExp('(?:\\?|&)' + key + '=(.+?)(?=$|&)');
            return (location.search.match(r)||[])[1];
        }
    }


    listenAjax(){
        $(document).on('ajaxBeforeSend', ()=>{
            setTimeout(()=>this.setState({loading: true}),0);
        });

        $(document).on('ajaxComplete', ()=>{
            setTimeout(()=>this.setState({loading: false}),0);
        });
    }

    render(){
        return <div>
                    {this.props.children}
                    {this.state.loading && <div className="w-loading"></div>}

                </div>;
    }
}
module.exports = App;