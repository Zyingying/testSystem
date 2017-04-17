/**
 * Created by Zyingying on 2017/4/17 0017.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class AdminAction {

    constructor(){
        this.url = {
            "levelOne":'http://localhost:3000/subjectType/create',
            'levelTwo':'http://localhost:3000/subjectType/create'
        };
        this.generateActions('creatLOneSuccess','creatLOneFail','updateMsgSuccess','updateMsgFail');
    }

    creatLOne(typename){
        let sUrl = this.url['levelOne'];
        $.ajax({
            url:sUrl,
            type:'post',
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            data:{

            },
            success:(result)=>{
                if(result.code == 200){
                    this.creatLOneSuccess(result.data);
                }else{
                    this.creatLOneFail();
                }
            },
            error:()=>{
                this.creatLOneFail();
            }
        })
    }

    creatLTwo(subjectName,parentType){
        let sUrl = this.url["update"];
        $.ajax({
            url:sUrl,
            type:'post',
            data:{
                subjectName: subjectName,
                parentType: parentType
            },
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success:(result)=>{
                if(result.code == 200){
                    this.creatLTwoSuccess(result.msg);
                }else{
                    this.creatLTwoFail();
                }
            },
            error:()=>{
                this.creatLTwoFail();
            }
        })
    }
}
module.exports = Flux.createActions(AdminAction);
