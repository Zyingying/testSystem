/**
 * Created by zyy on 2016/12/28.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class LoginAction {

    constructor(){
        this.url = {
            login:'http://localhost:3000/user/signin',
            register:'http://localhost:3000/user/signup',
            logout:'http://localhost:3000/user/logout'
        };
        this.generateActions('loginSuccess','loginFail','registerSuccess','registerFail','logoutSuccess','logoutFail');
    }

    login(email,psd){
        let sUrl = this.url["login"];
        $.ajax({
            url: sUrl,
            type: 'post',
            data:{
                username:email,
                password:psd
            },
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.loginSuccess(result.result);
                }else{
                    this.loginFail();
                }
            },
            error: ()=> {
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
                username:email,
                password:psd
            },
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.registerSuccess(result.result);
                }else{
                    this.registerFail();
                }
            },
            error: ()=> {
                this.registerFail();
            }
        });
    }

    logout(){
        let sUrl = this.url["register"];
        $.ajax({
            url: sUrl,
            type: 'get',
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.logoutSuccess(result.result);
                }else{
                    this.logoutFail();
                }
            },
            error: ()=> {
                this.logoutFail();
            }
        });
    }


}
module.exports = Flux.createActions(LoginAction);