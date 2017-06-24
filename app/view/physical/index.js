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

import { fetchData } from './reducer/action';

import './index.scss'

import { ZERO, FIRST } from '../../static/const/constants';

class Physical extends React.Component {

    constructor(props, context) {
        super(props, context)
        let order = this.props.params && this.props.params.order;  //工单号
        this.order = parseInt(order);
        let status = this.props.params && this.props.params.status;  //状态
        this.status = parseInt(status);
        this.state = {
            list: this.props.list,
            isAdd: false,
        }
    }
    /**
     * 
     * @param {object} e 事件对象
     * @param {number} id 检查项目ID
     * @param {number} quali 质量检查0不合格就地解决，1 合格
     */
    changeQualiHandler(e, id, quali) {
        e.preventDefault();
        e.stopPropagation();
        let oldList = this.state.list;
        let departureExamine = oldList.departureExamine;
        departureExamine.forEach((examine, num) => {
            if (examine.examineId == id) examine.isQualified = quali;
        });
        this.setState({ list: oldList });
    }
    /**
     * 提交离场申请保存.
     * @param {object} e 事件对象
     */
    onSaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let uploadComponent = this.refs.uploadComponent;
        let upload = uploadComponent.getUploadContent();
        let param = this.state.list;
        param.conclusion = upload.explain;
        param.departureAccessory = upload.photos;
        console.log(param, 'tijiao');
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
                <div className="physical-examine-title">{(index + 1) + "." + item.checkupName}</div>
                {checkupContent.map((content, num) => <div key={num} className="physical-examine-content">
                    {(num + 1) + "." + content}</div>)}
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
            let departureAccessory = item.departureAccessory;  //todo
            let explainInfo = item.explainInfo;
            let solve = isSolve == 0 ? '不合格上报调度中心' : '不合格就地解决';
            return (<li key={index} className="physical-physical-item">
                <div className="physical-physical-divide off">
                    {(index + 1) + "." + item.examineName}
                    <span onClick={(e) => this.toggleItemHandler(e)}></span>
                    <div className="physical-physical-hint" data-hint="问题反馈">{solve}</div>
                </div>
                <div className="physical-wrapper">
                    <UploadComponent ref="uploadComponent" type={1} photos={departureAccessory}
                explain={explainInfo}/>
                </div>
            </li>);
        })
        return (
            <ul className="margin-top-20">
                {component}
            </ul>
        );
    }
    addFeedbackHandler(e){
        e.preventDefault();
        e.stopPropagation();

    }
    /**
     * 渲染问题反馈内容
     */
    renderFeedbackSection() {
    }
    /**
     * 渲染问题反馈内容
     */
    renderFeedbackSection() {
        return null;
    }
    renderContentSection() {
        return(
            <div>
                {this.renderExamineSection()}
                {this.renderPhysicalSection()}
                <div className="physical-feedback-wrapper">
                    <div className="physical-feedback" onClick={(e) => this.addFeedbackHandler(e)}>
                        添加问反馈
                    </div>
                </div>
                {this.renderFeedbackSection()}
                <div className="physical-save" onClick={(e) => this.onSaveHandler(e)}>完成体检</div>
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