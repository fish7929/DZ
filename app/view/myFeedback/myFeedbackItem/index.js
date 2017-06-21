/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */

import React, {} from 'react'

import './index.scss'


class MyFeedbackItem extends React.Component{

    render(){
        return(
            <div className="my-feedback-item">
                <div className="item-header">
                    <span className="title-txt no-wrap">江苏省镇江市2.12MW分布式光伏电站</span>
                    <span className="icon status_0"></span>
                </div>
                <div className="device-div">
                    <span>设备编号</span>
                    <span className="title-txt no-wrap">SW0001</span>
                </div>
                <div className="info-div">
                    <span>II级</span>
                    <span>现场提交</span>
                    <span className="date-txt">2017-05-16 22:31:14</span>
                </div>
            </div>
        )
    }
}

export default MyFeedbackItem