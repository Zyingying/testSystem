"use strict";
var express = require('express');
var superagent = require('superagent');
var app = express();
var HOST_admin = "http://admin.pintest.mail.163.com";
var IS_NODE_ENV_PRODUCTION = (process.env.NODE_ENV === 'production');
var HOST = IS_NODE_ENV_PRODUCTION?"http://pin.mail.163.com":"http://pintest.mail.163.com";
var path = require("path");
var fs = require("fs");
var request = require('request');

var routes = require('./interface');
var paths = Object.keys(routes);


function fFixUtmPath(fromWebPath){
    let utmsInfo = ["utm_source", "utm_medium", "utm_term","utm_content", "utm_campaign", "pin_r", "pin_r_i"],finalUtm;
    utmsInfo.forEach((key,nIndex)=>{
        if(new RegExp('(\\?|\\&)' + key + '=(.*?)($|\\&)', "i").test(fromWebPath)){
            finalUtm = finalUtm||{};
            finalUtm[key] = RegExp.$2;
        }
    });
    return finalUtm;
}

app.all("/",function(req,res,next){
    if(!req.query.path){
        next();
        return;
    }
    var fromWebPath = decodeURIComponent(req.query.path);
    let _path,finalUtm =fFixUtmPath(fromWebPath);

    if(paths.find(path => {
            var r = new RegExp("^(" + path + ')($|\\?)', "i").test(fromWebPath);
            if(r){
                _path = routes[path].mobileUrl || "";
                if(routes[path].info){
                    if(typeof  routes[path].info == "string"){
                        if(new RegExp('(\\?|\\&)' + routes[path].info + '=(.*?)($|\\&)', "i").test(fromWebPath)){
                            _path=_path.replace(":"+routes[path].info,RegExp.$2);
                        }
                    }
                    if(typeof  routes[path].info == "array"){
                        routes[path].info.forEach(sInfo=>{
                            if(new RegExp('(\\?|\\&)' + sInfo + '=(.*?)($|\\&)', "i").test(fromWebPath)){
                                _path= _path.replace(":"+sInfo,RegExp.$2);
                            }
                        });
                    }
                }else if(fromWebPath.indexOf("?")>-1){
                    _path = fromWebPath.replace(path,_path);
                }
            }
            return r;
        })){
        //加上utm参数
        var prefix = "/?m/#/";
        if(finalUtm){
            prefix = "/?";
            for(var key in finalUtm){
                prefix += key+"="+finalUtm[key]+"&";
            }
            prefix+="m/#/";
        }
        //改变路径
        return res.redirect(prefix+_path);
    }
    next();
});

app.all("/",function(req,res,next){
    var url = '/?m/',fromWebPath;
    if(!('m/' in req.query)){
        if(req.query.path){
            fromWebPath = decodeURIComponent(req.query.path);
        }else{
            fromWebPath = req.originalUrl;
        }
        res.redirect((fromWebPath.indexOf("?")>-1?fromWebPath +"&m/":url));
    }else{
        next()
    }
});

app.use('/', express.static(path.join(__dirname , "html", (process.env.NODE_ENV === 'local'?'local':(IS_NODE_ENV_PRODUCTION?"release":"development")))));
app.use('/js', express.static(__dirname + "/build"));

app.all('/\*/\*', (req, res, next) => {
    var sUrl = req.originalUrl;
    req.pipe(request(HOST+sUrl)).pipe(res);
});

app.all('/\*/\*/\*', (req, res, next) => {
    var sUrl = req.originalUrl;
    req.pipe(request(HOST+sUrl)).pipe(res);
});
/*app.all('/groupon/gopay', (req, res, next) => {
    var sUrl = req.originalUrl;
    req.pipe(request(HOST+sUrl)).pipe(res);
});
app.all('/choosePay', (req, res, next) => {
    var sUrl = req.originalUrl;
    req.pipe(request(HOST_admin + sUrl)).pipe(res);
});
app.all('/payOrder', (req, res, next) => {
    var sUrl = req.originalUrl;
    req.pipe(request(HOST_admin + sUrl)).pipe(res);
});*/
/*app.get('/\*!/\*!/\*', function(req, res, next){
    var sUrl = req.originalUrl;
    superagent.get(HOST+sUrl).set('cookie',req.get("cookie")).pipe(res);
});

app.post('/\*!/\*!/\*', function(req, res, next){
    var sUrl = req.originalUrl;
    superagent.post(HOST+sUrl).set('cookie',req.get("cookie")).send(req.body).pipe(res);
});*/
console.log("mobile app started ...");
app.listen(6004);