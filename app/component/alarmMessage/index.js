/**
 * @component AlarmMessage.jsx
 * @description 报警消息组件
 * @time 2017-06-17 15:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import AlarmMessageItem from '../alarmMessageItem';
import SwipeWrapper from '../swipeWrapper';
import ScrollList from '../scrollList';
import * as utils from '../../utils';
import * as Api from '../../static/const/apiConst';
import { hashHistory } from 'react-router';
import './index.scss';
const THREE = 3;
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
        this.setState({ currentPage: page });
        this.props.onScroll(page);
    }
    setItemIsRead(id) {
        let { list } = this.state;
        let currentData = list.find((data, index) => data.id === id);
        currentData.isread = 1;  //设置已读
        this.setState({ list: list });
        AppModal.toast('该报警已解除');
    }
    /**
     * 
     * @param {object} e 事件对象
     * @param {object} item 消息
     */
    toMessageDetailHandler(e, item) {
        // e.preventDefault();
        e.stopPropagation();
        let id =  item.messageId;
        let status =  item.massageStatus;
        let url = Api.ChangeMessageStatusById(item.id);
        if (status === THREE) {
            this.setItemIsRead(id);
        } else {
            console.log('/alarmDetail/' + id);
            setTimeout(() => {hashHistory.push('/alarmDetail/' + id);}, 500);
        }
        utils.fetchUtils(url).then((res) => {
            if (res && res.data) {
                console.log('更新消息状态成功', res);
            }else{
                console.log('更新消息状态失败', res);
            }
        }).catch((e) => console.log(e));
    }
    /**
     * 左滑动事件
     * @param {string} itemRef ref 值
     */
    onSwipeLeftHandler(itemRef) {
        let messageItem = ReactDOM.findDOMNode(this.refs[itemRef]);
        if (messageItem) {
            console.log(messageItem.style.transform);
            messageItem.style.transform = 'translateX(-' + (160 / 28) + 'rem)'
            messageItem.style.WebkitTransform = 'translateX(-' + (160 / 28) + 'rem)'
        }
    }
    /**
     * 右滑动事件
     * @param {string} itemRef ref 值
     */
    onSwipeRightHandler(itemRef) {
        let messageItem = ReactDOM.findDOMNode(this.refs[itemRef]);
        if (messageItem) {
            messageItem.style.transform = 'translateX(0)'
            messageItem.style.WebkitTransform = 'translateX(0)'
        }
    }
    /**
     * 
     * @param {object} e 事件对象
     * @param {string} id 消息id
     */
    onDeleteSiteMessageHandler(e, id) {
        e.preventDefault();
        e.stopPropagation();
        //todo 去删除ID
        // /pvmtsys/messageSystemInfo/deleteMessage/{id}
        let url = Api.DeleteSiteMessageById(id);
        utils.fetchUtils(url).then((res) => {
            AppModal.hide()
            if (res.data) {
                AppModal.toast('删除成功');
                let oldList = this.state.list;
                let newList = oldList.filter((item, index) => item.id != id);
                this.setState({ list: newList });
            } else {
                AppModal.toast('删除失败');
            }

        }).catch((e) => AppModal.hide());
    }
    /**
     * 渲染
     */
    render() {
        return (
            // <ul className="message-content-wrapper">
            <ScrollList className="message-content-wrapper" onScroll={page => this.onScrollHandler(page)} currentPage={this.state.currentPage} pageTotal={this.props.total}>
                {this.state.list.map((item, index) => {
                    let _itemRef = item.id;
                    return (<div className="alarm-message-swipe" key={_itemRef} ref={_itemRef}>
                        <SwipeWrapper
                            onClick={(e) => this.toMessageDetailHandler(e, item)}
                            onSwipeLeft={() => this.onSwipeLeftHandler(_itemRef)} onSwipeRight={() => this.onSwipeRightHandler(_itemRef)}>
                            <AlarmMessageItem data={item} />
                        </SwipeWrapper>
                        <span className="alarm-message-item-del common-active" onClick={(e) => this.onDeleteSiteMessageHandler(e, item.id)}>删除</span>
                    </div>)
                })}
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