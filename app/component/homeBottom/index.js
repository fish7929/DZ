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
        console.log(type, tabIndex, tabIndex==type);
        return classnames({
            btn_item: true,
            btn_home: type === 0,
            btn_order: type === 1,
            btn_message: type === 2,
            btn_my: type === 3,
            selected: tabIndex === type
        })
    }

    render(){
        let { tabIndex, onTabClick } = this.props

        return(
            <div className="home-bottom-container">
                <div className="btn-div" onClick={()=>onTabClick(0)}>
                    <div className={this.getBtnClass(0, tabIndex)}>
                        <div className="icon"></div>
                        <span>首页</span>
                    </div>
                </div>
                <div className="btn-div" onClick={()=>onTabClick(1)}>
                    <div className={this.getBtnClass(1, tabIndex)}>
                        <div className="icon"></div>
                        <span>工单</span>
                    </div>
                </div>
                <div className="btn-div" onClick={()=>onTabClick(2)}>
                    <div className={this.getBtnClass(2, tabIndex)}>
                        <div className="icon"></div>
                        <span>消息</span>
                    </div>
                </div>
                <div className="btn-div" onClick={()=>onTabClick(3)}>
                    <div className={this.getBtnClass(3, tabIndex)}>
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
