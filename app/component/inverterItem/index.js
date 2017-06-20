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
                        <span className="inverter-title">SW001</span></div>
                    <div className="inverter-status status_0"></div>
                </div>
                <div className="inverter-content">
                    <div className="info-item">
                        <span className="txt1">直流功率：</span>
                        <span className="txt2">2KW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">交流功率：</span>
                        <span className="txt2">2KW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">温度：</span>
                        <span className="txt2">33℃</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">当月发电量：</span>
                        <span className="txt2">222KWh</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">报警数量：</span>
                        <span className="txt2">3</span>
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