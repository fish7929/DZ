import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import * as RouterConst from '../../static/const/routerConst'

import Page from '../../component/page'

import HomeBottom from '../../component/homeBottom';
//消息中心
import MessageCenter from '../../component/messageCenter/index.jsx';

import { ZERO, FIRST, SECOND, THREE } from '../../static/const/constants';


import './index.scss'
const MessageCenterData = [
    {
        class: 'message-center-alarm',
        numbers: 3,
        hint: '报警消息',
        url: 'message/1'
    }, {
        class: 'message-center-site',
        numbers: 0,
        hint: '站内消息',
        url: 'message/2'
    },{
        class: 'message-center-system',
        numbers: 99,
        hint: '系统消息',
        url: 'message/3'
    },];  //测试
class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            currentTab: 2   //当前标签
        }
    }

    componentDidMount() {

    }
    /**
     * 根据不同的标签获取中间内容
     */
    getContentSection() {
        let obj = null;
        switch (this.state.currentTab) {
            case ZERO:
                obj = <button onClick={() => hashHistory.push(RouterConst.ROUTER_LOGIN)}>登录</button>;
                break;
            case FIRST:
                obj = <button onClick={() => hashHistory.push(RouterConst.ROUTER_LOGIN)}>登录</button>;
                break;
            case SECOND:
                obj = <MessageCenter data={MessageCenterData}/>;
                break;
            case THREE:
                obj = <button onClick={() => hashHistory.push(RouterConst.ROUTER_LOGIN)}>登录</button>;
                break;
        }
        return obj;
    }
    render() {
        let _content = this.getContentSection();
        return (
            <Page className="home-container">
                {_content}
                <HomeBottom tabIndex={1} onTabClick={(tab) => this.setState({ currentTab: parseInt(tab) })} />
            </Page>
        )
    }
}

export default Home
