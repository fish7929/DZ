/**
 * @component WorkOrderItem.js
 * @description 工单单项组件
 * @time 2017-06-18 21:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import { FIRST, SECOND, THREE } from '../../static/const/constants';
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
     */
    onSubmitHandler(e, id) {
        e.preventDefault();
        e.stopPropagation();
        console.log('提交', id);
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
        switch(type){
            case FIRST:
                let order = data.orderNumber;
                let param = {
                    allocateTime: data.allocateTime,
                    powerstationName: data.powerstationName
                };
                param = JSON.stringify(param);
                hashHistory.push('/faultList/' + order + "/" + Base.myEncodeURIComponent(param));
                break;
            case SECOND:
                console.log(22222);
                break;
            case THREE:
                console.log(33333);
                break;
        }
    }
    /**
     * 渲染
     */
    render() {
        let { data } = this.props;
        let physicalState = data.physicalState == FIRST ? 'treated-icon' : 'untreated-icon';   //电站体检状态 1-已处理 0-未处理
        let faultState = data.faultState == FIRST ? 'treated-icon' : 'untreated-icon';   //任务1处理状态 1-已处理 0-未处理
        let departureState = data.departureState == FIRST ? 'treated-icon' : 'untreated-icon';   //离场申请状态 1-已处理 0-未处理
        let status = data.state;
        let _hint = status == FIRST ? "已处理故障：" : "未处理故障：";
        return (
            <li className="work-order-item">
                <div className="work-order-number">{"工单编号：" + data.orderNumber}</div>
                <div className="common-order-item-hint">
                    分配时间
                    <span className="no-wrap">{data.allocateTime}</span>
                </div>
                <div className="common-order-item-hint">
                    电站名称
                    <span className="no-wrap">{data.powerstationName}</span>
                </div>
                <div className="common-order-item-hint">任务列表</div>
                <div className="common-item common-pseudo common-active work-order-item-logo" data-hint={_hint + data.faultNum} onClick={(e) => this.onEditTaskHandler(e, FIRST)}>
                    {status == FIRST ? null : <div><span className="work-order-item-edit"></span><span className={faultState}></span></div>}
                </div>
                <div className="common-item common-pseudo common-active work-order-item-logo" data-hint="电站体检" onClick={(e) => this.onEditTaskHandler(e, SECOND)}>
                    {status == FIRST ? null : <div><span className="work-order-item-edit"></span><span className={physicalState}></span></div>}
                </div>
                <div className="common-item common-pseudo common-active work-order-item-logo" data-hint="离场申请" onClick={(e) => this.onEditTaskHandler(e, THREE)}>
                    {status == FIRST ? null : <div><span className="work-order-item-edit"></span><span className={departureState}></span></div>}
                </div>
                {status == FIRST ? null : <div className="work-order-item-submit">
                    <div className="common-active" onClick={(e) => this.onSubmitHandler(e, data.orderId)}>提交</div>
                    <span>点击提交才算完成任务</span>
                </div>}
            </li>
        )
    }

}

WorkOrderItem.PropTypes = {
    data: PropTypes.object.isRequired
}

export default WorkOrderItem