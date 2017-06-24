/**
 * @component index.js
 * @description 离场申请
 * @time 2017-06-22 21:50
 * @author fishYu
 **/

'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Page from '../../component/page';
import Header from '../../component/header';
import NoMessage from '../../component/noMessage';

import UploadComponent from '../../component/uploadComponent';

import { fetchData } from './reducer/action';

import './index.scss'

import { FIRST, SECOND, THREE } from '../../static/const/constants';

class Departure extends React.Component {

    constructor(props, context) {
        super(props, context)
        let order = this.props.params && this.props.params.order;  //工单号
        this.order = parseInt(order);
        let status = this.props.params && this.props.params.status;  //状态
        this.status = parseInt(status);
    }
    /**
     * 根据路由不同获取不同对象
     */
    getContent() {
        let { list } = this.props;
        let component = null;
        component = list.map((item, index) => {
            return (<li key={index} className="margin-top-20">
                <div className="common-divide">
                    联系单内容
                </div>
                <div className="common-order-item-hint">
                    是否需要联系第三方
                    <span className="no-wrap">是</span>
                </div>
                <div className="common-order-item-hint">
                    第三方身份
                    <span className="no-wrap">{item.thirdIdentity}</span>
                </div>
                <div className="common-order-item-hint">
                    接口人单位
                    <span className="no-wrap">{item.thirdCompany}</span>
                </div>
                <div className="common-order-item-hint">
                    接口人姓名
                    <span className="no-wrap">{item.thirdUsername}</span>
                </div>
                <div className="common-order-item-hint">
                    接口人职位
                    <span className="no-wrap">{item.thirdPosition}</span>
                </div>
                <div className="common-order-item-hint">
                    接口人联系方式
                    <span className="no-wrap">{item.thirdContact}</span>
                </div>
                <div className="common-order-item-hint no-border">
                    工作内容概要
                </div>
                <div className="third-work-content">{item.workcontent}</div>
                <UploadComponent type={this.status}/>
            </li>)
        });
        return (
            <ul>
                {component}
            </ul>
        );
    }
    /**
     * 渲染
     */
    render() {
        let { isFetching, list } = this.props;
        let _content = this.getContent();
        return (
            <Page className="third-contact-container">
                <Header title="离场申请" isShowBack={true} />
                {list.length < 1 ?
                    <NoMessage msg="暂无信息" /> : _content}
            </Page>
        )
    }

    /**
     * 加载完成
     */
    componentDidMount() {
        this.props.fetchData(this.order);
    }

}

let mapStateToProps = state => {
    return ({
        isFetching: state.departureData.isFetching,
        list: state.departureData.list
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Departure)