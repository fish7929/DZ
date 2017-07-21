import React, { PropTypes } from 'react'

import './index.scss'

class HomePowerItem extends React.Component{
    constructor(props, context){
        super(props, context)
    }


    render(){
        let {data} = this.props
        return(
            <div className="home-power-item" onClick={this.props.onClick}>
                <div className="home-power-item-header">
                    <div className="header-icon"></div>
                    <div className="header-txt no-wrap">{data.name}</div>
                </div>
                <div className="home-power-content">
                    <div className="zgl-div">
                        <div className="title-txt">总功率</div>
                        <div className="value-txt">{data.generatedActivePower.toFixed(2)}KW</div>
                    </div>
                    <div className="list-div">
                        <div className="list-item">
                            <div>PR值</div>
                            <div>{data.pr.toFixed(2)}%</div>
                        </div>
                        <div className="item-line"></div>
                        <div className="list-item">
                            <div>通讯异常</div>
                            <div>{data.communicationAnomaly}台</div>
                        </div>
                        <div className="item-line"></div>
                        <div className="list-item">
                            <div>停机</div>
                            <div className="origin">{data.stop}台</div>
                        </div>
                        <div className="item-line"></div>
                        <div className="list-item">
                            <div>报警</div>
                            <div className="origin">{data.alarms}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HomePowerItem.PropTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func
}


export default HomePowerItem