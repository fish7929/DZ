import React, { PropTypes } from 'react'

import "./index.scss"

class PowerStationMonitorListItem extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        let {data} = this.props
        return(
            <div className="psm-list-item" onClick={this.props.onClick}>
                <div className="name-div">
                    <span className="icon"></span>
                    <span className="txt context-txt no-wrap" >{data.name}</span>
                </div>
                <div className="people-div">
                    <span className="title-txt">负责人:</span>
                    <span className="context-txt no-wrap">{data.manager}</span>
                </div>
                <div className="place-div">
                    <span className="title-txt" dangerouslySetInnerHTML={{__html:"地&nbsp;址:"}}></span>
                    <span className="context-txt no-wrap">{data.address}</span>
                </div>
            </div>
        )
    }

}

PowerStationMonitorListItem.PropTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default PowerStationMonitorListItem