 "use strict"

const React = require("react");
const {Link} = require("react-router");


class IndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {title} = this.props;
        // console.log(title,this);


        return <div className="w-testIndex">
            <div className="test-title">{title}</div>

            <button className="btn none-btn exam-btn">马上测试</button>
        </div>;
    }
}

module.exports = IndexItem;