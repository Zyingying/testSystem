"use strict";
const Flux = require("pin-alt/src/flux");
const IndexAction = require("../action/indexAction");
class IndexStore{
  constructor(){
    this.bindActions(IndexAction);

  }

  onFetchRecmdSuccess(result){
    this.recmd = result;
  }

  fetchBannerSuccess(result){
    this.banner = result;
  }

}
module.exports = Flux.createStore(IndexStore);

