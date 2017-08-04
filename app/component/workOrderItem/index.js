/**
 * @component WorkOrderItem.js
 * @description 工单单项组件
 * @time 2017-06-18 21:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import { ZERO, FIRST, SECOND, THREE } from '../../static/const/constants';  //
import { hashHistory } from 'react-router';
import './index.scss'
class WorkOrderItem extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    /**
     * DOM加载完成
     */
    componentDidMount() {
    }
    /**
     * 提交事件处理
     * @param {object} e 事件对象 
     * @param {number} id 工单ID
     * @param {string} number 工单号
     */
    onSubmitHandler(e, id, number) {
        e.preventDefault();
        e.stopPropagation();
        console.log('提交', id);
        this.props.onSubmit && this.props.onSubmit(id, number);
    }
    /**
     * 提交事件处理
     * @param {object} e 事件对象 
     * @param {number} type 工单任务类型, 1,2,3
     */
    onEditTaskHandler(e, type) {
        e.preventDefault();
        e.stopPropagation();
        let { data } = this.props;
        let order = data.orderNumber;
        switch (type) {
            case FIRST:  //事故列表
                let param = {
                    allocateTime: data.allocateTime,
                    powerstationName: data.powerstationName
                };
                param = JSON.stringify(param);
                hashHistory.push('/faultList/' + order + "/" + data.state + "/" + Base.myEncodeURIComponent(param));
                break;
            case SECOND:  //电站体检
                let physicalParam = {
                    stationName: data.powerstationName,
                    powerstationId: data.powerstationId,
                    orderId: data.orderId
                };
                hashHistory.push('/physical/' + order + "/" + data.state + "/" + Base.myEncodeURIComponent(physicalParam));
                break;
            case THREE: //离场申请
                console.log(33333);
                hashHistory.push('/departure/' + order + "/" + data.state);
                break;
        }
    }
    /**
     * 渲染
     */
    render() {
        let { data } = this.props;
        let _physicalState = data.physicalState;
        let physicalState = _physicalState == FIRST ? 'treated-icon' : 'untreated-icon';   //电站体检状态 1-已处理 0-未处理 3不用处理
        let _faultState = data.faultState;
        let faultState = _faultState == FIRST ? 'treated-icon' : 'untreated-icon';   //任务1处理状态 1-已处理 0-未处理 3不用处理
        let _departureState = data.departureState;
        let departureState = _departureState == FIRST ? 'treated-icon' : 'untreated-icon';   //离场申请状态 1-已处理 0-未处理 3不用处理
        let status = data.state;
        let _hint = status == FIRST ? "已处理故障：" : "未处理故障：";
        return (
            <li className="work-order-item">
                <div className="work-order-number">{"工单编号：" + data.orderNumber}</div>
                <div className="common-order-item-hint">
                    分配时间
                    <span className="no-wrap">{Base.formatTime(data.allocateTime, "yyyy-MM-dd HH:mm:ss")}</span>
                </div>
                <div className="common-order-item-hint">
                    电站名称
                    <span className="no-wrap">{data.powerstationName}</span>
                </div>
                <div className="common-order-item-hint">任务列表</div>
                {_faultState != 3 ? <div className="common-item common-pseudo common-active work-order-item-logo" data-hint={_hint + data.faultNum} onClick={(e) => this.onEditTaskHandler(e, FIRST)}>
                    {status == FIRST ? null : <div><span className="work-order-item-edit"></span><span className={faultState}></span></div>}
                </div> : null}
                {physicalState != 3 ? <div className="common-item common-pseudo common-active work-order-item-logo" data-hint="电站体检" onClick={(e) => this.onEditTaskHandler(e, SECOND)}>
                    {status == FIRST ? null : <div><span className="work-order-item-edit"></span><span className={physicalState}></span></div>}
                </div> : null}
                {_departureState != 3 ? <div className="common-item common-pseudo common-active work-order-item-logo" data-hint="离场申请" onClick={(e) => this.onEditTaskHandler(e, THREE)}>
                    {status == FIRST ? null : <div><span className="work-order-item-edit"></span><span className={departureState}></span></div>}
                </div> : null}
                {(status == ZERO && _faultState == FIRST && _physicalState == FIRST && _departureState == FIRST) ? <div className="work-order-item-submit">
                    <div className="common-active" onClick={(e) => this.onSubmitHandler(e, data.orderId, data.orderNumber)}>提交</div>
                    <span>点击提交才算完成任务</span>
                </div> : null}
            </li>
        )
    }

}

WorkOrderItem.PropTypes = {
    data: PropTypes.object.isRequired,
    onSubmit: PropTypes.func
}

export default WorkOrderItem