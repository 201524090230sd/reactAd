import React, { Component } from 'react'
import './../../assets/style/left-nav.less'
import logo from './../../assets/images/logo/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu;
class LeftNav extends Component {
    // getMenuNodes = menuList => {
    //     return menuList.map(item => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key} icon={<PieChartOutlined />}>
    //                     <Link to={item.key}>{item.title}</Link>                       
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
    //                     {this.getMenuNodes(item.children)}
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }
    getMenuNodes = menuList => {
        return menuList.reduce((pre, item) =>{
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.key}>{item.title}</Link>                       
                    </Menu.Item>
                ))
            } else {
                const path = this.props.location.pathname
                const cItem = item.children.find(item => item.key === path)
                if (cItem) {
                    this.openKey = item.key
                }
                pre.push((
                    <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render () {
        const path = this.props.location.pathname
        const openKey = this.openKey
        console.log("render()",path)
        return (
            <div className="left-nav">
                <Link className="left-nav-header" to="/"> 
                    <img src={logo} />
                    <h2>硅谷后台</h2>
                </Link>  
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                       this.menuNodes  
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)