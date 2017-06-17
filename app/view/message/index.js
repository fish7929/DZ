/**
 * @component Message.js
 * @description 消息界面
 * @time 2017-06-17 15:40
 * @author fishYu
 **/

'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Page from '../../component/page';
import Header from '../../component/header';

import AlarmMessage from '../../component/alarmMessage';

import { fetchData } from './reducer/action';

import './index.scss'

import { FIRST, SECOND, THREE } from '../../static/const/constants';

class Message extends React.Component {

    constructor(props, context) {
        super(props, context)
        let type = this.props.params && this.props.params.type;  //类型 1报警 2站内信 3系统
        this.type = parseInt(type);
    }
    /**
     * 根据路由不同获取不同对象
     */
    getContent() {
        let obj = {
            title: "",
            content: null
        };
        switch (this.type) {
            case FIRST:
                obj.title = "报警消息";
                obj.content = <AlarmMessage data={this.props.list} />
                break;
            case SECOND:
                obj.title = "站内消息";
                break;
            case THREE:
                obj.title = "系统消息";
                break;
        }
        return obj;
    }
    /**
     * 渲染
     */
    render() {
        let { isFetching, list } = this.props;
        let _content = this.getContent();
        return (
            <Page className="login-container">
                <Header title={_content.title} isShowBack={true} />
                {list.length < 1 ? <div className="no-message-info"><span>暂无消息</span></div>
                    : _content.content}
            </Page>
        )
    }

    /**
     * 加载完成
     */
    componentDidMount() {
        this.props.fetchData(this.type);
    }

}

let mapStateToProps = state => {
    return ({
        isFetching: state.messageData.isFetching,
        list: state.messageData.list
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)