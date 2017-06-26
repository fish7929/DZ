import React, { PropTypes } from 'react'

import './index.scss'

class HomePowerItem extends React.PropTypes{
    constructor(props, context){

    }


    render(){
        return(
            <div className="home-power-item">
                <div>
                    <div className="icon"></div>
                    <div>午休分布式电站</div>
                </div>
                <div>
                    <div>
                        <div>总功率</div>
                        <div>800.22KW</div>
                    </div>
                    <div>
                        <div>
                            <div>PR值</div>
                            <div>88.9%</div>
                        </div>
                        <div></div>
                        <div>
                            <div>PR值</div>
                            <div>88.9%</div>
                        </div>
                        <div></div>
                        <div>
                            <div>停机</div>
                            <div>5台</div>
                        </div>
                        <div></div>
                        <div>
                            <div>报警</div>
                            <div>3</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HomePowerItem.PropTypes = {
    data: PropTypes.object.isRequired
}


export default HomePowerItem