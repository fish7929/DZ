/**
 * @component AlarmHomeItem.js
 * @description 报警消息组件
 * @time 2017-06-17 15:40
 * @author zhao
 **/
'use strict';
import React, { PropTypes } from 'react'

import * as utils from '../../utils'
import './index.scss'

class AlarmHomeItem extends React.Component {
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
        let alarmGrade = data.alarmgrade <= 3 ? data.alarmgrade : 3;
        return (
            <li className="alarm-home-item" onClick={this.props.onClick}>
                <div className="alarm-home-left">
                    <span className={"icon icon_" + alarmGrade}></span>
                </div>
                <div className="alarm-home-right">
                    <div className="txt-div">
                        <div className="no-wrap title-txt">{data.alarmMessageData.powerStationName}</div>
                        <div className="no-wrap content-txt">{data.alarmMessageData.alarmMessage}</div>
                        <div className="no-wrap date-txt">{utils.formatDate(data.alarmMessageData.eventTime, "yyyy-MM-dd HH:mm:ss")}</div>
                    </div>
                    
                    <div className="value-div">{data.alarmMessageData.alarmValue}</div>
                </div>
            </li>
        )
    }

}

AlarmHomeItem.PropTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default AlarmHomeItem