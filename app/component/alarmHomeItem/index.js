/**
 * @component AlarmHomeItem.js
 * @description 报警消息组件
 * @time 2017-06-17 15:40
 * @author zhao
 **/
'use strict';
import React, { PropTypes } from 'react'

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

        return (
            <li className="alarm-home-item" onClick={this.props.onClick}>
                <div className="alarm-home-left">
                    <span className={"icon icon_" + data.alarmGrade}></span>
                </div>
                <div className="alarm-home-right">
                    <div className="txt-div">
                        <div className="no-wrap title-txt">{data.powerStationBaseInfo.name}</div>
                        <div className="no-wrap content-txt">{data.alarmMessage}</div>
                        <div className="no-wrap date-txt">{data.alarmTime}</div>
                    </div>
                    
                    <div className="value-div">{data.alarmValue}</div>
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