/**
 * created by zhao at 2017/6/13
 */
import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './index.scss'

class HomeBottom extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
    }

    getBtnClass(type, tabIndex){
        return classnames({
            button: true,
            btn_home: type === 0 ? true : false,
            btn_order: type === 1 ? true : false,
            btn_message: type === 2 ? true : false,
            btn_my: type === 3 ? true : false,
            active: tabIndex === type ? true : false
        })
    }

    render(){
        let { tabIndex, onTabClick } = this.props

        return(
            <div className="home-bottom-container">
                <div className="btn-item">
                    <div className={this.getBtnClass(0, tabIndex)} onClick={()=>onTabClick(0)}>
                        <div className="icon"></div>
                        <span>首页</span>
                    </div>
                </div>
                <div className="btn-item">
                    <div className={this.getBtnClass(1, tabIndex)} onClick={()=>onTabClick(1)}>
                        <div className="icon"></div>
                        <span>工单</span>
                    </div>
                </div>
                <div className="btn-item">
                    <div className={this.getBtnClass(2, tabIndex)} onClick={()=>onTabClick(2)}>
                        <div className="icon"></div>
                        <span>消息</span>
                    </div>
                </div>
                <div className="btn-item">
                    <div className={this.getBtnClass(3, tabIndex)} onClick={()=>onTabClick(3)}>
                        <div className="icon"></div>
                        <span>我的</span>
                    </div>
                </div>
            </div>
        )
    }
}

HomeBottom.PropTypes = {
    tabIndex: PropTypes.number.isRequired,
    onTabClick: PropTypes.func.isRequired
}

export default HomeBottom
