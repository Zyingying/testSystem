const WeixinUtil = {
    APP_ID: 'wx926a0bab7e879614',
    config: null,
    __isWeixin:null,
    init: (callback)=>{
        $.ajax({
            url: '/api/weixin/share',
            dataType: 'json',
            data: {
                url: location.href.replace(location.hash, '')
            },
            success: (result) => {
                let config = result.result;

                config.appId = WeixinUtil.APP_ID;
                config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'openAddress'];

                WeixinUtil.config(config, callback);
            },
            error: () => {
                callback && callback(false);
            }
        })
    },

    initAddress: (uid, callback) => {
        $.ajax({
            url: '/api/weixin/address',
            dataType: 'json',
            data: {
                url: location.href.replace(location.hash, ''),
                uid: uid
            },
            success: (res) => {
                callback && callback(true, res.result);
            },
            error: () => {
                callback && callback(false);
            }
        });
    },

    address: (uid, callback) => {

        wx.openAddress({
            success: (res)=>{
                if(res.errMsg == 'openAddress:ok'){
                    callback && callback(true, WeixinUtil.toPinAddress(res));
                }else {
                    alert(res.errMsg);
                }
            }
        });

        // WeixinUtil.initAddress(uid, (suc, res)=>{
        //     if(suc) {
        //         res.appId = WeixinUtil.APP_ID;
        //         res.scope = 'jsapi_address';
        //         res.signType = 'sha1';
        //         res.timeStamp += "";
        //
        //         WeixinJSBridge.invoke('editAddress', res, (res)=> {
        //             if (res && res.proviceFirstStageName) {
        //                 callback(true, WeixinUtil.toPinAddress(res));
        //             } else {
        //                 callback(false);
        //             }
        //         });
        //     }
        // });
    },

    toPinAddress: (wxAddress) => {
        return {
            name: wxAddress.userName,
            address: wxAddress.detailInfo,
            mobile: wxAddress.telNumber,
            province: {id: '', name: wxAddress.provinceName},
            city: {id: '', name: wxAddress.cityName},
            district: {id: '', name: wxAddress.countryName}
        }
    },

    pay: (params, callback, cancel) => {
        params.timestamp = params.timeStamp;
        params.success = callback;
        params.cancel = cancel;
        wx.chooseWXPay(params);
    },

    config: (config, callback)=>{
        wx.config(config);

        callback && wx.error((e)=>{
            // alert(e);
            callback(false);
        });

        callback && wx.ready(()=>{
            callback(true, config);
        });
    },

    setShareMessage: (config)=>{
        wx.onMenuShareAppMessage(config);
    },

    setShareTimeline: (config)=>{
        wx.onMenuShareTimeline(config);
    },

    setShare: (config) => {
        wx.onMenuShareAppMessage({
            title: config.title,
            desc: config.desc,
            link: config.link,
            imgUrl: config.imgUrl,
            dataUrl: ''
        });

        wx.onMenuShareTimeline({
            title: config.title + ' ' + config.desc,
            // desc: config.desc,
            link: config.link,
            imgUrl: config.imgUrl,
            dataUrl: ''
        });
    },

    isWeixin: ()=>{
        if(WeixinUtil.__isWeixin == null){
            WeixinUtil.__isWeixin = /MicroMessenger/i.test(window.navigator.userAgent);
        }
        return WeixinUtil.__isWeixin;
    }
}

module.exports = WeixinUtil;