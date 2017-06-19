import React, { PropTypes } from 'react'

import './index.scss'

class InverterItem extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div className="inverter-item">
                <div className="inverter-header">
                    <div><span className="inverter-icon"></span>SW001</div>
                    <div className="inverter-status"></div>
                </div>
                <div>
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

export default InverterItem