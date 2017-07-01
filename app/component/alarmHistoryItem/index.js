import React, { PropTypes } from 'react'

import * as utils from '../../utils'

import './index.scss'

class AlarmHistory extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
    }

    render(){
        let { data } = this.props

        return(
            <div className="alarm-history-item">
                <div className="left-div">
                    <div className="no-wrap title-txt">{data.alarmMessage}</div>
                    <div className="date-txt">{utils.formatDate(data.eventTime, "yyyy-MM-dd HH:mm:ss")}</div>
                </div>
                <div className="right-div">{data.alarmValue}</div>
            </div>
        )
    }
}

AlarmHistory.PropTypes = {
    data: PropTypes.object.isRequired
}

export default AlarmHistory