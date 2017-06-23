import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import PowerStationMonitorList from './powerStationMonitorListContainer'
import PowerStationMonitorMap from './powerStationMonitorMapContainer'

import * as ActionType from './reducer/actionType'

import { getPSMList } from './reducer/action'

class PowerStationMonitor extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getPSMList()
    }

    render(){
        let { data, showType } = this.props
        return(
            <Page className="psm-container">
                <Header title="电站监控" isShowBack={true} />
                {
                    showType==ActionType.SHOW_TYPE_LIST ? <PowerStationMonitorList data={this.props.data} /> : ""
                }
            </Page>
        )
    }
}

PowerStationMonitor.PropTypes = {
    showType: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}

let mapStateToProps = state => ({
    showType: state.powerStationMonitorReducer.showType,
    data: state.powerStationMonitorReducer.list,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPSMList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerStationMonitor)