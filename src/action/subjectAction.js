/**
 * Created by zyy on 2017/1/4.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class SubjectAction {

    constructor(){
        this.url = {
            all:'http://localhost:3000/subjectAll'
        };
        this.generateActions('getAllSuccess','getAllFail');
        this._cacheAvatar = {};
    }

    getAll(email,psd){
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

}
module.exports = Flux.createActions(SubjectAction);