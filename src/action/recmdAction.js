/**
 * Created by zyy on 2017/5/21.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class RecmdAction {
  constructor() {
    this.url = {
      fetchRecmd:'http://localhost:3000/subjectTitle/listWeigh/:'
    };

    this.generateActions('fetchRecmdSuccess','fetchRecmdFail');
  }

  fetchRecmd(length) {
    let sUrl = this.url['fetchRecmd'];
    $.ajax({
      url: sUrl+length,
      type: 'get',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
          this.fetchRecmdSuccess(result);
      },
      error: () => {
        this.fetchRecmdFail();
      }
    })
  }



}
module.exports = Flux.createActions(RecmdAction);
