/**
 * Created by zyy on 2016/12/28.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class LoginAction {

    constructor(){
        this.url = {
            login:'http://localhost:3099/user/signup'
        };
        // this.generateActions('');
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


}
module.exports = Flux.createActions(LoginAction);