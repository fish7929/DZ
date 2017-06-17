/**
 * @component MessageDetail.js
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

import CommonMessageDetail from '../../component/messageDetail';

import { fetchData } from './reducer/action';

import './index.scss'

import { FIRST, SECOND } from '../../static/const/constants';

class MessageDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.id = this.props.params && this.props.params.id;  //消息ID
        let type = this.props.params && this.props.params.type;  //类型 1站内信 2系统
        this.type = parseInt(type);
    }
    /**
     * 根据路由不同获取不同对象
     */
    getContent() {
        let obj = {
            title: "",
            content: <CommonMessageDetail data={this.props.data} type={this.type} />
        };
        switch (this.type) {
            case FIRST:
                obj.title = "站内消息详情";
                break;
            case SECOND:
                obj.title = "系统消息详情";
                break;
        }
        return obj;
    }
    /**
     * 渲染
     */
    render() {
        let { isFetching } = this.props;
        let _content = this.getContent();
        return (
            <Page className="login-container">
                <Header title={_content.title} isShowBack={true} />
                {_content.content}
            </Page>
        )
    }

    /**
     * 加载完成
     */
    componentDidMount() {
        this.props.fetchData(this.id, this.type);
    }

}

let mapStateToProps = state => {
    return ({
        isFetching: state.messageDetail.isFetching,
        data: state.messageDetail.data
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetail)