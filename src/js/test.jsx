"use strict"
const React = require("react");
const Nav = require("../module/nav");
const SubjectAction = require('../action/subjectAction');
const SubjectStore = require('../store/subjectStore');
const connectToStores = require("alt-utils/lib/connectToStores");
import {Radio} from 'antd';
// import {Progress, Button, Icon} from 'antd';
const RadioGroup = Radio.Group;

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [],
            count: 0,
            percent: 0,
            finalTime:{
                hour: '00',
                min : '00',
                second:'00'
            }
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
        var time = setInterval(function(){
            that.showRestTime(restTime);
            restTime--;
            if(restTime < 0){
                clearInterval(time);
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

    showRestTime(time){
        let hour,min,second,final = {};

        if(time >= 0){
            hour=Math.floor(time/60/60%24);
            min=Math.floor(time/60%60);
            second=Math.floor(time%60);
        }
        final = {
            hour:(hour > 9 ? hour : '0' + hour),
            min:(min > 9 ? min : '0' + min),
            second:(second > 9 ? second : '0' + second)
        }

        this.setState({finalTime:final})
    }

    render() {
        let {testList} = this.props;
        let {hour,min,second} = this.state.finalTime;
        if (!testList) {
            return null;
        }
        let testNum = testList.length;
        let count = this.state.count;
        let progress = (count/testNum)*100;


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
                        {hour} : {min} : {second}
                    </div>
                </div>

                <div className="testMain">


                { testList.map((list, n)=> {
                    let {choice, answer, question, score} = list;
                    let myAnswer = this.state.value[n];
                    return <div className="testItem">

                        <div className="title">
                            <span>第{n + 1}题 . </span>{question}

                        </div>
                        <div>
                            <RadioGroup onChange={(e)=>{this.onChange(e,n)}} value={myAnswer}>
                                <Radio value={choice.A}
                                       className={ myAnswer == choice.A ?
                                           'chooseSelect' : ''}>
                                    {choice.A}
                                </Radio>
                                <Radio value={choice.B}
                                       className={ myAnswer == choice.B ?
                                           'chooseSelect' : ''}>
                                    {choice.B}
                                </Radio>
                                <Radio value={choice.C}
                                       className={ myAnswer == choice.C ?
                                    'chooseSelect' : ''}>
                                    {choice.C}
                                </Radio>
                                <Radio value={choice.D}
                                       className={ myAnswer == choice.D ?
                                           'chooseSelect' : ''}>
                                    {choice.D}
                                </Radio>
                            </RadioGroup>

                        </div>
                    </div>;
                })}

                <div className="w-btn warning-btn">提交试卷</div>
                </div>
            </div>
        </div>;

    }
}
module.exports = connectToStores(Test);