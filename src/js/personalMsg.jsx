"use strict";
const React = require("react");
const connectToStores = require("alt-utils/lib/connectToStores");
const PersonalAction = require("pin-alt/src/actions/personalAction");
const PersonalStore = require("pin-alt/src/stores/personalStore");
const PerMsgAction = require("../action/perMsgAction");
const PerMsgStore = require("../store/perMsgStore");
const MobileUtil = require("../mobileUtil");
const Msgbox = require('../module/msgbox');
const WeixinUtil = require("../weixinUtil");

const DatePicker = require("react-mobile-datepicker");

class PersonalMsg extends React.Component{
    constructor(props){
        super(props);
        let uid =  window._pin_data &&  window._pin_data._user && window._pin_data._user.uid;
        PersonalAction.getAvatar(uid,55);
        // PersonalAction.getUserName();
        PerMsgAction.getUser();

        this.state = {
            msg:{
                _id: "",
                gender: 0,
                id: "",
                location: "",
                name: "",
                uid: "",
                birthday:""
            },
            tips:'',
            time: new Date(),
            isOpen: false,
        }
    }
    static getStores(){
        return [PersonalStore,PerMsgStore];
    }

    static getPropsFromStores(){
        return {
            ...PersonalStore.getState(),
            ...PerMsgStore.getState()
        }
    }

    onInputChange(key, value){
        this.state.msg[key] = value
        this.setState(this.state);
    }

    getValue(key){
        let msg = this.state.msg;
        let value = msg[key];
            return value;

    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        let year = (time.getYear() <2000 ? time.getYear()+1900
                    :
                    time.getYear()).toString();
        var newBirth = year+ '-' +  (time.getMonth()+1) +'-' + time.getDate();

        Object.assign(this.state.msg, {birthday:newBirth});
        this.setState({ msg : this.state.msg, isOpen: false });
    }

    validate(){
        let msg = this.state.msg;
        let errMsg = '';
        if (!msg.name || msg.name.length == 0) {
            errMsg = "请填称昵";
        }else if(!(/^[\u4e00-\u9fa5a-zA-Z-_.0-9]{1,16}$/.test(msg.name))){
            errMsg = "支持1-16位中文英文数字以及-_.";
        } else if(/[<|>]/.test(msg.name)){
            errMsg = "请不要输入<>字符";
        }else if (msg.gender > 2) {
            errMsg = "性别有误";
        }
        if(errMsg) {
            throw errMsg;
        }
    }

    submit(){
        try{
            this.validate();
            PerMsgAction.modifyUser(this.state.msg, ()=> {
                this.props.history.goBack();
            });
        }catch(e){
            this.alert(e);
        }
    }
    alert(text){
        this.setState({
            tips: text
        });
    }
    topMove(){
        // if(window.screen.availHeight < 500){
            this.refs.personalMsg.className = 'f-page personal personalMsg moveTop';
        // }
    }
    topReturn(){
        this.refs.personalMsg.className = 'f-page personal personalMsg';
    }

    render(){
        let {avatarUrl,userMsg} = this.props;

        if(!userMsg){
            return null;
        }
        if(this.state.msg != userMsg){
            this.state.msg = userMsg;
        }

        return <div className="f-page personal personalMsg" ref="personalMsg">
                <header className="">
                    <div className="w-user-img">
                        <img className="w-face big"
                             src={avatarUrl}
                             alt="头像"/>
                    </div>
                </header>

                <table className="main">
                    <tbody>
                    { WeixinUtil.isWeixin()?
                        null:
                        <tr className="w-perMsg bordered">
                            <th className="item">登录帐号</th>
                            <td><input type="text"
                                       value={ this.getValue('uid')}
                                       className="userNum"
                                       disabled="disabled"/></td>
                        </tr>
                    }

                        <tr className="w-perMsg bordered">
                            <th className="item">昵称</th>
                            <td>
                                <input type="text"
                                       value={this.getValue('name')}
                                       onFocus={()=>{this.topMove();}}
                                       onChange={(e)=>{this.onInputChange('name', e.target.value)}}
                                       onBlur={()=>{this.topReturn();}}
                                       />
                            </td>
                        </tr>
                        <tr className="w-perMsg bordered">
                            <th className="item">性别</th>
                            <td className="default">
                                <div className="gender">
                                    <input type="radio"
                                           id="man"
                                           name="gender"
                                           checked={ this.props.userMsg.gender == 1 ? true : false}
                                    />
                                    <label htmlFor="man"
                                           className="red-t choose"
                                           onClick={()=>{
                                               this.state.msg.gender = 1;
                                               this.setState({msg : this.state.msg});
                                           }}></label>
                                    <label htmlFor="man"
                                           className="default-p"
                                           onClick={()=>{
                                               this.state.msg.gender = 1;
                                               this.setState({msg : this.state.msg});
                                           }}>男</label>
                                </div>
                                <div className="gender">
                                    <input type="radio"
                                           id="woman"
                                           name="gender"
                                           checked={ this.props.userMsg.gender == 2 ? true : false}
                                           />

                                    <label htmlFor="woman"
                                           className="red-t choose"
                                           onClick={()=>{
                                               this.state.msg.gender = 2
                                               this.setState({msg : this.state.msg})
                                           }}></label>
                                    <label htmlFor="woman"
                                           className="default-p"
                                           onClick={()=>{this.state.msg.gender = 2}}>女</label>
                                </div>
                            </td>
                        </tr>
                        <tr className="w-perMsg">
                            <th className="item">出生日期</th>
                            <td className="select-btn"
                                onClick={this.handleClick}>
                                {this.getValue('birthday')}
                            </td>
                        </tr>
                    </tbody>
                </table>

            <div className="save">
                    <input className="saveMsg"
                           value="保存"
                           type="submit"
                           onClick={()=>{this.submit()}}
                    />

            </div>

            <DatePicker
                value={this.state.time}
                isOpen={this.state.isOpen}
                onSelect={this.handleSelect}
                onCancel={this.handleCancel} />

            {this.state.tips && <Msgbox center={true} title={this.state.tips} onOkClick={()=>{
                this.setState({tips: ''})
            }}/>}


        </div>
    }
}

module.exports =  connectToStores(PersonalMsg);