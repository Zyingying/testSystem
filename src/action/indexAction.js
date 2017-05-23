"use strict";

const Flux = require("pin-alt/src/flux");

import {message} from 'antd';
class IndexAction {

  constructor() {
    this.url = {
      fetchRecmd:'http://localhost:3000/subjectTitle/listWeigh/:',
      chooseRecmd:'http://localhost:3000/subjectTitle/updateWeight',
      fetchBanner:'http://localhost:3000/banner/list/',
      addBanner:'http://localhost:3000/banner/addBanner',
      editBanner:'http://localhost:3000/banner/updateBanner',
      delBanner:'http://localhost:3000/banner/deleteBanner'
    };

    this.generateActions('fetchRecmdSuccess','fetchRecmdFail','chooseRecmdSuccess','fetchBannerSuccess','addBannerSuccess','editBannerSuccess','delBannerSuccess');
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

  chooseRecmd(titleId){
    let sUrl = this.url['chooseRecmd'];
    $.ajax({
      url: sUrl,
      type: 'post',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data:{
        titleId:titleId
      },
      success: (result) => {
        if(result.code == 200){
          message.success(result.msg);
          this.chooseRecmdSuccess(result);
        }
      },
      error: () => {
        this.chooseRecmdFail();
      }
    })
  }

  fetchBanner(need){
    let sUrl = this.url['fetchBanner'];
    $.ajax({
      url: sUrl + need,
      type: 'get',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if(result.code == 200){
          // message.success(result.msg);
          this.fetchBannerSuccess(result.data);
        }else{
          message.error(result.msg,2);
        }
      },
      error: (err) => {
        message.error(err,2);
      }
    })
  }

  addBanner(url,num){
    let sUrl = this.url['addBanner'];
    $.ajax({
      url: sUrl ,
      type: 'post',
      dataType: 'json',
      data:{
        url: url,
        position: num
      },
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if(result.code == 200){
          message.success(result.msg);
          this.addBannerSuccess(result);
        }else{
          message.error(result.msg,2);
        }
      },
      error: (err) => {
        message.error(err,2);
      }
    })
  }

  editBanner(id,url,num){
    let sUrl = this.url['editBanner'];
    $.ajax({
      url: sUrl ,
      type: 'post',
      dataType: 'json',
      data:{
        preId: id,
        url: url,
        position: num
      },
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if(result.code == 200){
          message.success('修改成功');
          this.editBannerSuccess(result);
        }else{
          message.error(result.msg,2);
        }
      },
      error: (err) => {
        message.error(err,2);
      }
    })
  }


  delBanner(id){
    let sUrl = this.url['delBanner'];
    $.ajax({
      url: sUrl ,
      type: 'post',
      dataType: 'json',
      data:{
        id: id,
      },
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if(result.code == 304){
          message.success(result.msg);
          this.delBannerSuccess(result);
        }else{
          message.error(result.msg,2);
        }
      },
      error: (err) => {
        message.error(err,2);
      }
    })
  }

}
module.exports = Flux.createActions(IndexAction);
