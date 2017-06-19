import React, { PropTypes } from 'react'

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
                    <div className="date-txt">{data.createTime}</div>
                </div>
                <div className="right-div">89.43</div>
            </div>
        )
    }
}

AlarmHistory.PropTypes = {
    data: PropTypes.object.isRequired
}

export default AlarmHistory