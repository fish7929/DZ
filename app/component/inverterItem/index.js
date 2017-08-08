import React, { PropTypes } from 'react'

import './index.scss'

class InverterItem extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        let { data, onClick } = this.props
        //equipmentStatus 1：正常运行 2：故障运行 3：正常停机 4：故障停机 5：通讯中断 6：其他
        //@3、4、5其他都显示正常
        let statusClass;
        switch (data.equipmentStatus) {
            case 3:
            case 4:
                statusClass = "status_1";
                break;
            case 5:
                statusClass = "status_2";
                break;
            default:
                statusClass = ""
                break;
        }
        return(
            <div className="inverter-item" onClick={onClick}>
                <div className="inverter-header">
                    <div className="inverter-header-left">
                        <span className="inverter-icon"></span>
                        <span className="inverter-title no-wrap">{data.serialNumber}</span></div>
                    <div className={"inverter-status "+statusClass}></div>
                </div>
                <div className="inverter-content">
                    <div className="info-item">
                        <span className="txt1">直流功率：</span>
                        <span className="txt2">{data.totalInputPower ? data.totalInputPower.toFixed(2) : data.totalInputPower}KW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">交流功率：</span>
                        <span className="txt2">{data.threePhaseActivePower ? data.threePhaseActivePower.toFixed(2) : data.threePhaseActivePower}KW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">温度：</span>
                        <span className="txt2">{data.temperature ? data.temperature.toFixed(2) : data.temperature}℃</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">当月发电量：</span>
                        <span className="txt2">{data.generationMonth ? data.generationMonth.toFixed(2) : data.generationMonth}KWh</span>
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