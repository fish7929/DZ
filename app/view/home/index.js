import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import * as RouterConst from '../../static/const/routerConst'

import Page from '../../component/page'
import HomeBottom from '../../component/homeBottom'


import * as HomeConst from './reducer/const'

import './index.scss'

class Home extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){

    }

    getHomeTabs(){
        return HomeConst.HOME_BTN_TABS.map((obj, index) => (
            <div className="btn-tab-item">
                <div className={obj.icon}></div>
                <div>{obj.title}</div>
            </div>
        ))
    }

    render(){
        return(
            <Page className="home-container">
                <button onClick={()=>hashHistory.push(RouterConst.ROUTER_LOGIN)}>光伏运维管理平台</button>
                <div className="btn-tabs">{this.getHomeTabs()}</div>
                <HomeBottom tabIndex={1} onTabClick={(tab)=>console.log(tab)} />
            </Page>
        )
    }
}

export default Home
