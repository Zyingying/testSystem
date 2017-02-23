/**
 * Created by zyy on 2017/1/4.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class SubjectAction {

    constructor(){
        this.url = {
          all:'http://localhost:3000/subjectAll',
          nameListById:'http://localhost:3000/subjectTitleBySbId/',
          ftechTest:'http://localhost:3000/subjectListByItemId/',
          //添加目录&&题目呀
          creatOne:'http://localhost:3000/subjectType/create',
          creatTwo:'http://localhost:3000/subjectItemType/create',
          creatTest:'http://localhost:3000/subject/create',
          //获取题目，
          fetch:'http://localhost:3000/subjectListByItemId/'
        };
        this.generateActions('getAllSuccess','getAllFail','nameListSuccess','nameListFail','subjectMianSuccess','subjectMianSuccess','ftechTestSuccess','ftechTestFail');
        this._cacheAvatar = {};
    }

    getAll(){
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

    nameListById(itemId){
        let sUrl = this.url["nameListById"];
        $.ajax({
            url: sUrl + itemId,
            type: 'get',
            dataType:"json",
            success: (result)=> {
                if(result.code == 200) {
                    this.nameListSuccess(result.data);
                }else{
                    this.nameListFail();
                }
            },
            error: ()=> {
                this.nameListFail();
            }
        });
    }

    ftechTest(titleId){
      let sUrl = this.url["ftechTest"];
      $.ajax({
        url: sUrl + titleId,
        type: 'get',
        dataType:"json",
        success: (result)=> {
            if(result.code == 200) {
                this.ftechTestSuccess(result.data);
            }else{
                this.ftechTestFail();
            }
        },
        error: ()=> {
            this.ftechTestFail();
        }
      });
    }

    creatOne(typename){
      let sUrl = this.url["creatOne"];
      $.ajax({
        url:sUrl,
        type:'post',
        data:{typename:typename},
        dataType:'json',
        success:(result)=>{
          if(result.code == 200){
            this.creatOneSuccess(result.data);
          }else{
            this.creatOneFail();
          }
        },
        error:()=>{
          this.creatOneFail();
        }
      })
    }

}
module.exports = Flux.createActions(SubjectAction);