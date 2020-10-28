import React, { Component } from 'react'
import {
    Card,
    Table,
    Button
} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from './../../components/link-button/link-button'
import { reqCategorys } from '../../api/index'

export default class Category extends Component {
    state = {
        categorys: []
    }
    getCategorys = async () => {
        const result = await reqCategorys('0')
        if (result.status==='0') {
            const categorys = result.data
            this.setState({
                categorys
            })
        }
    }
    initColumns = () => {
        this.columns = [
            {
              title: '一级分类的名称',
              dataIndex: 'name',
              key: '_id',
            },
            {
              title: '操作',
              width: '300px',
              render: () => (
                  <span>
                      <LinkButton>修改分类</LinkButton>
                      <LinkButton>查看子分类</LinkButton>
                  </span>
              )
            }
        ]
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getCategorys()
    }
    render () {
        const columns = this.columns
        const categorys = this.categorys
        const title = '一级分类列表'
        const extra = (
            <Button type="primary">
                <PlusOutlined />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table 
                    dataSource={categorys} 
                    columns={columns} 
                    bordered
                />;
            </Card>
        )
        
    }
}