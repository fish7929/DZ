/**
 * created by zhao at 2017/6/13
 */
import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import './index.scss'

class Header extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
    }

    render(){
        return(
            <div className="header-container">
                <div className="title-div">
                    {this.props.title}
                    {
                        this.props.isShowBack ? <button className="btn_back" onClick={()=>hashHistory.goBack()}>返回</button> : ""
                    }
                </div>
            </div>
        )
    }
}

Header.PropTypes = {
    title: PropTypes.string.isRequired,
    isShowBack: PropTypes.bool.isRequired
}

export default Header
