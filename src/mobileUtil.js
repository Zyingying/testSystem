const WeixinUtil = require('./weixinUtil');
const UA = window.navigator.userAgent;
const moment = require('moment');

const MobileUtil = {
    REDIRECT: 'redirect',
    WX_LOGIN_TIME: 'wx_login_time',
    WX_LOGINED: 'wx_logined',

    isIOS: () => {
        return /ios|iphone|ipad|ipod/i.test(UA);
    },

    isAndroid: () => {
        return /android/i.test(UA);
    },

    isLogin: () => {
        let data = window._pin_data;
        let isLogin = !!(data && data._user);

        if(WeixinUtil.isWeixin()){
            try{
                let logined = !!MobileUtil.getCookie(MobileUtil.WX_LOGINED);
                isLogin = isLogin && logined;
            }catch(e){}
        }

        return isLogin;
    },

    isFewStock: (remain) => {
        return remain <= 5;
    },

    getUserName: () => {
        let data = window._pin_data;
        return data && data._user && data._user.uid;
    },

    getUserAvatar: (sUid) => {
        return location.protocol + "//" + location.host + "/api/user/getAvatar?uid=" + sUid + "&size=55";
    },

    getYanShipPrice: (price, count, shipPrice) => {
        let total = price * count;
        return total < 88 ? shipPrice : 0;
    },

    getYanPriceWithShip: (price, count, shipPrice) => {
        let total = price * count;
        return total + MobileUtil.getYanShipPrice(price, count, shipPrice);
    },

    getPriceDiscount: (price, count) => {
        if (count > 1) {
            if (price > 30 && price < 55) {
                return price + (price - 6) * (count - 1);
            } else if (price >= 55 && price < 88) {
                return price + (price - 8) * (count - 1);
            } else {
                return price * count;
            }
        } else {
            return price;
        }
    },

    gotoPay: (context, id)=>{
        context.props.history.pushState({}, '/groupon/gopay?orderId=' + id);
    },

    wxPay: (context, params, resultPath, onCancel) => {
        WeixinUtil.pay(params, (res)=>{
            // setTimeout(()=>{
                context.props.history.replaceState({}, resultPath);
            // }, 2000);
        }, onCancel);
    },

    setCookie: (name, value, expHour, domain, path) => {
        document.cookie = name + "=" + encodeURIComponent(value == undefined ? "" : value) + (expHour ? "; expires=" + new Date(new Date().getTime() + (expHour - 0) * 3600000).toUTCString() : "") + "; domain=" + (domain ? domain : document.domain) + "; path=" + (path ? path : "/");
    },

    getCookie: (name) => {
        return document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")) == null ? null : decodeURIComponent(RegExp.$2);
    }
};

module.exports = MobileUtil;