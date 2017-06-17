/**
 * @component MessageDetail.jsx
 * @description 消息详情组件
 * @time 2017-06-17 23:40
 * @author fishYu
 **/
'use strict';
import React, { PropTypes } from 'react';
import { FIRST } from '../../static/const/constants';

import './index.scss'

class CommonMessageDetail extends React.Component {
    /**
     * 构造函数
     * @param {object} props 属性
     * @param {object} context 上下文
     */
    constructor(props, context) {
        super(props, context)
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
        let { data, type } = this.props;
        let _content = type == FIRST ? data.content : data.contentHtml;
        let _title = type == FIRST ? data.topic : data.name;
        let _time = type == FIRST ? data.sendTime : data.publishTime;
        let _userInfo = type == FIRST ? '调度中心|' + data.consigneeName : '';
        return (
            <div className="message-detail-wrapper">
                <div className="message-detail-title">
                    <div>{_title}</div>
                    {_userInfo ? <div className="message-detail-user-info">{_userInfo}</div> : null}
                    <div>{_time}</div>
                </div>
                <div className="message-detail-content">
                    <div>尊敬的业主您好：</div>
                    <div dangerouslySetInnerHTML={{ __html: _content }}></div>
                </div>
            </div>
        )
    }

}

CommonMessageDetail.PropTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.number.isRequired,
}

export default CommonMessageDetail;