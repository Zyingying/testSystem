"use strict";
const Flux = require("pin-alt/src/flux");
class PersonalMsgAction {

    constructor(){
        this.url = {
            'update':'http://localhost:3000/user/update'
        };
        this.generateActions('updateMsgSuccess','updateMsgFail');
    }

    getMsg(){
        
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
