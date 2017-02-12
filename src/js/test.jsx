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
            value: ' ',
            percent: 0,
            hasDo: 1
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
        SubjectAction.ftechTest(testId);
    }

    onChange(e) {
        console.log('radio checked:' + e.target.value);
        this.setState({
            value: e.target.value
        });
    }

    increase() {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({percent});
    }

    decline() {
        let percent = this.state.percent - 10;
        if (percent < 0) {
            percent = 0;
        }
        this.setState({percent});
    }


    render() {
        let {testList} = this.props;
        if (!testList) {
            return null;
        }
        console.log(testList);
        let testNum = testList.length;
        let hasDo = this.state.hasDo;
        let progress = (hasDo/testNum)*100;
        return <div className="f-page test">
            <div className="w-categories">
                <Nav/>
            </div>

            <div className="allTopic">
                <div className="subject-progress">
                    <div className="progress">
                        <div className="progress-bar" style={{width: progress +'%'}}></div>
                    </div>
                    <div className="restTime">
                        11:11:11
                    </div>
                </div>

                <div className="testMain">


                { testList.map((list, n)=> {
                    let {choice, answer, question, score} = list;
                    return <div className="testItem">

                        <div className="title">
                            <span>第{n + 1}题 . </span>{question}

                        </div>
                        <div>
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio value={choice.A}
                                       className={this.state.value == choice.A ?
                                           'chooseSelect' : ''}>
                                    A
                                </Radio>
                                <Radio value={choice.B}
                                       className={this.state.value == choice.B ?
                                           'chooseSelect' : ''}>
                                    B
                                </Radio>
                                <Radio value={choice.C} className={this.state.value == choice.C ?
                                    'chooseSelect' : ''}>C</Radio>
                                <Radio value={choice.D}
                                       className={this.state.value == choice.D ?
                                           'chooseSelect' : ''}>D</Radio>
                            </RadioGroup>
                            <div style={{marginTop: 20}}>你选中的: {this.state.value}</div>
                        </div>
                    </div>;
                })}
                </div>
            </div>
        </div>;

    }
}
module.exports = connectToStores(Test);