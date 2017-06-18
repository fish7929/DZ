/**
 * @component MessageCenter.jsx
 * @description 消息中心组件
 * @time 2017-06-17 15:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router'

import './index.scss'

class MessageCenter extends React.Component {
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
     * 点击下一步的跳转
     * @param {object} e  事件对象
     * @param {*} url 需要跳转的URL
     */
    toNextHandler(e, url) {
        e.preventDefault();
        e.stopPropagation();
        hashHistory.push(url);
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
            <ul>
                {this.state.list.map((item, index) =>
                    <li key={index} className={"common-item common-next common-active common-pseudo " + item.class}
                        onClick={(e) => this.toNextHandler(e, item.url)} data-hint={item.hint}>
                        {item.numbers ? <span className="message-bubble">{item.numbers}</span> : null}
                    </li>
                )}
            </ul>
        )
    }

}

MessageCenter.PropTypes = {
    data: PropTypes.array.isRequired
}

export default MessageCenter;