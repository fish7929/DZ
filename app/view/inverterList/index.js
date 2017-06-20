
import React, { PropTypes } from 'react'
import {hashHistory} from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import InverterItem from '../../component/inverterItem'

import * as routerConst from '../../static/const/routerConst'

import './index.scss'

class InverterList extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    onItemClick(id){
        hashHistory.push(routerConst.ROUTER_INVERTER_DETAIL + "/"+id)
    }

    render(){
        return(
            <Page className="inverter-list-container">
                <Header title="逆变器列表" isShowBack={true} />
                <div className="search-div"><input type="text" placeholder="搜索"></input><span className="search-icon" /></div>
                <div className="tab-div">
                    <div className="tab-item"><span>全部</span></div>
                    <div className="tab-item"><span>停机</span></div>
                    <div className="tab-item"><span>通讯异常</span></div>
                </div>
                <div className="inverter-list">
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                    <InverterItem onClick={()=>this.onItemClick(1)} />
                </div>
            </Page>
        )
    }
}

InverterList.PropTypes = {
    tabIndex: PropTypes.number.isRequired
}

export default InverterList