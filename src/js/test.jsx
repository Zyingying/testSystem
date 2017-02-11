"use strict"
const React = require("react");
const SubjectAction = require('../action/subjectAction');
const SubjectStore = require('../store/subjectStore');
const connectToStores = require("alt-utils/lib/connectToStores");
const Radio = require('antd');
const RadioGroup = Radio.Group;

class Test extends React.Component {

    constructor(props) {
        super(props);

    }
    static getStores() {
        return [SubjectStore];
    }

    static getPropsFromStores() {
        return SubjectStore.getState();
    }

    componentWillMount(){
        let {testId} = this.props.location.query;
        SubjectAction.ftechTest(testId);
    }

    onChange(e) {
        console.log('radio checked:' + e.target.value);
        this.setState({
            value: e.target.value
        });
    }

    render() {
        let {testList} = this.props;
        if(!testList){
            return null;
        }
        console.log(testList);
        return <div>
            {testList.map((list,n)=> {
                return <div>
                    <span>{n}</span>{list.question}
                    <div>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <Radio value="a">A</Radio>
                            <Radio value="b">B</Radio>
                            <Radio value="c">C</Radio>
                            <Radio value="d">D</Radio>
                        </RadioGroup>
                        <div style={{marginTop: 20}}>你选中的: {this.state.value}</div>
                    </div>;
                </div>;
            })}
        </div>;

    }
}
module.exports = connectToStores(Test);