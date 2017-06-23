
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

const InverterTabs = ["全部", "停机", "通讯异常"]

class InverterList extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getInverterList(this.props.params.id, this.props.tabIndex)
    }

    onItemClick(id){
        hashHistory.push(routerConst.ROUTER_INVERTER_DETAIL + "/"+id)
    }

    onChangeTabIndex(tabIndex){
        if(tabIndex != this.props.tabIndex){
            this.props.changeTabIndex(tabIndex)
            this.props.getInverterList(this.props.params.id, tabIndex)
        }
    }

    render(){
        let {tabIndex, inverterList} = this.props
        return(
            <Page className="inverter-list-container">
                <Header title="逆变器列表" isShowBack={true} />
                <div className="search-div"><input type="text" placeholder="搜索"></input><span className="search-icon" /></div>
                <div className="tab-div">
                    {InverterTabs.map((obj,key)=><div key={key} className={"button tab-item " + (tabIndex == key ? "selected" : "")} onClick={()=>this.onChangeTabIndex(key)}><span>{obj}</span></div>)}
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