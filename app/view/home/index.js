import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as RouterConst from '../../static/const/routerConst'

import Page from '../../component/page'
import Header from '../../component/header'
import HomeBottom from '../../component/homeBottom'

import HomeContainer from './homeContainer'
//消息中心
import MessageCenter from '../../component/messageCenter/index';

import WorkOrder from './workOrder';  //工单
//我的
import MyContainer from './myContainer'

import { ZERO, FIRST, SECOND, THREE } from '../../static/const/constants';

import { fetchData, changeHomeTabIndex } from './reducer/action';

import './index.scss';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        //只是为了显示不同的标题
        this.state = {
            title: '光伏运维管理平台',  //Header组件标题
            rightClass: '',
            rightContent: '',
            isShowRight: false
        };
    }
    /**
     * 加载完成
     */
    componentDidMount() {
        //测试
        // AppModal.loading();
        //加载默认数据
        this.props.fetchData(this.props.tabIndex);
    }
    /**
     * 更新属性
     */
    componentWillReceiveProps(nextProps) {
    }
    /**
     * 头部组件右边按钮点击事件
     */
    clickHeaderRightHandler() {
        console.log('right click');
    }
    /**
     * 根据状态重新加载工单数据,
     * @param {number} status 工单状态0， 1完成
     */
    reloadWorkOrderListHandler(status) {
        //重新加载工单数据,
        this.props.fetchData(this.props.tabIndex, status);
    }
    /**
     * 根据不同的标签获取中间内容
     */
    getContentSection() {
        let component;
        switch (this.props.tabIndex) {
            case ZERO:
                component = <HomeContainer />
                break
            case FIRST:
                component = <WorkOrder data={this.props.workOrderList}
                    onChange={(status) => this.reloadWorkOrderListHandler(status)} />;
                break
            case SECOND:
                component = <MessageCenter data={this.props.messageCenterList} />
                break
            case THREE:
                component = <MyContainer />
                break
        }
        return component
    }
    /**
     * 切换标签事件
     * @param {number} tab 标签栏的值
     */
    changeTabHandler(tab) {
        let _title = '光伏运维管理平台';
        let _isShowRight = false;
        let _rightContent = '';
        let _rightClass = '';
        switch (tab) {
            case ZERO:
                _title = '光伏运维管理平台';
                break
            case FIRST:
                _title = '工单列表';
                _isShowRight = true;
                _rightContent = '2017.3-2017.6';
                _rightClass = 'work-order-center-time';
                break
            case SECOND:
                _title = '消息中心';
                break
            case THREE:
                _title = '我的';
                break
        }
        this.setState({
            title: _title,  //Header组件标题
            rightClass: _rightClass,
            rightContent: _rightContent,
            isShowRight: _isShowRight
        });
        this.props.changeHomeTabIndex(tab)
        this.props.fetchData(tab);
    }
    render() {
        let { title, isShowRight, rightClass, rightContent } = this.state;
        return (
            <Page className="home-page">
                <Header title={title} isShowRight={isShowRight}
                    rightClass={rightClass} rightContent={rightContent}
                    rightFn={() => this.clickHeaderRightHandler()} />
                <div className="home-main">
                    {this.getContentSection()}
                </div>
                <HomeBottom tabIndex={this.props.tabIndex} onTabClick={(tab) => this.changeTabHandler(tab)} />
            </Page>
        )
    }
}

let mapStateToProps = state => {
    //处理消息中心数据
    let _messageCenterData = (state.homeData.messageCenterList)[0];
    let _messageCenterList = [];
    for (let key in _messageCenterData) {
        let obj = {};
        if (key.indexOf("alarm") > -1) {
            obj.class = 'message-center-alarm';
            obj.numbers = _messageCenterData[key];
            obj.hint = '报警消息';
            obj.url = '/message/1';
        } else if (key.indexOf("letter") > -1) {
            obj.class = 'message-center-site';
            obj.numbers = _messageCenterData[key];
            obj.hint = '站内消息';
            obj.url = '/message/2';
        } else {
            obj.class = 'message-center-system';
            obj.numbers = _messageCenterData[key];
            obj.hint = '系统消息';
            obj.url = '/message/3';
        }
        _messageCenterList.push(obj);
    }
    return ({
        tabIndex: state.homeData.tabIndex,
        isFetching: state.homeData.isFetching,
        homeContainerList: state.homeData.homeContainerList,
        workOrderList: state.homeData.workOrderList,
        messageCenterList: _messageCenterList,
        personalCenterList: state.homeData.personalCenterList,
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData, changeHomeTabIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
