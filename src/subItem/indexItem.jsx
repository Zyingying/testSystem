 "use strict"

const React = require("react");
const {Link} = require("react-router");


class IndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {title,showTest,id} = this.props;

        return <div className="w-testIndex">
            <div className="test-title">{title}</div>

            <button className="btn none-btn exam-btn" onClick={()=>{showTest(id)}}>马上测试</button>
        </div>;
    }
}

module.exports = IndexItem;