/**
 * Created by zyy on 2017/1/4.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
class SubjectAction {

  constructor() {
    this.url = {
      all: 'http://localhost:3000/subjectAll',
      nameListById: 'http://localhost:3000/subjectTitleBySbId/',
      getAllTest: 'http://localhost:3000/subjectTitle/list',
      ftechTest: 'http://localhost:3000/subjectListByItemId/',
      //添加目录&&题目呀
      creatOne: 'http://localhost:3000/subjectType/create',
      creatTwo: 'http://localhost:3000/subjectItemType/create',
      creatTest: 'http://localhost:3000/subject/create',
      creatSubject: 'http://localhost:3000/subject/create',
      doRead: 'http://localhost:3000/subjects/doRead',
      finish: 'http://localhost:3000/subjects/doFinished',
      listRead: 'http://localhost:3000/subjects/listRead',
      listFinish: 'http://localhost:3000/subjects/listFinished'
    };
    this.generateActions('getAllSuccess', 'getAllFail', 'nameListSuccess', 'nameListFail', 'subjectMianSuccess', 'subjectMianSuccess', 'ftechTestSuccess', 'ftechTestFail', 'creatOneSuccess', 'creatOneFail', 'creatTwoSuccess', 'creatTwoFail', 'creatTestSuccess', 'creatTestFail', 'creatSubjectSuccess', 'creatSubjectFail', "readSuccess", 'readFail', 'listReadSuccess', 'listReadFail', 'listFinishSuccess', 'listFinishFail','getAllTestSuccess','getAllTestFail');
  }

  getAll() {
    let sUrl = this.url["all"];
    $.ajax({
      url: sUrl,
      type: 'get',
      dataType: "json",
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.getAllSuccess(result.data);
        } else {
          this.getAllFail();
        }
      },
      error: () => {
        this.getAllFail();
      }
    });
  }

  nameListById(itemId) {
    let sUrl = this.url["nameListById"];
    $.ajax({
      url: sUrl + itemId,
      type: 'get',
      dataType: "json",
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.nameListSuccess(result.data);
        } else {
          this.nameListFail();
        }
      },
      error: () => {
        this.nameListFail();
      }
    });
  }

  getAllTest() {
    let sUrl = this.url["getAllTest"];
    $.ajax({
      url: sUrl,
      type: 'get',
      dataType: "json",
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        // if (result.code == 200) {
          this.getAllTestSuccess(result);
        // } else {
        //   this.getAllTestFail();
        // }
      },
      error: () => {
        this.getAllTestFail();
      }
    });
  }

  ftechTest(titleId) {
    let sUrl = this.url["ftechTest"];
    $.ajax({
      url: sUrl + titleId,
      type: 'get',
      dataType: "json",
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.ftechTestSuccess(result.data);
        } else {
          this.ftechTestFail();
        }
      },
      error: () => {
        this.ftechTestFail();
      }
    });
  }

  creatOne(typename) {
    let sUrl = this.url["creatOne"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {typename: typename},
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.creatOneSuccess(result.data);
        } else {
          this.creatOneFail();
        }
      },
      error: () => {
        this.creatOneFail();
      }
    })
  }

  creatTwo(subjectName, parentType) {
    let sUrl = this.url["creatTwo"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        subjectName: subjectName,
        parentType: parentType
      },
      dataType: 'json',
      success: (result) => {
        if (result.code == 200) {
          this.creatTwoSuccess(result.data);
        } else {
          this.creatTwoFail();
        }
      },
      error: () => {
        this.creatTwoFail();
      }
    })
  }


  creatSubject() {
    let sUrl = this.url["creatSubject"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        subjectName: subjectName,
        parentType: parentType
      },
      dataType: 'json',
      success: (result) => {
        if (result.code == 200) {
          this.creatSubjectSuccess(result.data);
        } else {
          this.creatSubjectFail();
        }
      },
      error: () => {
        this.creatSubjectFail();
      }
    })
  }

  doRead(id, title) {
    let sUrl = this.url["doRead"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        titleId: id,
        title: title
      },
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.readSuccess(result.data);
        } else {
          this.readFail();
        }
      },
      error: () => {
        this.readFail();
      }
    })
  }

  listRead() {
    let sUrl = this.url["listRead"];
    $.ajax({
      url: sUrl,
      type: 'get',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.listReadSuccess(result.data);
        } else {
          this.listReadFail();
        }
      },
      error: () => {
        this.listReadFail();
      }
    })
  }

  finish(id, title, history) {
    let sUrl = this.url["finish"];
    $.ajax({
      url: sUrl,
      type: 'post',
      data: {
        titleId: id,
        title: title,
        history: history
      },
      xhrFields: {withCredentials: true},
      crossDomain: true,
      dataType: 'json',
      success: (result) => {
        if (result.code == 200) {
          this.creatSubjectSuccess(result.data);
        } else {
          this.creatSubjectFail();
        }
      },
      error: () => {
        this.creatSubjectFail();
      }
    })
  }

  listFinish() {
    let sUrl = this.url["listFinish"];
    $.ajax({
      url: sUrl,
      type: 'get',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      success: (result) => {
        if (result.code == 200) {
          this.listFinishSuccess(result.data);
        } else {
          this.listFinishFail();
        }
      },
      error: () => {
        this.listFinishFail();
      }
    })
  }

}


module.exports = Flux.createActions(SubjectAction);