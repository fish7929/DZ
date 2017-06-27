/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */

import React, {PropTypes} from 'react'

import './index.scss'


class MyFeedbackItem extends React.Component{

    render(){
        let {data} = this.props
        let level = data.faultGrade === 1 ? "I" : data.faultGrade === 2 ? "II" : data.faultGrade === 3 ? "III" : ""
        return(
            <div className="my-feedback-item">
                <div className="item-header">
                    <span className="title-txt no-wrap">江苏省镇江市2.12MW分布式光伏电站</span>
                    <span className="icon status_0"></span>
                </div>
                <div className="device-div">
                    <span>设备编号</span>
                    <span className="title-txt no-wrap">{data.equipmentNumber}</span>
                </div>
                <div className="info-div">
                    <span>{level}级</span>
                    <span>现场提交</span>
                    <span className="date-txt">{data.createTime}</span>
                </div>
            </div>
        )
    }
}

MyFeedbackItem.PropTypes = {
    data: PropTypes.object.isRequired
}

export default MyFeedbackItem