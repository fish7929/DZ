import React, { PropTypes } from 'react'

import './index.scss'

class InverterItem extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        let { data, onClick } = this.props

        return(
            <div className="inverter-item" onClick={onClick}>
                <div className="inverter-header">
                    <div className="inverter-header-left">
                        <span className="inverter-icon"></span>
                        <span className="inverter-title no-wrap">{data.serial_number}</span></div>
                    <div className="inverter-status status_0"></div>
                </div>
                <div className="inverter-content">
                    <div className="info-item">
                        <span className="txt1">直流功率：</span>
                        <span className="txt2">{data.totalInputPower ? data.totalInputPower.toFixed(3) : data.totalInputPower}KW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">交流功率：</span>
                        <span className="txt2">{data.threePhaseActivePower ? data.threePhaseActivePower.toFixed(3) : data.threePhaseActivePower}KW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">温度：</span>
                        <span className="txt2">{data.temperature ? data.temperature.toFixed(3) : data.temperature}℃</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">当月发电量：</span>
                        <span className="txt2">{data.generationMonth ? data.generationMonth.toFixed(3) : data.generationMonth}KWh</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">报警数量：</span>
                        <span className="txt2">{data.alarms}</span>
                    </div>
                </div>
            </div>
        )
    }
}

InverterItem.PropTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default InverterItem