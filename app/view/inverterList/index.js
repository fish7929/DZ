
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {hashHistory} from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import InverterItem from '../../component/inverterItem'

import { getInverterList, changeTabIndex } from './reducer/action'

import * as routerConst from '../../static/const/routerConst'

import './index.scss'

const InverterTabs = [{name : "全部", id: 0, value: 0}, {name:"停机", id: 1, value: 1}, {name:"通讯异常", id: 2, value: 2}]

class InverterList extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.sendData(this.props.tabIndex)
    }

    onItemClick(id){
        hashHistory.push(routerConst.ROUTER_INVERTER_DETAIL + "/"+id)
    }

    onChangeTabIndex(tabIndex){
        if(tabIndex != this.props.tabIndex){
            this.props.changeTabIndex(tabIndex)
            this.sendData(tabIndex)
        }
    }

    sendData(tabIndex){
        let obj = InverterTabs.find(obj => obj.id === tabIndex)
        this.props.getInverterList(this.props.params.id, obj.value)
    }

    render(){
        let {tabIndex, inverterList} = this.props
        return(
            <Page className="inverter-list-container">
                <Header title="逆变器列表" isShowBack={true} />
                <div className="search-div"><input type="text" placeholder="搜索"></input><span className="search-icon" /></div>
                <div className="tab-div">
                    {InverterTabs.map((obj,key)=><div key={key} className={"button tab-item " + (tabIndex == obj.id ? "selected" : "")} onClick={()=>this.onChangeTabIndex(obj.id)}><span>{obj.name}</span></div>)}
                </div>
                <div className="inverter-list">
                    { inverterList.map((obj, key) => <InverterItem key={key} data={obj} onClick={()=>this.onItemClick(obj.id)} />) }
                </div>
            </Page>
        )
    }
}

InverterList.PropTypes = {
    tabIndex: PropTypes.number.isRequired,
    inverterList: PropTypes.array.isRequired,
}

let mapStateToProps = state => ({
    tabIndex: state.inverterReducer.tabIndex,
    inverterList: state.inverterReducer.inverterList,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getInverterList, changeTabIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InverterList)