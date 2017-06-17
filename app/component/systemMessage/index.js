/**
 * @component AlarmMessage.jsx
 * @description 系统消息组件
 * @time 2017-06-17 21:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import { FIRST, SECOND, THREE } from '../../static/const/constants';
import { hashHistory } from 'react-router';

import './index.scss'

class SystemMessage extends React.Component {
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
     * 
     * @param {object} e 事件对象
     * @param {string} id 消息id
     */
    toMessageDetailHandler(e, id) {
        e.preventDefault();
        e.stopPropagation();
        hashHistory.push('messageDetail/' + id + '/2');
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
                    let readClass = item.MessageUserInfoPO[0] && item.MessageUserInfoPO[0].isread == FIRST ? 'message-read' : '';
                    let userInfo = "调度中心 - 张三";
                    return (<li key={index} className={"system-message-item " + readClass}
                        onClick={(e) => this.toMessageDetailHandler(e, item.id)}>
                        <div><span>公告</span></div>
                        <div>{item.title}</div>
                        <div>{item.createTime}</div>
                    </li>)
                })}
            </ul>
        )
    }

}

SystemMessage.PropTypes = {
    data: PropTypes.array.isRequired
}

export default SystemMessage;