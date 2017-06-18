import React, { PropTypes } from 'react'

import './index.scss'

class RealTimeAlarmItem extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
    }

    render(){
        let { data } = this.props
        return(
            <div className="realTime-alarm-item" onClick={this.props.onClick}>
                <div className={"warning-bg warning_" + data.alarmGrade}></div>
                <div className="status-div">
                    <div className={"icon alarm_level_"+data.alarmGrade}></div>
                    <div className={"status-icon " + (data.status == 1 ? "submited" : "notsubmited")}></div>
                </div>
                <div className="txt-div">
                    <div className="name-txt no-wrap">{data.plantName}</div>
                    <div className="desc-txt no-wrap">{data.alarmMessage}</div>
                    <div className="date-txt no-wrap">{data.alarmTime}</div>
                </div>
            </div>
        )
    }
}

RealTimeAlarmItem.PropTypes = {
    data: PropTypes.object.isRequire,
    onClick: PropTypes.func
}

export default RealTimeAlarmItem