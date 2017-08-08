/**
 * @component AlarmMessageItem.js
 * @description 报警消息组件
 * @time 2017-06-17 15:40
 * @author zhao
 **/
'use strict';
import React, { PropTypes } from 'react'

import { FIRST, SECOND, THREE } from '../../static/const/constants'
import { hashHistory } from 'react-router';
import './index.scss'
import * as utils from '../../utils';
import * as Api from '../../static/const/apiConst';
class AlarmMessageItem extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    
    /**
     * DOM加载完成
     */
    componentDidMount() {
        
    }
    // /**
    //  * 
    //  * @param {object} e 事件对象
    //  * @param {string} id 消息id
    //  * @param {number} status 消息类型
    //  */
    // toMessageDetailHandler(e, id, status) {
    //     // e.preventDefault();
    //     e.stopPropagation();
    //     let url = Api.ChangeMessageStatusById(id);
    //     utils.fetchUtils(url).then((res) => {
    //         console.log('更新消息状态失败',  res);
    //         if(res && res.data){
    //             if(status === THREE){
    //                 this.props.callBack && this.props.callBack(id);
    //             }else{
    //                 console.log('/alarmDetail/' + id);
    //                 hashHistory.push('/alarmDetail/' + id );
    //             }
    //         }
    //     }).catch((e) => console.log(e));
    // }
    /**
     * 渲染
     */
    render() {
        let { data } = this.props
        let massageStatus = "";
        if (data.massageStatus == FIRST) {
            massageStatus = '未提交';
        } if (data.massageStatus == SECOND) {
            massageStatus = '已提交';
        } if (data.massageStatus == THREE) {
            massageStatus = '已解除';
        }
        let readClass = data && data.isread == FIRST ? 'message-read' : '';
        let level = data.alarmgrade || 1;
        let hint = data.alarmMessageData ? data.alarmMessageData.alarmValue : '230.22';
        return (
            <li className={"alarm-message-item " + readClass}>
                <div className="alarm-message-left">
                    <span className={"alarm-message-logo" + level}></span>
                    <span className={"alarm-message-status" + data.massageStatus}>{massageStatus}</span>
                </div>
                <div className="alarm-message-right">
                    <div className="no-wrap">{data.title}</div>
                    <div className="no-wrap">{data.content}</div>
                    <div><span>{Base.formatTime(data.createTime, "yyyy-MM-dd HH:mm:ss")}</span><span>{hint}</span></div>
                </div>
            </li>
        )
    }

}

AlarmMessageItem.PropTypes = {
    data: PropTypes.object.isRequired
    // callBack: PropTypes.func
}

export default AlarmMessageItem