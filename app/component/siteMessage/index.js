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
    
    toMessageDetailHandler(e, id) {

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
                    return (<li key={index} className={"site-message-item " + readClass}
                        onClick={(e) => this.toMessageDetailHandler(e, item.id)}>
                        <div>{item.title}</div>
                        <div>{userInfo}</div>
                        <div>{item.createTime}</div>
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