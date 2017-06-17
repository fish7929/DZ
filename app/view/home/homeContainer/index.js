import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import * as RouterConst from '../../../static/const/routerConst'

import * as HomeConst from '../reducer/const'

import './index.scss'

class HomeContianer extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {

    }

    getHomeTabs(){
        return HomeConst.HOME_BTN_TABS.map((obj, index) => (
            <div className="btn-tab-item button">
                <div className={obj.icon}></div>
                <div className="tab-title">{obj.title}</div>
            </div>
        ))
    }

    render() {
        return (
            <div className="home-container">
                <div className="btn-tabs">{this.getHomeTabs()}</div>
                <div className="home-notice-div">
                    <div className="notice-title-div">
                        <span className="icon-notice"></span>
                        <span className="title-notice">公告</span>
                    </div>
                    <div className="notice-message no-wrap">与能者写奥斯卡的敬爱考虑时间阿斯兰的空间案例</div>
                </div>
            </div>
        )
    }
}

export default HomeContianer
