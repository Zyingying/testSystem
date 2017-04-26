/**
 * Created by Zyingying on 2017/4/17 0017.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
import {message} from 'antd';

class AdminAction {

    constructor(){
        this.url = {
            "levelOne":'http://localhost:3000/subjectType/create',
            'levelTwo':'http://localhost:3000/subjectItemType/create',
            'testName':'http://localhost:3000/subjectTitle/create',
            'testSubject':'http://localhost:3000/subject/create'
        };
        this.generateActions('creatLOneSuccess','creatLOneFail','creatLTwoSuccess','creatLTwoFail','creatTestSuccess','creatTestFail');
    }

    creatLOne(typename){
        let sUrl = this.url['levelOne'];
        $.ajax({
            url:sUrl,
            type:'post',
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            data:{
              typename:typename
            },
            success:(result)=>{
                if(result.code == 200){
                    this.creatLOneSuccess(result.data);
                    message.success('添加一级成功')
                    setTimeout(function () {
                        window.location.reload();
                    },2000)
                }else{
                    this.creatLOneFail();
                }
            },
            error:()=>{
                this.creatLOneFail();
            }
        })
    }

    creatLTwo(parentType,subjectName){
        let sUrl = this.url["levelTwo"];
        $.ajax({
            url:sUrl,
            type:'post',
            data:{
                subjectName: subjectName,
                parentType: parentType
            },
            dataType:'json',
            xhrFields: {withCredentials : true},
            crossDomain: true,
            success:(result)=>{
                if(result.code == 200){
                    this.creatLTwoSuccess(result.msg);
                    message.success('添加二级成功')
                    setTimeout(function () {
                        window.location.reload();
                    },2000)
                }else{
                    this.creatLTwoFail();
                }
            },
            error:()=>{
                this.creatLTwoFail();
            }
        })
    }

    creatTest(title,subjectTime,subjectItem){
    let sUrl = this.url["testName"];
    $.ajax({
      url:sUrl,
      type:'post',
      data:{
        title: title,
        subjectTime: subjectTime,
        subjectItem:subjectItem
      },
      dataType:'json',
      xhrFields: {withCredentials : true},
      crossDomain: true,
      success:(result)=>{
        if(result.code == 200){
          this.creatTestSuccess(result.msg);
          message.success('添加题目标题成功')
          setTimeout(function () {
            window.location.reload();
          },2000)
        }else{
          this.creatTestFail();
        }
      },
      error:()=>{
        this.creatTestFail();
      }
    })
  }

    creatSubject(title,question,choice,select,detail,score){
    let sUrl = this.url["testSubject"];
    $.ajax({
      url:sUrl,
      type:'post',
      data:{
        title: title,
        question:question,
        choice:choice,
        select:select,
        detail:detail,
        score:score
      },
      dataType:'json',
      xhrFields: {withCredentials : true},
      crossDomain: true,
      success:(result)=>{
        if(result.code == 200){
          this.creatTestSuccess(result.msg);
          message.success('添加题目标题成功')
          setTimeout(function () {
            window.location.reload();
          },2000)
        }else{
          this.creatTestFail();
        }
      },
      error:()=>{
        this.creatTestFail();
      }
    })
  }
}
module.exports = Flux.createActions(AdminAction);
