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
import ScrollList from '../scrollList';
import * as utils from '../../utils';
import * as Api from '../../static/const/apiConst';

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
            list: this.props.data,
            currentPage: 1
        }
    }
    /**
     * 
     * @param {object} e 事件对象
     * @param {object} item 消息
     */
    toMessageDetailHandler(e, item) {
        e.preventDefault();
        e.stopPropagation();
        let url = Api.ChangeMessageStatusById(item.id);
        utils.fetchUtils(url).then((res) => {
            console.log('更新消息状态失败',  res);
        }).catch((e) => console.log(e));
        setTimeout(() => {hashHistory.push('/messageDetail/' + item.messageId + '/2');}, 500);
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
    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.data
        });
    }
    /**
     * 渲染
     */
    render() {
        return (
            // <ul className="message-content-wrapper">
            <ScrollList className="message-content-wrapper" onScroll={ page=>this.onScrollHandler(page) } currentPage={ this.state.currentPage } pageTotal={ this.props.total }>
                {this.state.list.map((item, index) => {
                    let readClass = item.isread == FIRST ? 'message-read' : '';
                    return (<li key={index} className={"system-message-item " + readClass}
                        onClick={(e) => this.toMessageDetailHandler(e, item)}>
                        <div><span>公告</span></div>
                        <div className="no-wrap">{item.content}</div>
                        <div>{Base.formatTime(item.createTime, "yyyy-MM-dd HH:mm:ss")}</div>
                    </li>)
                })}
            </ScrollList>
            // </ul>
        )
    }

}

SystemMessage.PropTypes = {
    total: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onScroll: PropTypes.func.isRequired
}

export default SystemMessage;