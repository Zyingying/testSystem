"use strict"
const React = require("react");
import {Table, Input, Button, Popconfirm} from 'antd';
const EditableCell = require('../subItem/editableCell');
const IndexAction = require("../action/indexAction");
const IndexStore = require('../store/indexStore');
const connectToStores = require("alt-utils/lib/connectToStores");

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    IndexAction.fetchBanner('all');
    this.columns = [
      {
        title: '图片地址(URL)',
        dataIndex: 'url',
        width: '60%',
        render: (text, record, index) => this.renderColumns(this.state.data, index, 'url', text),
      },
      {
        title: '播放顺序',
        dataIndex: 'position',
        width: '20%',
        sorter: (a, b) => a.position - b.position,
        render: (text, record, index) => this.renderColumns(this.state.data, index, 'position', text),
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          const {editable} = this.state.data[index].url;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                  <a onClick={() => this.editDone(index, 'save')}>保存 </a>
                  <Popconfirm title="确定取消编辑吗?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a> 取消</a>
                  </Popconfirm>
                </span>
                  :
                  <span>
                  <a onClick={() => this.edit(index)}>修改 </a>
                </span>

              }
              <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(index)}>
                <a href="#">&nbsp;删除</a>
              </Popconfirm>

            </div>
          );
        },
      }];

    this.state = {
      data: [],
      count: 1
    };
    this.url = '';
  }
  componentWillMount(){
    IndexStore.listen(this.getListener());
  }

  getListener(){

    return this.listener = (store) => {
      console.log(store);
      let banner = store.banner, data = [];
      if (banner && banner.length > 0) {
        banner.map((ban, n) => {
          data.push({
            url: {editable: false, value: ban.url},
            position: {editable: false, value: ban.position},
            id: ban._id
          })
        })
      }
      this.setState({data:data,count:banner.length+1});
    }

  }

  componentWillUnmount(){
    IndexStore.unlisten(this.listener);
  }

  static getStores() {
    return [IndexStore];
  }

  static getPropsFromStores() {
    return {
      ...IndexStore.getState()
    }
  }

  renderColumns(data, index, key, text) {
    const {editable, status} = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }

  handleChange(key, index, value) {
    const {data} = this.state;
    if(!data[index].id){
      if(key === 'url'){
        this.url = value;
      }else{
        IndexAction.addBanner(this.url,value);
      }
      data[index][key].value = value;
      this.setState({data});
    }else{
      if(data[index][key].value != value){
        if(key === 'url'){
          IndexAction.editBanner(data[index].id,value,data[index].position.value)
        }else{
          IndexAction.editBanner(data[index].id,data[index].url.value,value)
        }
        data[index][key].value = value;
        this.setState({data});
      }
    }

  }

  edit(index) {
    const {data} = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({data});
  }

  editDone(index, type) {
    const {data} = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({data}, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }

  onDelete = (index) => {
    const data = [...this.state.data];
    IndexAction.delBanner(data[index].id);
    data.splice(index, 1);

    this.setState({data});
  }

  handleAdd = () => {
    let {count, data} = this.state;
    const newData = {
      // key: count,
      url: {
        editable: false,
        value: '',
      },
      position: {
        editable: false,
        value: count,
      }
    };
    this.state.data =  [...data, newData];
    data = this.state.data;
    let index = data.length - 1;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({
      data:data,
      count: index + 1,
    });
  }

  render() {
    const {data} = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'id' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return <div>
      <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
      <Table bordered dataSource={dataSource} columns={columns}/>

    </div>
  }
}
module.exports = connectToStores(EditableTable);