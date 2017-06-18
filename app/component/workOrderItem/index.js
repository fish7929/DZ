/**
 * @component WorkOrderItem.js
 * @description 工单单项组件
 * @time 2017-06-18 21:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import { FIRST } from '../../static/const/constants';

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
     * @param {string} type 工单任务类型
     */
    onEditTaskHandler(e, type) {
        e.preventDefault();
        e.stopPropagation();
        console.log('提交', id);
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
        return (
            <li className="work-order-item">
                <div className="work-order-number">{"工单编号：" + data.orderNumber}</div>
                <div className="work-order-item-hint">
                    分配时间
                    <span className="no-wrap">{data.allocateTime}</span>
                </div>
                <div className="work-order-item-hint">
                    电站名称
                    <span className="no-wrap">{data.powerstationName}</span>
                </div>
                <div className="work-order-item-hint">任务列表</div>
                <div className="common-item common-pseudo common-active work-order-item-logo" data-hint={"未处理故障：" + data.faultNum} onClick={(e) => this.onEditTaskHandler(e, "未处理故障：")}>
                    {status == FIRST ? null :<div><span className="work-order-item-edit"></span><span className={faultState}></span></div>}
                </div>
                <div className="common-item common-pseudo common-active work-order-item-logo" data-hint="电站体检" onClick={(e) => this.onEditTaskHandler(e, "电站体检")}>
                    {status == FIRST ? null :<div><span className="work-order-item-edit"></span><span className={physicalState}></span></div>}
                </div>
                <div className="common-item common-pseudo common-active work-order-item-logo" data-hint="离场申请" onClick={(e) => this.onEditTaskHandler(e, '离场申请')}>
                    {status == FIRST ? null :<div><span className="work-order-item-edit"></span><span className={departureState}></span></div>}
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