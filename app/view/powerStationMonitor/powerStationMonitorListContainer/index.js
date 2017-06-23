import React, { PropTypes } from 'react'

import { hashHistory } from 'react-router'

import PowerStationMonitorListItem from '../../../component/powerStationMonitorListItem'

import * as RouterConst from '../../../static/const/routerConst'

import './index.scss'

class PowerStationMonitorListContainer extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    onItemHandler(id){
        hashHistory.push(RouterConst.ROUTER_POWER_STATION_MONITOR_DETAIL + "/" + id);
    }

    render(){
        return(
            <div className="psm-list-container">
                {this.props.data.map((obj, key) => <PowerStationMonitorListItem key={key} data={obj} onClick={()=>this.onItemHandler(obj.id)} />)}
            </div>
        )
    }
}

PowerStationMonitorListContainer.PropTypes = {
    data: PropTypes.array.isRequired
}

export default PowerStationMonitorListContainer