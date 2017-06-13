import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import * as RouterConst from '../../static/const/routerConst'


import HomeBottom from '../../component/homeBottom'

import './index.scss'

class Home extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="home-container">
                <button onClick={()=>hashHistory.push(RouterConst.ROUTER_LOGIN)}>登录</button>
                <HomeBottom tabIndex={1} onTabClick={(tab)=>console.log(tab)} />
            </div>
        )
    }
}

export default Home
