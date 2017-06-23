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
            list: this.props.list
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
                <div className="physical-examine-divide">
                    检查标准
                    <span onClick={(e) => this.toggleItemHandler(e)}></span>
                </div>
                <div className="physical-examine-wrapper">
                    {component}
                </div>
            </div>
        );
    }
    /**
     * 渲染内容
     */
    renderContentSection() {
        let { list } = this.state; //结果不是数组
        let component = null;
        let departureExamine = list.departureExamine;
        let conclusion = list.conclusion;
        console.log(departureExamine, 899, list);
        let departureAccessory = list.departureAccessory;  //附近 后续需要修改
        return (<div className="margin-top-20">
            <div className="common-divide">检查项目</div>
            {departureExamine.map((examine, num) => {
                let isQualified = examine.isQualified;
                let lastClass = num == (departureExamine.length - 1) ? 'examine-item-last' : ''
                return (<div className={"examine-item " + lastClass} key={num}>
                    <div className="examine-item-title">{(num + 1) + "." + examine.examineName}</div>
                    <span>
                        {this.status == 0 ? <input type="radio" id={examine.examineId + ' ' + FIRST} name={examine.examineId} checked={isQualified == FIRST}
                            onChange={(e) => this.changeQualiHandler(e, examine.examineId, FIRST)} />
                            : <input type="radio" id={examine.examineId + ' ' + FIRST} name={examine.examineId} checked={isQualified == FIRST} disabled />}
                        <label htmlFor={examine.examineId + ' ' + FIRST}>合格</label>
                    </span>
                    <span>
                        {this.status == 0 ? <input type="radio" id={examine.examineId + ' ' + ZERO} name={examine.examineId} checked={isQualified == ZERO}
                            onChange={(e) => this.changeQualiHandler(e, examine.examineId, ZERO)} />
                            : <input type="radio" id={examine.examineId + ' ' + ZERO} name={examine.examineId} checked={isQualified == ZERO} disabled />}
                        <label htmlFor={examine.examineId + ' ' + ZERO}>不合格就地解决</label>
                    </span>
                </div>)
            })}
            <UploadComponent ref="uploadComponent" type={this.status} photos={departureAccessory}
                explain={conclusion} explainHint="检查结论" />
            {this.status == 0 ? <div className="examine-save-wrapper"><div className="examine-save" onClick={(e) => this.onSaveHandler(e)}>保存</div></div> : null}
        </div>)
    }
    /**
     * 渲染
     */
    render() {
        let { list } = this.state;
        console.log(list, 7899);
        return (
            <Page className="third-contact-container">
                <Header title="电站体检" isShowBack={true} />
                {Base.isEmptyObject(list) ? <NoMessage msg="暂无信息" /> : this.renderExamineSection()}
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
            this.setState({ list: nextProps.list });
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