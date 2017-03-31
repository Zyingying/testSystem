"use strict";
const Flux = require("pin-alt/src/flux");
const IndexAction = require("../action/indexAction");
class IndexStore{
  constructor(){
    this.bindActions(IndexAction);

  }

}
module.exports = Flux.createStore(IndexStore);

