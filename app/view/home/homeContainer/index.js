import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import AlarmMessageItem from '../../../component/alarmMessageItem'

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
            <div className="btn-tab-item button" key={index}>
                <div className={obj.icon}></div>
                <div className="tab-title">{obj.title}</div>
            </div>
        ))
    }

    getAlarmItem(){
        let data = [
            {
                "MessageUserInfoPO": [
                    {
                        "isread": 0,
                        "messageId": 30238,
                        "updateTime": "2017-05-16 22:31:14",
                        "userId": 43864
                    }
                ],
                "content": "直流电压过低",
                "createTime": "2017-05-16 22:31:14",
                "forcedPush": 1,
                "id": 87400,
                "massageStatus": 1,
                "massageLevel": 1,
                "messageId": 80827,
                "messageType": 1,
                "title": "江苏省湛江市恒顺醋页分布式光伏电站"
            },
            {
                "MessageUserInfoPO": [
                    {
                        "isread": 0,
                        "messageId": 30238,
                        "updateTime": "2017-05-16 22:31:14",
                        "userId": 43864
                    }
                ],
                "content": "直流电压过低",
                "createTime": "2017-05-16 22:31:14",
                "forcedPush": 1,
                "id": 87400,
                "massageStatus": 2,
                "massageLevel": 2,
                "messageId": 80827,
                "messageType": 1,
                "title": "江苏省湛江市恒顺醋页分布式光伏电站"
            },
            {
                "MessageUserInfoPO": [
                    {
                        "isread": 1,
                        "messageId": 30238,
                        "updateTime": "2017-05-16 22:31:14",
                        "userId": 43864
                    }
                ],
                "content": "直流电压过低",
                "createTime": "2017-05-16 22:31:14",
                "forcedPush": 1,
                "id": 87400,
                "massageStatus": 3,
                "massageLevel": 3,
                "messageId": 80827,
                "messageType": 1,
                "title": "江苏省湛江市恒顺醋页分布式光伏电站"
            }
        ]
        console.log(data.length)
        return data.map((obj, index) => <AlarmMessageItem data={obj} key={index} />)
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
                <div className="home-alarm-list">
                    <div className="alarm-title-div">
                        <span></span>报警消息
                    </div>
                    {this.getAlarmItem()}
                    <button className="btn-alarm-more">查看7条未读消息</button>
                </div>
            </div>
        )
    }
}

export default HomeContianer
