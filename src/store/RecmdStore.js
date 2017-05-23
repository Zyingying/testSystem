/**
 * Created by zyy on 2017/5/21.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
const RecmdAction = require("../action/recmdAction");
class RecmdStore{
  constructor(){
    this.bindActions(RecmdAction);

  }

  onFetchRecmdSuccess(result){
    this.recmd = result;
  }

}
module.exports = Flux.createStore(RecmdAction);

