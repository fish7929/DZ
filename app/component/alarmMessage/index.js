/**
 * @component AlarmMessage.jsx
 * @description 报警消息组件
 * @time 2017-06-17 15:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import AlarmMessageItem from '../alarmMessageItem';

class AlarmMessage extends React.Component {
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
                {this.state.list.map((item, index) => <AlarmMessageItem data={item} key={index} />)}
            </ul>
        )
    }

}

AlarmMessage.PropTypes = {
    data: PropTypes.array.isRequired
}

export default AlarmMessage;