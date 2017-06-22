import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import noMessage from '../../component/noMessage'
import ScrollList from '../../component/scrollList'
import RealTimeAlarmItem from '../../component/realTimeAlarmItem'

import { getAlarmList, changeTabIndex } from './reducer/action'

import * as Const from './reducer/const'
import * as RouterConst from '../../static/const/routerConst'

import './index.scss'

class RealTimeAlarm extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getAlarmList()
    }

    onTabHandler(type){
        this.props.changeTabIndex(type)
    }

    onItemHandler(id){
        hashHistory.push(RouterConst.ROUTER_ALARM_DETAIL + "/" + id);
    }

    getRealTimeAlarmItems(){
        let {data} = this.props
        if(data.length == 0){
            return <noMessage />
        }
        return data.map((obj, index)=>(
            <RealTimeAlarmItem key={index} data={obj} onClick={()=>this.onItemHandler(obj.id)} />
        ))
    }

    render(){
        return(
            <Page className="realTime-alarm-container">
                <Header title="实时报警" isShowBack={true} />
                <div className="tab-div">
                    {Const.TabList.map((obj, key)=><li key={key} onClick={()=>this.onTabHandler(obj.id)} className={obj.id==this.props.tabIndex ? "selected" : ""}><div>{obj.name}</div></li>)}
                </div>
                <ScrollList className="realTime-alarm-list" onScroll={(page)=>console.log(page)} currentPage={0}>
                    {this.getRealTimeAlarmItems()}
                </ScrollList>
            </Page>
        )
    }
}

RealTimeAlarm.PropTypes = {
    tabIndex: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
}

let mapStateToProps = state => ({
    tabIndex: state.realTimeAlarmReducer.tabIndex,
    data: state.realTimeAlarmReducer.alarmList,
    total: state.realTimeAlarmReducer.total
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAlarmList, changeTabIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeAlarm)