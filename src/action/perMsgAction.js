"use strict";
const Flux = require("pin-alt/src/flux");
class PersonalMsgAction {

    constructor(){
        this.url = {
            "userDetail":'http://localhost:3000/user/getDetail',
            'update':'http://localhost:3000/user/update'
        };
        this.generateActions('getMsgSuccess','getMsgFail','updateMsgSuccess','updateMsgFail');
    }

    getUserDetail(){
        let sUrl = this.url['userDetail'];
        $.ajax({
            url:sUrl,
            type:'get',
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success:(result)=>{
                if(result.code == 200){
                    this.getMsgSuccess(result.data);
                }else{
                    this.getMsgFail();
                }
            },
            error:()=>{
                this.getMsgFail();
            }
        })
    }

    updateMsg(name,gender,tel,birth,school,education){
        let sUrl = this.url["update"];
        $.ajax({
            url:sUrl,
            type:'post',
            data:{
                nikename:name,
                gender:gender,
                tel:tel,
                birthday:birth,
                school:school,
                education:education
            },
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success:(result)=>{
                if(result.code == 200){
                    this.updateMsgSuccess(result.data);
                }else{
                    this.updateMsgFail();
                }
            },
            error:()=>{
                this.updateMsgFail();
            }
        })
    }
}
module.exports = Flux.createActions(PersonalMsgAction);
