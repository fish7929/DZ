import React, { PropTypes } from 'react'


import * as utils from '../../utils'

import './index.scss'

class AmmeterItem extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        let { data } = this.props

        return(
            <div className="ammeter-item">
                <div className="ammeter-header">
                    <span className="ammeter-icon"></span>
                    <span className="ammeter-title">{data.model}</span>
                </div>
                <div className="ammeter-content">
                    <div className="info-item">
                        <span className="txt1">有功功率：</span>
                        <span className="txt2">{data.threePhaseActivePower.toFixed(2)}kW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">总电能：</span>
                        <span className="txt2">{data.reverseActiveP.toFixed(2)}kWh</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">更新时间：</span>
                        <span className="txt2 data-txt">{utils.formatDate(data.updateTime, "yyyy-MM-dd")}</span>
                    </div>
                </div>
            </div>
        )
    }
}

AmmeterItem.PropTypes = {
    data: PropTypes.object.isRequired,
}

export default AmmeterItem