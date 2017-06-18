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
            <div className="realTime-alarm-item">
                <div className="warning-bg"></div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div>江苏省神降师恒顺醋业分布式光伏电站</div>
                    <div>直流电压过低</div>
                    <div>2017-05-12 22:30:14</div>
                </div>
            </div>
        )
    }
}

RealTimeAlarmItem.PropTypes = {
    data: PropTypes.object.isRequire
}

export default RealTimeAlarmItem