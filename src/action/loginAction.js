/**
 * Created by zyy on 2016/12/28.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
import {message} from 'antd';
class LoginAction {

    constructor(){
        this.url = {
            login:'http://localhost:3000/user/signin',
            register:'http://localhost:3000/user/signup',
            logOut:'http://localhost:3000/user/logout',
            isLogin:'http://localhost:3000/user/isLogin',
            changePsd:'http://localhost:3000/user/updatePassword'
        };
        this.generateActions('loginSuccess','loginFail','registerSuccess','registerFail','logoutSuccess','logoutFail','isLoginSuccess','isLoginFail','changePsdSuccess','changePsdFail');
    }

    login(email,psd){
        let sUrl = this.url["login"];
        $.ajax({
            url: sUrl,
            type: 'post',
            data:{
                email:email,
                password:psd
            },
            xhrFields: {withCredentials : true},
            crossDomain: true,
            dataType:"json",
            success: (result)=> {
                // if(result.code == 200) {
                    this.loginSuccess(result);
                // }else{
                //     this.loginFail();
                // }
            },
            error: ()=> {
              message()
                this.loginFail();
            }
        });
    }
    register(email,psd){
        let sUrl = this.url["register"];
        $.ajax({
            url: sUrl,
            type: 'post',
            data:{
                email:email,
                password:psd
            },
            xhrFields: {withCredentials : true},
            crossDomain: true,
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.registerSuccess(result);
                }else{
                    this.registerFail();
                    message.error(result.msg, 5)
                }
            },
            error: ()=> {
                this.registerFail();
            }
        });
    }

    logOut(){
        let sUrl = this.url["logOut"];
        $.ajax({
            url: sUrl,
            type: 'get',
            dataType:"json",
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success: (result)=> {
                if(result.code == 200) {
                    this.logoutSuccess(result);
                    message.success('退出成功', 5)
                }else{
                    this.logoutFail();
                }
            },
            error: ()=> {
                this.logoutFail();
            }
        });
    }
    isLogin(){
        let sUrl = this.url["isLogin"];
        $.ajax({
            url: sUrl,
            type: 'get',
            dataType:"json",
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success: (result)=> {
                if(result) {

                    this.isLoginSuccess(result);

                }else {
                    this.isLoginFail();
                }
            },
            error: ()=> {
                this.isLoginFail();
            }
        });
    }
    changePsd(pre,newpsd){
      let sUrl = this.url["changePsd"];
      $.ajax({
        url: sUrl,
        type: 'post',
        dataType:"json",
        data:{
          pre_password:pre,
          new_password:newpsd
        },
        xhrFields: {withCredentials : true},
        crossDomain: true,
        success: (result)=> {
          if(result) {
            message.success('更新成功')
            this.changePsdSuccess(result);

          }else {
            this.changePsdFail();
          }
        },
        error: ()=> {
          this.changePsdFail();
        }
      });
    }


}
module.exports = Flux.createActions(LoginAction);