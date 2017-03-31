"use strict"
const React = require("react");
const ReactDom = require("react-dom");

class Msgbox extends  React.Component{

    componentDidMount(){
        this.center();
    }

    componentDidUpdate(){
        this.center();
    }

    center(){
        let box = this.refs.box;
        box.style.top = (document.documentElement.clientHeight - box.offsetHeight) / 2 + 'px';
    }

    render(){
        let {children, title, content, center, onOkClick, onCancelClick, okText, cancelText} = this.props;

        return <div className="w-msgbox">
            <div ref="box" className={'box' + (center ? ' center': '')}>
                <h2 className="title">{title}</h2>
                <div className="content">
                    {content}{children}
                </div>

                <div className="btns">
                    {
                        (()=>{
                            let btns = [];
                            if(onCancelClick || cancelText){
                                btns.push(<button key={btns.length} onClick={onCancelClick}>{cancelText || '取消'}</button>);
                            }

                            if(onOkClick || okText){
                                btns.push(<button className="main" key={btns.length} onClick={onOkClick}>{okText || '确定'}</button>);
                            }
                            return btns;
                        })()
                    }
                </div>
            </div>
        </div>;
    }
}
module.exports = Msgbox;