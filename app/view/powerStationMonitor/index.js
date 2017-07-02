import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import PowerStationMonitorList from './powerStationMonitorListContainer'
import PowerStationMonitorMap from './powerStationMonitorMapContainer'

import * as ActionType from './reducer/actionType'

import { getPSMList, changeShowType } from './reducer/action'

import './index.scss'

class PowerStationMonitor extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getPSMList()
    }

    onHeaderRightHandler(){
        let { showType } = this.props
        let type = ActionType.SHOW_TYPE_LIST
        if(showType == ActionType.SHOW_TYPE_LIST){
            type = ActionType.SHOW_TYPE_MAP
        }

        this.props.changeShowType(type)
    }

    render(){
        let { data, showType } = this.props
        let component = "", rightClass = ""
        if(showType == ActionType.SHOW_TYPE_LIST){
            component = <PowerStationMonitorList data={this.props.data} />
            rightClass = "psm-header-map"
        }else{
            component = <PowerStationMonitorMap data={this.props.data} />
            rightClass = "psm-header-list"
        }
        return(
            <Page className="psm-container">
                <Header title="电站监控" isShowBack={true} isShowRight={true} rightClass={rightClass} rightFn={()=>this.onHeaderRightHandler()} />
                { component }
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
    return bindActionCreators({ getPSMList, changeShowType }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerStationMonitor)