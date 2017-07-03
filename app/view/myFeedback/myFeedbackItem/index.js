/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */

import React, {PropTypes} from 'react'

import * as utils from '../../../utils'

import './index.scss'


class MyFeedbackItem extends React.Component{

    render(){
        let {data, onClick} = this.props
        let level = data.faultGrade === 1 ? "I" : data.faultGrade === 2 ? "II" : data.faultGrade === 3 ? "III" : ""
        return(
            <div className="my-feedback-item" onClick={onClick}>
                <div className="item-header">
                    <span className="title-txt no-wrap">{data.powerStationBaseInfo.address}</span>
                    <span className="icon status_0"></span>
                </div>
                <div className="device-div">
                    <span>设备编号</span>
                    <span className="title-txt no-wrap">{data.equipmentNumber}</span>
                </div>
                <div className="info-div">
                    <span>{level}级</span>
                    <span>现场提交</span>
                    <span className="date-txt">{utils.formatDate(data.createTime, "yyyy-MM-dd HH:mm:ss")}</span>
                </div>
            </div>
        )
    }
}

MyFeedbackItem.PropTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

export default MyFeedbackItem