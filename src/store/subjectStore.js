/**
 * Created by zyy on 2017/1/4.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
const SubjectAction = require("../action/subjectAction");
class SubjectStore{
    constructor(){
        this.bindActions(SubjectAction);
    }

    onGetAllSuccess(result){
        this.subject = result;
    }

    onGetAllFail(){}
}
module.exports = Flux.createStore(SubjectStore);
