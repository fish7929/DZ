/**
 * @component AlarmMessageItem.js
 * @description 报警消息组件
 * @time 2017-06-17 15:40
 * @author zhao
 **/
'use strict';
import React, { PropTypes } from 'react'

import { FIRST, SECOND, THREE } from '../../static/const/constants'

import './index.scss'

class AlarmMessageItem extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    
    /**
     * DOM加载完成
     */
    componentDidMount() {
    }
    /**
     * 渲染
     */
    render() {
        let { data } = this.props
        let massageStatus = "";
        if (data.massageStatus == FIRST) {
            massageStatus = '未提交';
        } if (data.massageStatus == SECOND) {
            massageStatus = '已提交';
        } if (data.massageStatus == THREE) {
            massageStatus = '以解除';
        }
        let readClass = data && data.isread == FIRST ? 'message-read' : '';
        let level = data.alarmgrade || 1;
        return (
            <li className={"alarm-message-item " + readClass}>
                <div className="alarm-message-left">
                    <span className={"alarm-message-logo" + level}></span>
                    <span className={"alarm-message-status" + data.massageStatus}>{massageStatus}</span>
                </div>
                <div className="alarm-message-right">
                    <div className="no-wrap">{data.title}</div>
                    <div className="no-wrap">{data.content}</div>
                    <div><span>{data.createTime}</span><span>230.22</span></div>
                </div>
            </li>
        )
    }

}

AlarmMessageItem.PropTypes = {
    data: PropTypes.object.isRequired
}

export default AlarmMessageItem