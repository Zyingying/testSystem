"use strict"
const React = require("react");
import {Menu} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class MenuList extends React.Component {
  render() {
    let {subject,menuClick} = this.props;

    return  <Menu onClick={menuClick}
                  style={{width:240}}
                  mode="vertical">
          {subject.length > 0 && subject.map((sub,n)=>{

            let subjectsItem = sub.subjects;

            return <SubMenu key={n}
                            title={sub.typename}>
                  {subjectsItem && subjectsItem.map((item,n)=>{
                    return <Menu.Item key={item._id}
                                      data-id={item._id}>
                          {item.subjectName}
                          </Menu.Item>;
                  })}
              </SubMenu>
          })}

    </Menu>;
  }
}
module.exports = MenuList;