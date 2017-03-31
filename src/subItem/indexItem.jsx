 "use strict"

const React = require("react");
const {Link} = require("react-router");
const type = {
    "frontend":1,
    "android":2,
    "frontback":3
}


class IndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {title,showTest,id} = this.props;

        return <div className="w-testIndex">
            <div className="test-title">{title}</div>
            <div className="logo frontend"></div>

            <button className="btn none-btn exam-btn" onClick={()=>{showTest(id)}}>马上测试</button>
        </div>;
    }
}

module.exports = IndexItem;