import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import PowerStationMonitorList from './powerStationMonitorListContainer'
import PowerStationMonitorMap from './powerStationMonitorMapContainer'

import { getPSMList } from './reducer/action'

class PowerStationMonitor extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getPSMList()
    }

    render(){
        return(
            <Page className="psm-container">
                <Header title="电站监控" isShowBack={true} />
                <PowerStationMonitorList data={this.props.data} />
            </Page>
        )
    }
}

PowerStationMonitor.PropTypes = {
    data: PropTypes.array.isRequired,
}

let mapStateToProps = state => ({
    data: state.powerStationMonitorReducer.list,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPSMList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerStationMonitor)