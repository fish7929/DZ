import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import * as RouterConst from '../../static/const/routerConst'

import Page from '../../component/page'
import HomeBottom from '../../component/homeBottom'

import HomeContainer from './homeContainer'
//消息中心
import MessageCenter from '../../component/messageCenter/index';

import { ZERO, FIRST, SECOND, THREE } from '../../static/const/constants';

import './index.scss'

const MessageCenterData = [
    {
        class: 'message-center-alarm',
        numbers: 3,
        hint: '报警消息',
        url: '/message/1'
    }, {
        class: 'message-center-site',
        numbers: 0,
        hint: '站内消息',
        url: '/message/2'
    },{
        class: 'message-center-system',
        numbers: 99,
        hint: '系统消息',
        url: '/message/3'
    },];  //测试
class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            currentTab: 0   //当前标签
        }
    }

    componentDidMount() {
    }

    /**
     * 根据不同的标签获取中间内容
     */
    getContentSection() {
        let component
        switch (this.state.currentTab) {
            case ZERO:
                 component = <HomeContainer />
                 break
            case FIRST:
                component = <button onClick={() => hashHistory.push(RouterConst.ROUTER_LOGIN)}>登录</button>
                break
            case SECOND:
                component = <MessageCenter data={MessageCenterData}/>
                break
            case THREE:
                component = <button onClick={() => hashHistory.push(RouterConst.ROUTER_LOGIN)}>登录</button>
                break
        }
        return component
    }

    render() {
        return (
            <Page className="home-page">
                <div className="home-title-div">
                    <div className="home-title">光伏运维管理平台</div>
                </div>
                <div className="home-main">
                    {this.getContentSection()}
                </div>
                <HomeBottom tabIndex={1} onTabClick={(tab) => this.setState({ currentTab: parseInt(tab) })} />
            </Page>
        )
    }
}

export default Home
