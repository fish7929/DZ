
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {hashHistory} from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import ScrollList from '../../component/scrollList';
import InverterItem from '../../component/inverterItem'

import { getInverterList, changeTabIndex } from './reducer/action'

import * as routerConst from '../../static/const/routerConst'

import './index.scss'

const InverterTabs = [{name : "全部", id: 0, value: 0}, {name:"停机", id: 1, value: 1}, {name:"通讯异常", id: 2, value: 2}]

class InverterList extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state = {
            currentPage: 1,
            searchTxt: ""
        }
    }

    componentDidMount(){
        this.setState({searchTxt: ""})
        this.sendData(this.props.tabIndex, 1)
    }

    onItemClick(id){
        hashHistory.push(routerConst.ROUTER_INVERTER_DETAIL + "/"+id)
    }

    onChangeTabIndex(tabIndex){
        if(tabIndex != this.props.tabIndex){
            this.props.changeTabIndex(tabIndex)
            this.sendData(tabIndex, 1)
        }
    }

    sendData(tabIndex, page){
        let obj = InverterTabs.find(obj => obj.id === tabIndex)
        this.props.getInverterList(this.props.params.id, obj.value, page).then(()=>{
            if(this){
                this.setState({ currentPage: page });
            }
        })
    }

    onSearchHandler(){
        let obj = InverterTabs.find(obj => obj.id === this.props.tabIndex)
        this.props.getInverterList(this.props.params.id, obj.value, this.state.currentPage, this.state.searchTxt)
    }

    onChangeHandler(e){
        this.setState({searchTxt: e.target.value})
    }

    render(){
        let {tabIndex, inverterList, searchTxt} = this.props
        return(
            <Page className="inverter-list-container">
                <Header title="逆变器列表" isShowBack={true} />
                <div className="search-div"><input type="text" placeholder="搜索" value={searchTxt} onChange={(e)=>this.onChangeHandler(e)} /><span className="search-icon" onClick={()=>this.onSearchHandler()} /></div>
                <div className="tab-div">
                    {InverterTabs.map((obj,key)=><div key={key} className={"button tab-item " + (tabIndex == obj.id ? "selected" : "")} onClick={()=>this.onChangeTabIndex(obj.id)}><span>{obj.name}</span></div>)}
                </div>
                <ScrollList className="inverter-list" onScroll={page => this.sendData(tabIndex, page)} currentPage={this.state.currentPage} pageTotal={this.props.total}>
                    { inverterList.map((obj, key) => <InverterItem key={key} data={obj} onClick={()=>this.onItemClick(obj.id)} />) }
                </ScrollList>
            </Page>
        )
    }
}

InverterList.PropTypes = {
    tabIndex: PropTypes.number.isRequired,
    inverterList: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
}

let mapStateToProps = state => ({
    tabIndex: state.inverterReducer.tabIndex,
    inverterList: state.inverterReducer.inverterList,
    total: state.inverterReducer.total
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getInverterList, changeTabIndex }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InverterList)