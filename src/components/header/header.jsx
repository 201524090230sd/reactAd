import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import LinkButton from '../../components/link-button/link-button'
import localStorageUtils from '../../utils/localStorageUtils'
import { Modal, Button, Space } from 'antd';
import './../../assets/style/header.less'
const { confirm } = Modal;
class Header extends Component {
    logOut = () => {
        confirm({
            content: '你确定要退出登录吗？',
            onOk: () => {
              //console.log('OK', this);
              memoryUtils.user = {}
              localStorageUtils.removeUser()
              this.props.history.replace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    getTitle = (menuList) => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else {
                if (item.children) {
                    const cItem = item.children.find(cItem => cItem.key === path)
                    if (cItem) 
                    title = cItem.title
                }
            }
        })
        return title
    }
    render () {
        const title = this.getTitle(menuList)
        return (
            <div className="header">
                <div className="header-top">
                    <span>你好，admin</span>
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>shijian</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
        
    }
}
export default withRouter(Header)