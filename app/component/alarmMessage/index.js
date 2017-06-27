/**
 * @component AlarmMessage.jsx
 * @description 报警消息组件
 * @time 2017-06-17 15:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import AlarmMessageItem from '../alarmMessageItem';
import ScrollList from '../scrollList';
class AlarmMessage extends React.Component {
    /**
     * 构造函数
     * @param {object} props 属性
     * @param {object} context 上下文
     */
    constructor(props, context) {
        super(props, context)
        this.state = {
            list: this.props.data,
            currentPage: 1
        }
    }
    /**
     * DOM加载完成
     */
    componentDidMount() {
    }
    onScrollHandler(page) {
        //todo 可能存在隐患
        this.setState({currentPage: page});
        this.props.onScroll(page);
    }
    /**
     * 渲染
     */
    render() {
        return (
            // <ul className="message-content-wrapper">
            <ScrollList className="message-content-wrapper" onScroll={ page=>this.onScrollHandler(page) } currentPage={ this.state.currentPage } pageTotal={ this.props.total }>
                {this.state.list.map((item, index) => <AlarmMessageItem data={item} key={index} />)}
            </ScrollList>
            // </ul>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.data
        });
    }
}

AlarmMessage.PropTypes = {
    total: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onScroll: PropTypes.func.isRequired,
}

export default AlarmMessage;