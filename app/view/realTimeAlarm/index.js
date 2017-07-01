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
        this.state = {
            currentPage: 1,
            pagesize: 10
        }
    }

    componentDidMount(){
        this.onLoaderData(this.state.currentPage, this.props.tabIndex)
    }

    onLoaderData(currentPage, tabIndex){
        let opt = {
            page: currentPage,
            pagesize: this.state.pagesize,
            tabType: Const.TabList.find(obj => obj.id === tabIndex).value
        }
        this.props.getAlarmList(opt).then(()=>{
            this.setState({currentPage: currentPage})
        })
    }

    onTabHandler(type){
        if(type != this.props.tabIndex){
            this.props.changeTabIndex(type)
            this.onLoaderData(1, type)
        }
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
        let { tabIndex, pageTotal} = this.props
        let { currentPage } = this.state

        return(
            <Page className="realTime-alarm-container">
                <Header title="实时报警" isShowBack={true} />
                <div className="tab-div">
                    {Const.TabList.map((obj, key)=><li key={key} onClick={()=>this.onTabHandler(obj.id)} className={obj.id==tabIndex ? "selected" : ""}><div>{obj.name}</div></li>)}
                </div>
                <ScrollList className="realTime-alarm-list" onScroll={ page=>this.onLoaderData(page, tabIndex) } currentPage={ currentPage } pageTotal={ pageTotal }>
                    {this.getRealTimeAlarmItems()}
                </ScrollList>
            </Page>
        )
    }
}

RealTimeAlarm.PropTypes = {
    tabIndex: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    pageTotal: PropTypes.number.isRequired
}

let mapStateToProps = state => ({
    tabIndex: state.realTimeAlarmReducer.tabIndex,
    data: state.realTimeAlarmReducer.alarmList,
    pageTotal: state.realTimeAlarmReducer.pageTotal
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAlarmList, changeTabIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeAlarm)