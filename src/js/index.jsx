"use strict"
const React = require("react");
const Nav = require("../module/nav");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");
const IndexItem = require("../subItem/indexItem");
const {Link} = require("react-router");
import { Carousel } from 'antd';



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

                <Carousel autoplay="true" className="w-sildshow">
                    <div>
                        <a href=""
                           className="w-banner"
                           style="background: url('//static.nowcoder.com/recommand/ad/offer-960.png') center top no-repeat rgb(135, 198, 231);"></a>
                    </div>
                    <div>
                        <a href=""  className="w-banner" style="background: url('//static.nowcoder.com/recommand/ad/offer-960.png') center top no-repeat rgb(135, 198, 231);"></a>
                    </div>
                </Carousel>

                <div className="w-main">
                    <div className="w-topic">
                        <h1>这是一个标题</h1>
                        <h2>这是一个副标题</h2>

                        <IndexItem/>
                        <IndexItem/>
                        <IndexItem/>
                        <IndexItem/>

                    </div>
                </div>




        </div>;
    }
}

module.exports = connectToStores(Index);