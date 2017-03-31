"use strict";
const Flux = require("pin-alt/src/flux");
const PerMsgAction = require("../action/perMsgAction");
const moment = require("moment");

class PersonalMsgStore{
    constructor(){
        this.bindActions(PerMsgAction);
    }

    onUpdateMsgSuccess(result){
        this.setUserMsg = result;
    }
    onGetMsgSuccess(result){
        this.getUserMsg = result;
    }
}
module.exports = Flux.createStore(PersonalMsgStore);
