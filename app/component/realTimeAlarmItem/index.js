import React, { PropTypes } from 'react'

import * as utils from '../../utils'

import './index.scss'

class RealTimeAlarmItem extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
    }

    render(){
        let { data, type } = this.props
        let alarmGrade = data.alarmGrade < 3 ? data.alarmGrade : 3
        //status 零:未提交 非零：已提交
        return(
            <div className="realTime-alarm-item" onClick={this.props.onClick}>
                <div className={"warning-bg warning_" + alarmGrade + " " + type}></div>
                <div className="status-div">
                    <div className={"icon alarm_level_"+alarmGrade}></div>
                    <div className={"status-icon " + (data.status == 0 ? "notsubmited" : "submited")}></div>
                </div>
                <div className="txt-div">
                    <div className="name-txt no-wrap">{data.name}</div>
                    <div className="desc-txt no-wrap">{data.alarmMessage}</div>
                    <div className="date-txt no-wrap">{utils.formatDate(data.eventTime, "yyyy-MM-dd HH:mm:ss")}</div>
                </div>
            </div>
        )
    }
}

RealTimeAlarmItem.PropTypes = {
    type: PropTypes.string,
    data: PropTypes.object.isRequire,
    onClick: PropTypes.func
}

export default RealTimeAlarmItem