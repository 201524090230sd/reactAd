import React, { Component } from 'react'
import logo from './../../assets/images/logo/logo.png'
import './../../assets/style/login.less'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import localStorageUtils from '../../utils/localStorageUtils'
import { Redirect } from 'react-router-dom'
export default class Login extends Component {
    onFinish = async (values) => {
        console.log('Received values of form: ', values)
        const {username, password} = values
        const res = await reqLogin(username, password)
        console.log("请求成功-------------",res)
        if (res.status===0) {
            message.success("登录成功")
            const result = res.data
            memoryUtils.user = result
            localStorageUtils.saveUser(result)
            this.props.history.replace('/')
        } else {
            message.error(res.msg)
        }        
    }
    render () {
        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to="/"/>
        }
        return (
            <div className="login">
                <header className="header">
                    <img src={logo}></img>
                    <h1>react后台管理系统</h1>
                </header>
                <section className="content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名！' },
                            { min: 4, message: '必须大于等于 4 位！'},
                            { max: 12, message: '必须小于等于 12 位！'},
                            { pattern: /[a-zA-Z0-9]+/, message: '必须是英文、数字或下划线组成！'}                        
                        ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码！' },
                            { min: 4, message: '必须大于等于 4 位！'},
                            { max: 12, message: '必须小于等于 12 位！'},
                            { pattern: /[a-zA-Z0-9]+/, message: '必须是英文、数字或下划线组成！'}                        
                        ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}