"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");


const IndexItem = require("../subItem/indexItem");

import { Carousel } from 'antd';



class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static getStores() {
        return [IndexStore];
    }

    static getPropsFromStores() {
        return IndexStore.getState();
    }



    render() {
        let state = this.state,
            title = '';
        return <div className="f-page index">

                    <Nav/>

                <Carousel autoplay="true" className="w-sildshow">
                    <div>
                        <a href=""
                           className="w-banner">
                            <img src="http://static.nowcoder.com/recommand/ad/offer-960.png" alt=""/>
                        </a>
                    </div>
                    <div>
                        <a href=""  className="w-banner" >
                            <img src="http://uploadfiles.nowcoder.com/files/20161105/826546_1478323513738_qimokaoshishouye.jpg" alt=""/>
                        </a>
                    </div>
                </Carousel>

                <div className="w-main">
                    <div className="w-topic">
                        <h1>精准能力评估+智能专项练习</h1>
                        <h2>选择目标职位，测评技能现状，为你定制薄弱知识点专项练习</h2>

                        <IndexItem title='计算机学科专业基础综合'/>
                        <IndexItem title="2016校招真题练习"/>
                        <IndexItem title="2016校招真题练习"/>
                        <IndexItem title="ACM训练"/>

                    </div>
                </div>




        </div>;
    }
}

module.exports = connectToStores(Index);