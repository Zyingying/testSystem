"use strict"
const React = require("react");

class Test extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        let {testId} = this.props.location.query;
        return <div>考试中</div>

    }
}
module.exports = Test;