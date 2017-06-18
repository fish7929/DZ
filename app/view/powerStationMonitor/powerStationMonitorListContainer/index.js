import React, { PropTypes } from 'react'

import PowerStationMonitorListItem from '../../../component/powerStationMonitorListItem'

import './index.scss'

class PowerStationMonitorListContainer extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div className="psm-list-container">
                {this.props.data.map((obj, key) => <PowerStationMonitorListItem key={key} data={obj} />)}
            </div>
        )
    }
}

PowerStationMonitorListContainer.PropTypes = {
    data: PropTypes.array.isRequired
}

export default PowerStationMonitorListContainer