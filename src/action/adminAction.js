/**
 * Created by Zyingying on 2017/4/17 0017.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
import {message} from 'antd';

class AdminAction {

  constructor() {
    this.url = {
      "levelOne": 'http://localhost:3000/subjectType/create',
      'levelTwo': 'http://localhost:3000/subjectItemType/create',
      'creatTest': 'http://localhost:3000/subject/create',

      'testName': 'http://localhost:3000/subjectTitle/create',
      'testSubject': 'http://localhost:3000/subject/create',
      'changeOne':'http://localhost:3000/subjectType/update',
      'changeTwo':'http://localhost:3000/subjectItemType/update',
      'changeTestName':'http://localhost:3000/subjectTitle/update'
    };

    this.generateActions('creatLOneSuccess', 'creatLOneFail', 'creatLTwoSuccess', 'creatLTwoFail', 'creatTestSuccess', 'creatTestFail','changOneSuccess','changOneFail','changeTwoSuccess','changeTwoFail','changeTestNameSuccess','changeTestFail');
  }

  creatLOne(typename) {
    let sUrl = this.url['levelOne'];
    $.ajax({
      url: sUrl,
      type: 'post',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: {
        typename: typename
      },
      success: (result) => {
        if (result.code == 200) {
          this.creatLOneSuccess(result.data);
          message.success('添加一级成功')
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.creatLOneFail();
        }
      },
      error: () => {
        this.creatLOneFail();
      }
    })
  }

  creatLTwo(parentType, subjectName) {
    let sUrl = this.url["levelTwo"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        subjectName: subjectName,
        parentType: parentType
      },
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.creatLTwoSuccess(result.msg);
          message.success('添加二级成功')
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.creatLTwoFail();
        }
      },
      error: () => {
        this.creatLTwoFail();
      }
    })
  }


  creatTest(title, subTime, two, examTime) {
    let sUrl = this.url["testName"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        subjectItem: two,
        title: title,
        subjectTime: subTime,
        examTime: examTime
      },
      dataType: 'json',
      success: (result) => {
        if (result.code == 200) {
          this.creatTestSuccess(result.data);
          message.success('添加题目标题成功')
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.creatTestFail();
        }
      },
      error: () => {
        this.creatTestFail();
      }
    })
  }

  creatSubject(title, question, choice, select, detail, score) {
    let sUrl = this.url["testSubject"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        title: title,
        question: question,
        choice: choice,
        select: select,
        detail: detail,
        score: score
      },
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.creatTestSuccess(result.msg);
          message.success('添加题目标题成功')
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.creatTestFail();
        }
      },
      error: () => {
        this.creatTestFail();
      }
    })
  }

  changOne(one,id) {
    let sUrl = this.url["changeOne"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        subjectType:one,
        _id:id
      },
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.changOneSuccess(result.msg);
          message.success('修改成功')
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.changOneFail();
        }
      },
      error: () => {
        this.changOneFail();
      }
    })
  }

  changeTwo(id,parentId,two){
    let sUrl = this.url["changeTwo"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        _id : id,
        parentId:parentId,
        subjectName: two
      },
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.changeTwoSuccess(result.msg);
          message.success('修改成功')
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.changeTwoFail();
        }
      },
      error: () => {
        this.changeTwoFail();
      }
    })
  }

  changeTestName(id,two,new_test_name,create_time,examTime){
    let sUrl = this.url["changeTestName"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        preTitleId:id,
        subjectItemId: two,
        title: new_test_name,
        subjectTime: create_time,
        examTime: examTime
      },
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.changeTestNameSuccess(result.msg);
          message.success('修改成功')
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.changeTestNameFail();
        }
      },
      error: () => {
        this.changeTestNameFail();
      }
    })
  }

}
module.exports = Flux.createActions(AdminAction);
