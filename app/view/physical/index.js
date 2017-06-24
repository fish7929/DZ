/**
 * @component index.js
 * @description 电站体检
 * @time 2017-06-24 1:50
 * @author fishYu
 **/

'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Page from '../../component/page';
import Header from '../../component/header';
import NoMessage from '../../component/noMessage';

import UploadComponent from '../../component/uploadComponent';
import PhysicalFeedback from './PhysicalFeedback';

import { fetchData } from './reducer/action';

import './index.scss'

import { ZERO, FIRST } from '../../static/const/constants';

class Physical extends React.Component {

    constructor(props, context) {
        super(props, context)
        let order = this.props.params && this.props.params.order;  //工单号
        this.order = parseInt(order);
        let status = this.props.params && this.props.params.status;  //状态0 未处理， 1已处理
        this.status = parseInt(status);
        let param = this.props.params && this.props.params.param;  //json对象
        param = Base.myDecodeURIComponent(param);
        this.param = {};
        try {
            this.param = JSON.parse(param);
        } catch (e) {
            console.log(e);
        }
        this.state = {
            list: this.props.list,
            isAdd: false,  // false
        }
    }
    /**
     * 点击完成体检
     * @param {object} e 事件对象
     */
    onCompletedHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('完成');
    }
    /**
     * 提交离场申请保存.
     * @param {object} e 事件对象
     */
    onSaveHandler(param) {
        console.log(param, 'save');
        let oldList = this.state.list;
        oldList.physical.push(param);
        this.setState({
            isAdd: false,
            list: oldList
        });
    }
    /**
     * 开关显示详情
     * @param {object} e  事件对象
     */
    toggleItemHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let target = e.target;
        let _parent = target.parentNode;
        let _className = _parent.className;
        if (_className.indexOf('off') > -1) {
            _className = _className.replace(/off/g, 'on');
            _parent.className = _className;
        } else {
            _className = _className.replace(/on/g, 'off');
            _parent.className = _className;
        }
    }
    /**
     * 渲染检查标准
     */
    renderExamineSection() {
        let { list } = this.state;
        let examine = list.examine;
        let component = examine.map((item, index) => {
            let checkupContent = item.checkupContent;
            return (<div key={index} className="physical-examine-item">
                <div className="physical-examine-title">{item.checkupName}</div>
                {checkupContent.map((content, num) => <div key={num} className="physical-examine-content">
                    {content}</div>)}
            </div>);
        })
        return (
            <div>
                <div className="physical-examine-divide off">
                    检查标准
                    <span onClick={(e) => this.toggleItemHandler(e)}></span>
                </div>
                <div className="physical-wrapper">
                    {component}
                </div>
            </div>
        );
    }
    /**
     * 渲染检查体检
     */
    renderPhysicalSection() {
        let { list } = this.state;
        let physical = list.physical;
        let component = physical.map((item, index) => {
            let isSolve = item.isSolve;  //问题反馈类型， 0 不合格上报调度中心， 1 不合格就地解决
            let attachmentList = item.attachmentList;  //todo
            let explainInfo = item.explainInfo;
            let solve = isSolve == ZERO ? '不合格上报调度中心' : '不合格就地解决';
            return (<li key={index} className="physical-physical-item">
                <div className="physical-physical-divide off">
                    {item.examineName}
                    <span onClick={(e) => this.toggleItemHandler(e)}></span>
                    <div className="physical-physical-hint" data-hint="问题反馈">{solve}</div>
                </div>
                <div className="physical-wrapper">
                    <UploadComponent ref="uploadComponent" type={1} photos={attachmentList}
                        explain={explainInfo} />
                </div>
            </li>);
        })
        return (
            <ul className="margin-top-20">
                {component}
            </ul>
        );
    }
    addFeedbackHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isAdd: true });
    }
    /**
     * 渲染问题反馈内容
     */
    renderFeedbackSection() {
        let { list, isAdd } = this.state;
        let examine = list.examine;  //标准的体检
        let physical = list.physical;  //已经添加过的，
        let physicalId = physical.map((item) => item.examineId);
        //todo 筛选出剩下的
        let remain = examine.filter((item) => physicalId.indexOf(item.id) == -1);
        return (
            isAdd ? <PhysicalFeedback physicalList={remain} stationName={this.param.stationName || ''}
                callBack={(param) => this.onSaveHandler(param)} /> : null
        );
    }
    renderContentSection() {
        return (
            <div>
                {this.renderExamineSection()}
                {this.renderPhysicalSection()}
                {this.status == ZERO ? <div className="physical-feedback-wrapper">
                    <div className="physical-feedback" onClick={(e) => this.addFeedbackHandler(e)}>
                        添加问反馈
                    </div>
                </div> : null}
                {this.renderFeedbackSection()}
                {this.status == ZERO ? <div className="physical-save"
                    onClick={(e) => this.onSaveHandler(e)}>完成体检</div> : null}
            </div>
        );
    }
    /**
     * 渲染
     */
    render() {
        let { list } = this.state;
        return (
            <Page className="third-contact-container">
                <Header title="电站体检" isShowBack={true} />
                {Base.isEmptyObject(list) ? <NoMessage msg="暂无信息" /> : this.renderContentSection()}
            </Page>
        )
    }

    /**
     * 加载完成
     */
    componentDidMount() {
        this.props.fetchData(this.order);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({ list: nextProps.list, isAdd: false });
        }
    }

}

let mapStateToProps = state => {
    return ({
        isFetching: state.physicalData.isFetching,
        list: state.physicalData.list
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Physical)