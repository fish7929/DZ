import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import ScrollList from '../../component/scrollList'
import noMessage from '../../component/noMessage'
import RealTimeAlarmItem from '../../component/realTimeAlarmItem'

import { getMyPowerStationList, searchAlarmList } from './reducer/action'

import * as RouterConst from '../../static/const/routerConst'

import './index.scss'

class AlarmSearch extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state = {
            showResult: false,
            powerStationId: "",
            alarmStatus: null,
            alarmMessage: "",
            alarmLevel: 1,
            startTime: "",
            endTime: "",
            currentPage: 1,
            pageSize: 10
        }
    }

    componentDidMount(){
        this.setState({
            showResult: false,
            powerStationId: "",
            alarmStatus: null,
            alarmMessage: "",
            alarmLevel: 1,
            startTime: "",
            endTime: "",
            currentPage: 1,
            pageSize: 10
        })
        this.props.getMyPowerStationList()
    }

    componentWillReceiveProps(nextProps){
        if(this.props.powerStationList.length != nextProps.powerStationList.length && this.state.powerStationId==""){
            this.setState({powerStationId: nextProps.powerStationList[0].id})
        }
    }

    onChangeHandler(e, type){
        let state = {}
        state[type] = e.target.value
        this.setState(state);       
    }

    onSearchHandler(){
        this.onLoaderSearchData(1)
    }

    onLoaderSearchData(currentPage){
        let { powerStationId, alarmStatus, alarmMessage, alarmLevel, startTime, endTime } = this.state
        let opt = {
            alarmGrade: alarmLevel,
            powerStationId: powerStationId,
            page: currentPage,
            pageSize: this.state.pageSize
        }

        if(alarmStatus != "null" && alarmStatus != null) opt.status = alarmStatus
        if(endTime != "") opt.beforeTime = endTime
        if(startTime != "") opt.lateTime = startTime
        if(alarmMessage != "") opt.alarmMessage = alarmMessage

        this.props.searchAlarmList(opt).then(()=>this.setState({currentPage: currentPage, showResult: true}))
    }

    onReChoseHandler(){
        this.setState({showResult: false});
    }

    onItemHandler(id){
        hashHistory.push(RouterConst.ROUTER_ALARM_DETAIL + "/" + id);
    }

    getSearchItems(){
        let {searchList} = this.props
        if(searchList.length == 0){
            return <noMessage />
        }
        return searchList.map((obj, index)=>(
            <RealTimeAlarmItem key={index} data={obj} onClick={()=>this.onItemHandler(obj.id)} />
        ))
    }

    render(){
        let { powerStationId, alarmStatus, alarmMessage, alarmLevel, startTime, endTime, showResult, currentPage } = this.state
        let { powerStationList, pageTotal } = this.props
        return(
            <Page className="alarm-search-container">
                <Header title="搜索" isShowBack={true} />
                {
                    showResult == false
                        ? 
                        <div>
                            <div className="name-div">
                                <span>电站名称</span>
                                <select onChange={(e)=>this.onChangeHandler(e, "powerStationId")} defaultValue={powerStationId} >
                                    { powerStationList.map((obj, index) => <option key={index} value={obj.id}>{obj.name}</option>) }
                                </select>
                            </div>

                            <div className="alarm-item alarm-status">
                                <span>报警状态</span>
                                <select onChange={(e)=>this.onChangeHandler(e, "alarmStatus")} defaultValue={alarmStatus} >
                                    <option value="null">全部</option>
                                    <option value="1">已提交</option>
                                    <option value="0">未提交</option>
                                </select>
                            </div>

                            <div className="alarm-item">
                                    <span>报警原因</span>
                                    <input type="text" placeholder="请输入报警原因" value={alarmMessage} onChange={(e)=>this.onChangeHandler(e, "alarmMessage")} />
                            </div>

                            <div className="alarm-item">
                                    <span>报警级别</span>
                                    <select onChange={(e)=>this.onChangeHandler(e, "alarmLevel")} defaultValue={alarmLevel}>
                                        <option value="1">Ⅰ级报警</option>
                                        <option value="2">Ⅱ级报警</option>
                                        <option value="3">Ⅲ级报警</option>
                                    </select>
                            </div>
                            <div className="time-div">
                                <span>报警时间范围</span>
                                <div>
                                    <input type="date" placeholder="起始时间" onChange={(e)=>this.onChangeHandler(e, "startTime")} defaultValue={startTime} />
                                    <span>至</span>
                                    <input type="date" placeholder="结束时间" onChange={(e)=>this.onChangeHandler(e, "endTime")} defaultValue={endTime} />
                                </div>
                            </div>

                            <button className="btn-search" onClick={()=>this.onSearchHandler()}>搜索</button>
                        </div>
                        :
                        <div className="search-result-div">
                            <ScrollList className="search-result-list" onScroll={ page=>this.onLoaderSearchData(page) } currentPage={ currentPage } pageTotal={ pageTotal }>
                                {this.getSearchItems()}
                            </ScrollList>
                            <button onClick={()=>this.onReChoseHandler()}>重新选择</button>
                        </div>
                }
            </Page>
        )
    }

}

let mapStateToProps = state => ({
    powerStationList: state.alarmSearchReducer.powerStations,
    searchList: state.alarmSearchReducer.searchList,
    pageTotal: state.alarmSearchReducer.pageTotal
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMyPowerStationList, searchAlarmList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmSearch)