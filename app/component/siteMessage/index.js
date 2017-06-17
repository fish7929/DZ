/**
 * @component SiteMessage.jsx
 * @description 站内消息组件
 * @time 2017-06-17 21:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import { FIRST, SECOND, THREE } from '../../static/const/constants';

import './index.scss'

class SiteMessage extends React.Component {
    /**
     * 构造函数
     * @param {object} props 属性
     * @param {object} context 上下文
     */
    constructor(props, context) {
        super(props, context)
        this.state = {
            list: this.props.data
        }
    }
    /**
     * DOM加载完成
     */
    componentDidMount() {
    }
    /**
     * 渲染
     */
    render() {
        return (
            <ul className="message-content-wrapper">
                {this.state.list.map((item, index) => {
                    let massageStatus = "";
                    if (item.massageStatus == FIRST) {
                        massageStatus = '未提交';
                    } if (item.massageStatus == SECOND) {
                        massageStatus = '已提交';
                    } if (item.massageStatus == THREE) {
                        massageStatus = '以解除';
                    }
                    let readClass = item.MessageUserInfoPO[0] && item.MessageUserInfoPO[0].isread == FIRST ? 'message-read' : '';
                    return (<li key={index} className={"alarm-message-item " + readClass}>
                        <div className="alarm-message-left">
                            <span className={"alarm-message-logo" + item.massageLevel}></span>
                            <span className={"alarm-message-status" + item.massageStatus}>{massageStatus}</span>
                        </div>
                        <div className="alarm-message-right">
                            <div>{item.title}</div>
                            <div>{item.content}</div>
                            <div><span>{item.createTime}</span><span>230.22</span></div>
                        </div>
                    </li>)
                })}
            </ul>
        )
    }

}

SiteMessage.PropTypes = {
    data: PropTypes.array.isRequired
}

export default SiteMessage;