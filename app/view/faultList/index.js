/**
 * @component FaultList.js
 * @description 故障列表
 * @time 2017-06-19 22:04
 * @author fishYu
 **/

'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Page from '../../component/page';
import Header from '../../component/header';
import { hashHistory } from 'react-router';
import { fetchData } from './reducer/action';

import './index.scss'

import { FIRST, SECOND } from '../../static/const/constants';

class FaultList extends React.Component {

    constructor(props, context) {
        super(props, context)
        let order = this.props.params && this.props.params.order;  //工单号
        this.order = parseInt(order);
        let param = this.props.params && this.props.params.param;  //json对象
        param = Base.myDecodeURIComponent(param);
        this.param = {};
        try {
            this.param = JSON.parse(param);
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * 跳转到下级页面
     * @param {object} e 事件对象
     * @param {number} type 类型，1 分配计划， 2、第三方联系单
     */
    goToNextHandler(e, type) {
        e.preventDefault();
        e.stopPropagation();
        if (type == FIRST) {
            hashHistory.push("/sparepart/" + this.order);
        } else {
            hashHistory.push("/thirdContact/" + this.order);
        }
        console.log('goToNextHandler');
    }
    /**
     * 显示事故详情
     * @param {object} e 事件对象
     * @param {number} faultId 事故ID
     * @param {number} type 类型，0 未解决， 1、已解决
     * @param {string} faultMsg 故障消息
     */
    showFaultDetailHandler(e, faultId, type, faultMsg) {
        e.preventDefault();
        e.stopPropagation();
        console.log('showFaultDetailHandler');
        let param = {
            faultMsg: faultMsg
        };
        hashHistory.push("/faultDetail/" + faultId + '/' + type + '/' + Base.myEncodeURIComponent(param));
    }
    /**
     * 渲染
     */
    render() {
        let { isFetching, faultList } = this.props;
        return (
            <Page className="fault-list-container">
                <Header title='故障列表' isShowBack={true} />
                <div className="fault-list-title">
                    电站名称
                    <span className="no-wrap">{this.param.powerstationName}</span>
                </div>
                <div className="common-order-item-hint margin-bottom-20">
                    分配时间
                    <span className="no-wrap">{Base.formatTime(this.param.allocateTime, "yyyy-MM-dd HH:mm:ss")}</span>
                </div>
                <div className="common-item common-pseudo common-active common-next fault-pseudo "
                    data-hint='备品备件分配计划' onClick={(e) => this.goToNextHandler(e, FIRST)}></div>
                <div className="common-item common-pseudo common-active common-next fault-pseudo  "
                    data-hint='第三方联系单' onClick={(e) => this.goToNextHandler(e, SECOND)}></div>
                <div className="common-order-item-hint">任务列表</div>
                {faultList.map((item, index) => {
                    let statusClass = item.isSolve == FIRST ? "fault-dispose" : "fault-undispose";
                    let statusHint = item.isSolve == FIRST ? "已处理" : "未处理";
                    return (<div key={index} className="common-item common-pseudo common-active fault-item-logo"
                        data-hint={item.fault_message} onClick={(e) => this.showFaultDetailHandler(e, item.faultId, item.isSolve, item.fault_message)}>
                        <span className={statusClass}>{statusHint}</span>
                    </div>)
                })}
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
        isFetching: state.faultData.isFetching,
        faultList: state.faultData.faultList
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FaultList)