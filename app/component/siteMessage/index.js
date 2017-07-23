/**
 * @component SiteMessage.jsx
 * @description 站内消息组件
 * @time 2017-06-17 21:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { FIRST, SECOND, THREE } from '../../static/const/constants';
import { hashHistory } from 'react-router';
import SwipeWrapper from '../swipeWrapper';
import ScrollList from '../scrollList';
import './index.scss'
import * as utils from '../../utils';
import * as Api from '../../static/const/apiConst';
class SiteMessage extends React.Component {
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
     * @param {string} id 消息id
     */
    toMessageDetailHandler(e, id) {
        e.preventDefault();
        e.stopPropagation();
        hashHistory.push('/messageDetail/' + id + '/1');
    }
    /**
     * 左滑动事件
     * @param {string} itemRef ref 值
     */
    onSwipeLeftHandler(itemRef) {
        console.log('onSwipeLeftHandler', itemRef);
        let messageItem = ReactDOM.findDOMNode(this.refs[itemRef]);
        console.log(messageItem, "hahah");
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
        console.log('onSwipeRightHandler');
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
        //删除单条站内消息
        //todo  delete  update local list
        console.log('onDeleteSiteMessageHandler');
        //todo 去删除ID
        // /pvmtsys/messageSystemInfo/deleteMessage/{id}
        let  url = Api.DeleteSiteMessageById(id);
        utils.fetchUtils(url).then((res) => {
            AppModal.hide()
            if (res.data) {
                AppModal.toast('删除成功');
                let oldList = this.state.list;
                let newList = oldList.filter((item, index) => item.id != id);
                this.setState({list: newList});
            }else{
                AppModal.toast('删除失败');
            }

        }).catch((e) => AppModal.hide());
        
        
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
        let { list } = this.state;
        return (
            // <ul className="message-content-wrapper" >
            <ScrollList className="message-content-wrapper" onScroll={ page=>this.onScrollHandler(page) } currentPage={ this.state.currentPage } pageTotal={ this.props.total }>
                {list.map((item, index) => {
                    let readClass = item.isread == FIRST ? 'message-read' : '';
                    let userInfo = "调度中心 - " + item.addressUser;
                    let _itemRef = item.id;
                    return (<li key={_itemRef} className={"site-message-item " + readClass} ref={_itemRef}>
                        <SwipeWrapper className="site-message-swipe"
                            onClick={(e) => this.toMessageDetailHandler(e, item.id)}
                            onSwipeLeft={() => this.onSwipeLeftHandler(_itemRef)} onSwipeRight={() => this.onSwipeRightHandler(_itemRef)}>
                            <div className="no-wrap">{item.title}</div>
                            <div className="no-wrap">{userInfo}</div>
                            <div>{Base.formatTime(item.createTime, "yyyy-MM-dd HH:mm:ss")}</div>
                        </SwipeWrapper>
                        <span className="site-message-item-del common-active" onClick={(e) => this.onDeleteSiteMessageHandler(e, item.id)}>删除</span>
                    </li>)
                })}
            </ScrollList>
            // </ul>
        )
    }

}

SiteMessage.PropTypes = {
    total: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onScroll: PropTypes.func.isRequired
}

export default SiteMessage;