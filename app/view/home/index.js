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
import * as utils from '../../utils'
import * as Api from '../../static/const/apiConst';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.tab = this.props.params && this.props.params.tab;
        //工单的类型，0，为完成， 1、已完成
        let type = this.props.params && this.props.params.type;
        let tab = this.tab != undefined ? parseInt(this.tab) : this.props.tabIndex;

        // this.type = type == undefined ? 0 :  parseInt(type);
        this.type = this.getOrderStatus();
        //只是为了显示不同的标题
        this.state = {
            title: '光伏运维管理平台',  //Header组件标题
            rightClass: '',
            rightContent: '',
            count: 0,   //显示底部未完成工单数量
            isShowRight: false,
            currentTab: tab
        };
    }
    getOrderStatus(){
        let orderType = Base.getLocalStorageItem("CURRENT_ORDER_STATUS");
        return orderType ? parseInt(orderType) : 0;
    }
    /**
     * 加载完成
     */
    componentDidMount() {
        if(window.cordova){
            let user = Base.getLocalStorageObject("user")
            if(user && user.hasOwnProperty('token')){
                // alert("window.cordova.plugins.spacekplugin.userToken: " + user.token )
                window.cordova.plugins.spacekplugin.userToken(user.token, ()=>{}, ()=>{});
            }
        }
        
        //测试
        // AppModal.loading();
        //加载默认数据
        let tab = this.tab != undefined ? parseInt(this.tab) : this.props.tabIndex;
        this.props.fetchData(tab, this.type);
        //获取未完成工单的数量
        let url = Api.GetWorkOrdrDataByStatus(0);
        utils.fetchUtils(url, {page: 1, pagesize: 10}).then((res) => {
            // console.log(res, 88999999);
            //设置未完成工单的数量
            if (res && res.hasOwnProperty('counts')) {
                this.setState({ count: res.counts });
            }
        }).catch((e) => console.log(e, 77777));
    }
    /**
     * 更新属性
     */
    componentWillReceiveProps(nextProps) {
        // this.setState({currentTab: nextProps.tabIndex});
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
    reloadWorkOrderListHandler(status, currentPage) {
        //重新加载工单数据,
        console.log(status, currentPage, 78996655);
        this.props.fetchData(this.props.tabIndex, status, currentPage);
    }
    /**
     * 根据不同的标签获取中间内容
     */
    getContentSection() {
        let component;
        let{workOrder} = this.props;  //this.props.tabIndex
            console.log(workOrder, 8899666);
        switch (this.props.tabIndex) {
            case ZERO:
                component = <HomeContainer />
                break
            case FIRST:
                component = <WorkOrder data={workOrder.list} total={workOrder.total} type={this.type} 
                    onChange={(status, page) => this.reloadWorkOrderListHandler(status, page)} />;
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
                Base.setLocalStorageItem("CURRENT_ORDER_STATUS", 0);
                break
            case FIRST:
                _title = '工单列表';
                // _isShowRight = true;
                // _rightContent = '2017.3-2017.6';
                // _rightClass = 'work-order-center-time';
                break
            case SECOND:
                _title = '消息中心';
                Base.setLocalStorageItem("CURRENT_ORDER_STATUS", 0);
                break
            case THREE:
                _title = '我的';
                Base.setLocalStorageItem("CURRENT_ORDER_STATUS", 0);
                break
        }
        this.setState({
            title: _title,  //Header组件标题
            rightClass: _rightClass,
            rightContent: _rightContent,
            isShowRight: _isShowRight
            // currentTab: tab
        });
        this.type = this.getOrderStatus();
        this.props.changeHomeTabIndex(tab)
        this.props.fetchData(tab, this.type);
    }
    render() {
        let { title, isShowRight, rightClass, rightContent, count, currentTab } = this.state;
        let _current = this.tab != undefined ? parseInt(this.tab) : this.props.tabIndex;
        return (
            <Page className="home-page">
                <Header title={title} isShowRight={isShowRight}
                    rightClass={rightClass} rightContent={rightContent}
                    rightFn={() => this.clickHeaderRightHandler()} />
                <div className="home-main">
                    {this.getContentSection()}
                </div>
                <HomeBottom tabIndex={this.props.tabIndex} count={count} onTabClick={(tab) => this.changeTabHandler(tab)} />
            </Page>
        )
    }
}

let mapStateToProps = state => {
    //处理消息中心数据
    let _messageCenterData = state.homeData.messageCenterList;
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
        workOrder: state.homeData.workOrder,
        messageCenterList: _messageCenterList,
        personalCenterList: state.homeData.personalCenterList,
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData, changeHomeTabIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
