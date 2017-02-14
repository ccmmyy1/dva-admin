import React, { PropTypes, Component } from 'react'
import { Table, Icon, Checkbox } from 'antd'
import { menu, equalSet } from '../../utils'

const CheckboxGroup = Checkbox.Group

const getPowerText = (item) => {
  const powerName = ["菜单查看", "内容查看", "新增", "修改", "删除"]
  const optionsPowerName = item.power.map((cur) => {
    return { label: powerName[cur], value: cur }
  })

  return optionsPowerName
}

class Demo extends Component {

  state = {
    userPower: {
      1: [0],
      2: [0],
      3: [0, 1, 2, 3, 4],
      4: [0, 1, 2, 3, 4],
      5: [0, 1, 2, 3, 4],
      6: [0],
      7: [0, 2]
    }
  }

  onChangePower(checkedValues, item){
    this.state.userPower[item.id] = checkedValues
    this.setState({ userPower: this.state.userPower })
  }

  render() {
    const columns = [{
      title: '菜单项',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => record.icon ?
             <span>
               <Icon type={record.icon} /> {text}
             </span> :
             text
    }, {
      title: '操作',
      width: '70%',
      render: (text, record) => (
        <CheckboxGroup ref={record.key} options={getPowerText(record)} value={this.state.userPower[record.id]} onChange={(checkedValues) => this.onChangePower(checkedValues, record)}/>
      )
    }]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {

      },
      onSelect: (record, selected, selectedRows) => {
        if(selected) {
          this.state.userPower[record.id] = record.power
        } else {
          this.state.userPower[record.id] = []
        }
        this.setState({ userPower: this.state.userPower })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        if(selected) {
          let allPower = {}
          selectedRows.reduce(function(power, item) {
            return allPower[item.id] = item.power
          }, {})
          this.setState({ userPower: allPower })
        } else {
          this.setState({ userPower: {} })
        }
      },
      getCheckboxProps: record => ({
        disabled: false,
        defaultChecked: equalSet(record.power, this.state.userPower[record.id])
      })
    }

    return (
      <Table
        columns={columns}
        dataSource={menu}
        bordered
        scroll={{ x: 1000 }}
        simple
        defaultExpandAllRows
        rowSelection={rowSelection}
        rowKey={record => record.key}
        />
    )
  }
}

export default Demo
