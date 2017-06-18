import React, { PropTypes } from 'react'

import "./index.scss"

class PowerStationMonitorListItem extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div className="psm-list-item">
                <div className="name-div">
                    <span className="icon"></span>
                    <span className="txt context-txt no-wrap" >江苏镇江市恒顺2.12MW分布式光伏电站</span>
                </div>
                <div className="people-div">
                    <span className="title-txt">负责人:</span>
                    <span className="context-txt no-wrap">张三</span>
                </div>
                <div className="place-div">
                    <span className="title-txt" dangerouslySetInnerHTML={{__html:"地&nbsp;址:"}}></span>
                    <span className="context-txt no-wrap">江苏省镇江市汉东区大风路808号</span>
                </div>
            </div>
        )
    }

}

PowerStationMonitorListItem.PropTypes = {
    data: PropTypes.object.isRequired
}

export default PowerStationMonitorListItem