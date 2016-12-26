/**
 * Created by Zyingying on 2016/10/12 0012.
 */
    "use strict"
//require("../css/index.scss");
const React = require("react");
const {Link} = require("react-router");
const Nav = require("../module/nav");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("pin-alt/src/actions/indexAction");
const IndexStore = require("pin-alt/src/stores/indexStore");
const util = require('pin-util/src/web_util');


class IndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    joinGroup(id){
        let history = this.props.history;
        history.pushState(null, '/goodsDetail/' + id);
    }

    render() {
        let items = this.props.categorie;
        return <div>
            {items ? items.map((item,n)=> {
                if(!item.buyAble){
                    return null;
                }

                return <div className="w-goods large" key={n}>
                    <div className="pic"
                         onClick={()=> {this.joinGroup(item._id);}}>
                        {/*商品无剩余*/}

                        { item.remain <= 0 && item.status == 1 ?
                            <div className="soldOut">已售罄</div> : null
                        }

                        <img src={util.getImage(item.image250 , item.imageToken, 'intro')}
                             alt=""
                             height="1.6rem"/>
                        <div className="goodsTag">
                            {item.productArea ?
                                <div className="w-label">{item.productArea}</div>

                                :null
                            }
                            {item.isRecent ?
                                <span className="w-tag">新品</span>
                                : null
                            }
                        </div>

                    </div>
                    <div className="info">
                        <h2>{item.name}</h2>
                        <p>{item.desc}</p>
                    </div>
                    <div className="oprt">
                        <span className="grp">
                            <i className="i-group xs group-icon"></i>{item.groupQuota}人团
                        </span>
                        <span className="price">
                            <strong className="w-price">¥{item.mobilePrice}</strong>包邮
                        </span>
                        <span className="original">单购价：¥{item.yanPrice + item.yanShipPrice}</span>
                        <Link className="w-btn main" to={'goodsDetail/' + item._id}>
                            <div className="tojoinGroup">
                                去开团
                            </div>
                            <div className="icon"><i className="i-white-right toGoods"></i></div>

                        </Link>
                    </div>
                </div>;


            }) : null}
        </div>
    }
}

module.exports = IndexItem;