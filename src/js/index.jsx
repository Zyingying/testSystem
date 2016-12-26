"use strict"
const React = require("react");
const Nav = require("../module/nav");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");
const IndexItem = require("../subItem/indexItem");
const {Link} = require("react-router");



class Index extends React.Component {
    constructor(props) {
        super(props);

    }

    static getStores() {
        return [IndexStore];
    }

    static getPropsFromStores() {
        return IndexStore.getState();
    }


    render() {
        return <div className="f-page index">

                <div className="w-categories">
                    <Nav/>
                </div>
                {/*<SlideShow/>*/}




        </div>;
    }
}

module.exports = connectToStores(Index);