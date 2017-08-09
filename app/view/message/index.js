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
import SiteMessage from '../../component/siteMessage';
import SystemMessage from '../../component/systemMessage';
import NoMessage from '../../component/noMessage';

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
        let { list, total, fetchData } = this.props;
        switch (this.type) {
            case FIRST:
                obj.title = "报警消息";
                obj.content = <AlarmMessage data={list}  total={total}
                onScroll={(page) => fetchData(this.type, page)}/>
                break;
            case SECOND:
                obj.title = "站内消息";
                obj.content = <SiteMessage data={list}  total={total}
                onScroll={(page) => fetchData(this.type, page)} />
                break;
            case THREE:
                obj.title = "系统消息";
                obj.content = <SystemMessage data={list}  total={total}
                onScroll={(page) => fetchData(this.type, page)} />
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
            <Page className="message-container">
                <Header title={_content.title} isShowBack={true} backFn={() => hashHistory.push('/home/2')}/>
                {list.length < 1 ? 
                    <NoMessage msg="暂无消息"/>: _content.content}
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
        list: state.messageData.list,
        total:  state.messageData.total
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)