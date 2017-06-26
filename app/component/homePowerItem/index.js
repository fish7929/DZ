import React, { PropTypes } from 'react'

import './index.scss'

class HomePowerItem extends React.Component{
    constructor(props, context){
        super(props, context)
    }


    render(){
        return(
            <div className="home-power-item">
                <div className="home-power-item-header">
                    <div className="header-icon"></div>
                    <div className="header-txt">午休分布式电站</div>
                </div>
                <div className="home-power-content">
                    <div className="zgl-div">
                        <div className="title-txt">总功率</div>
                        <div className="value-txt">800.22KW</div>
                    </div>
                    <div className="list-div">
                        <div className="list-item">
                            <div>PR值</div>
                            <div>88.9%</div>
                        </div>
                        <div className="item-line"></div>
                        <div className="list-item">
                            <div>PR值</div>
                            <div>88.9%</div>
                        </div>
                        <div className="item-line"></div>
                        <div className="list-item">
                            <div>停机</div>
                            <div className="origin">5台</div>
                        </div>
                        <div className="item-line"></div>
                        <div className="list-item">
                            <div>报警</div>
                            <div className="origin">3</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HomePowerItem.PropTypes = {
}


export default HomePowerItem