/**
 * Created by Zyingying on 2016/10/12 0012.
 */
    "use strict"
//require("../css/index.scss");
const React = require("react");
const {Link} = require("react-router");

// const connectToStores = require("alt-utils/lib/connectToStores");
// const IndexAction = require("pin-alt/src/actions/indexAction");
// const IndexStore = require("pin-alt/src/stores/indexStore");



class IndexItem extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return <div className="w-testIndex">
            <div className="test-title"></div>

            <button>马上测试</button>
        </div>;
    }
}

module.exports = IndexItem;