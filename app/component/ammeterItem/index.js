import React, { PropTypes } from 'react'

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
                    <span className="ammeter-title">SW001</span>
                </div>
                <div className="ammeter-content">
                    <div className="info-item">
                        <span className="txt1">有功功率：</span>
                        <span className="txt2">28KW</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">总电能：</span>
                        <span className="txt2">231880kWh</span>
                    </div>
                    <div className="info-item">
                        <span className="txt1">更新时间：</span>
                        <span className="txt2">2017-5-9</span>
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