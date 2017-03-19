"use strict"
const React = require("react");
const Nav = require("../module/nav");
const SubjectAction = require('../action/subjectAction');
const SubjectStore = require('../store/subjectStore');
const connectToStores = require("alt-utils/lib/connectToStores");
import {Radio ,BackTop, Icon, Button, notification } from 'antd';
// import {Progress, Button, Icon} from 'antd';
const RadioGroup = Radio.Group;

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [],
            answer:[],
            count: 0,
            percent: 0,
            finalTime:{
                hour: '00',
                min : '00',
                second:'00'
            },
            list:false
        }
        this.onChange = this.onChange.bind(this);

    }

    static getStores() {
        return [SubjectStore];
    }

    static getPropsFromStores() {
        return SubjectStore.getState();
    }

    componentWillMount() {
        let {testId} = this.props.location.query;
        let restTime = 20;
        SubjectAction.ftechTest(testId);
        let that = this;
        var timeCount = setInterval(function(){
            that.showRestTime(restTime);
            restTime--;
            if(restTime < 0){
                clearInterval(timeCount);
            }
        },1000);
    }

    onChange(e,n) {
        console.log('radio checked:' + e.target.value);
        let {value,count} = this.state;
        if(!value[n]){
            count ++ ;
        }
        value[n] = e.target.value;
        this.setState({
            value: value,
            count:count
        });
    }

    timeOver(){
      const key = `open${Date.now()}`;
      const btnClick = function () {
        // to hide notification box
        notification.close(key);
      };
      const btn = (
        <Button type="primary" size="small" onClick={btnClick}>
          我知道了
        </Button>
      );
      const args = {
        message: '考试时间已到',
        description: '亲爱的同学，您的考试时间已到，3秒过后自动提交试卷！',
        btn,
        key
      };
      let that = this;
      notification.open(args);
      setTimeout(function () {
        that.submit();
      },3000)

    }

    showRestTime(time){
        let hour,min,second,final = {};

        if(time >= 0){
            hour=Math.floor(time/60/60%24);
            min=Math.floor(time/60%60);
            second=Math.floor(time%60);
        }if(time == 0){
            this.timeOver();
        }
        if(this.state.list == false){
          final = {
            hour:(hour > 9 ? hour : '0' + hour),
            min:(min > 9 ? min : '0' + min),
            second:(second > 9 ? second : '0' + second)
          }

          this.setState({finalTime:final})
        }

    }

    submit(){
      let answer = [], {testList} = this.props ,i = 0;
      for(i;i < testList.length;i++){
        answer.push(testList[i].answer);
      }
      this.setState({answer:answer,list:true})
      console.log(answer)

    }

    render() {
        let {testList} = this.props;
        let {hour,min,second} = this.state.finalTime;
        if (!testList) {
            return null;
        }
        let testNum = testList.length;
        let {count,answer,value,list} = this.state;
        let progress = (count/testNum)*100;
        let showList = this.state.list;



        return <div className="f-page test">
            <div className="w-categories">
                <Nav/>
            </div>

            <div className="allTopic">
                <div className="subject-progress">
                    <div className="progress">
                        <div className="progress-bar" style={{width: progress +'%'}}></div>
                    </div>
                    <div className="hasDo">{count}/{testNum}</div>
                    <div className="restTime">
                      <Icon type="clock-circle-o" />
                        {hour}:{min}:{second}
                    </div>
                </div>

                <div className="testMain">
                  {this.state.list &&
                  <div className="answerList">
                    答题情况
                    <br/>
                    {answer.map((ans,n)=>{
                      let className = (ans.select === value[n] ? 'right' : 'error' )
                      return <div className={"w-smaillList " + className} key={n}>{n}</div>
                    })}
                  </div>

                  }



                { testList.map((list, n)=> {
                    let {choice, answer, question, score} = list;
                    let myAnswer = this.state.value[n],judeg;
                    if(answer.select === myAnswer){
                      judeg = true;
                    }else{
                      judeg = false;
                    }
                    return <div className="testItem" key={n}>

                        <div className="title" key={n}>
                            <span>第{n + 1}题 . </span>{question}

                        </div>
                        <div>
                            <RadioGroup onChange={(e)=>{this.onChange(e,n)}} value={myAnswer}>
                                <Radio value={choice.A}
                                       className={ (myAnswer == choice.A )?
                                         'chooseSelect':(showList && (choice.A==answer.select) ? 'error':' ')}>
                                    {choice.A}
                                </Radio>
                                <Radio value={choice.B}
                                       className={ myAnswer == choice.B ?
                                         'chooseSelect':(showList && (choice.B==answer.select) ? 'error':' ')}>
                                    {choice.B}
                                </Radio>
                                <Radio value={choice.C}
                                       className={ myAnswer == choice.C ?
                                         'chooseSelect':(showList && (choice.C==answer.select) ? 'error':' ')}>
                                    {choice.C}
                                </Radio>
                                <Radio value={choice.D}
                                       className={ myAnswer == choice.D ?
                                         'chooseSelect':(showList && (choice.D==answer.select) ? 'error':' ')}>
                                    {choice.D}
                                </Radio>
                            </RadioGroup>

                        </div>
                        {this.state.list &&
                        <div>答案解析：<br/>{list.answer.detail}</div>}
                    </div>;
                })}

                <div className="w-btn warning-btn"
                     onClick={()=>{this.submit()}}>提交试卷</div>
                </div>
                <BackTop />
            </div>
        </div>;

    }
}
module.exports = connectToStores(Test);