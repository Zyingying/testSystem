"use strict";
const React = require("react");
const Nav = require("../module/nav");
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const connectToStores = require("alt-utils/lib/connectToStores");
const PerMsgAction = require("../action/perMsgAction");
const PerMsgStore = require("../store/perMsgStore");

class personMsg extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }
    static getStores(){
        return [PerMsgStore];
    }

    static getPropsFromStores(){
        return {
            ...PerMsgStore.getState()
        }
    }

    handleSubmit(){

    }



    render(){

        return <div className="f-page personMsg" ref="personalMsg">
            <div className="w-categories">
                <Nav/>
            </div>

            <Form onSubmit={this.handleSubmit} className="personMsg-Form">
                <FormItem
                  label="E-mail"
                  hasFeedback
                >
                      <Input />
                    )}
                </FormItem>
            </Form>


        </div>
    }
}

module.exports =  connectToStores(personMsg);