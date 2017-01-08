/**
 * Created by zyy on 2017/1/4.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class SubjectAction {

    constructor(){
        this.url = {
            all:'http://localhost:3000/subjectAll',
            itemList:'http://localhost:3000/subjectListByItemId/:'
        };
        this.generateActions('getAllSuccess','getAllFail');
        this._cacheAvatar = {};
    }

    getAll(){
        let sUrl = this.url["all"];
        $.ajax({
            url: sUrl,
            type: 'get',
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.getAllSuccess(result.data);
                }else{
                    this.getAllFail();
                }
            },
            error: ()=> {
                this.getAllFail();
            }
        });
    }

    itemList(itemId){
        let sUrl = this.url["getTestList"];
        $.ajax({
            url: sUrl + itemId,
            type: 'get',
            dataType:"json",
            success: (result)=> {
                // if(result.code == 200) {
                //     this.loginSuccess(result);
                // }else{
                //     this.loginFail();
                // }
                console.log(result);
            },
            error: ()=> {
                this.loginFail();
            }
        });
    }

}
module.exports = Flux.createActions(SubjectAction);