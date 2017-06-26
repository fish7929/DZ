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

import { ZERO, FIRST, SECOND, THREE } from '../../static/const/constants';

class FaultDetail extends React.Component {

    constructor(props, context) {
        super(props, context)
        let id = this.props.params && this.props.params.id;  //工单号
        this.id = parseInt(id);
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
            isSolve: FIRST
        }
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
     * 渲染基本信息
     */
    renderBaseSection() {
        let { list } = this.state;
        let faultSource = list.faultSource; //故障来源1 警报， 2  人员
        let faultGrade = list.faultGrade; //1， 2， 3
        let _level = "Ⅰ级"; //Ⅱ Ⅲ
        if (faultGrade == SECOND) {
            _level = "Ⅱ级";
        } else if (faultGrade == THREE) {
            _level = "Ⅲ级";
        }
        return (
            <div className="margin-bottom-20">
                <div className="common-divide">基本信息</div>
                <div className="common-order-item-hint">
                    设备类型<span className="no-wrap">{list.equipmentType}</span>
                </div>
                <div className="common-order-item-hint">
                    {faultSource == FIRST ? "故障信息" : "设备编号"}
                    <span className="no-wrap">{faultSource == FIRST ? list.faultMessage : list.equipmentId}</span>
                </div>
                <div className="common-order-item-hint">
                    故障级别
                    <span className="no-wrap">{_level}</span>
                </div>
            </div>
        );
    }
    /**
     * 渲染故障详情
     */
    renderDetailSection() {
        let { list } = this.state;
        let attachmentList = list.attachmentList;
        let state = list.state;
        return (
            <div>
                <div className="common-divide">故障详情</div>
                <div className="common-order-item-hint">
                    维护人员<span className="no-wrap">{list.userName}</span>
                </div>
                <div className="common-order-item-hint">
                    运维时间
                    <span className="no-wrap">{list.createTime}</span>
                </div>
                <UploadComponent type={FIRST} photos={attachmentList} explain={state} />
            </div>
        );
    }
    /**
     * 渲染处理结果
     */
    renderDealResultSection() {
        let { list, isSolve } = this.state;
        return (
            <div className="margin-top-20">
                <div className="common-divide deal-result">处理结果</div>
                <div className="deal-result-select">
                    <label htmlFor="dealResult1"><input type="radio" name="dealResult"
                        id="dealResult1" checked={isSolve == FIRST} onChange={(e) => this.selectDealResultHandler(e, FIRST)} />
                        以解决
                    </label>
                    <label htmlFor="dealResult0"><input type="radio" name="dealResult"
                        id="dealResult0" checked={isSolve == ZERO} onChange={(e) => this.selectDealResultHandler(e, ZERO)} />
                        未解决
                    </label>
                </div>
                <UploadComponent ref="dealUploadComponent" type={ZERO} />
            </div>
        );
    }
    renderContentSection() {
        let { list } = this.state;
        return (
            <div>
                <div className="fault-detail-name">{this.param.faultMsg || ""}</div>
                {this.renderBaseSection()}
                {this.renderDetailSection()}
                {this.status == ZERO ? this.renderDealResultSection() : null}
                {this.status == ZERO ? <div className="fualt-save-wrapper">
                    <div className="fualt-save" onClick={(e) => this.onSaveHandler(e)}>
                        保存
                    </div>
                </div> : null}
            </div>
        );
    }
    /**
     * 渲染
     */
    render() {
        let { list } = this.state;
        return (
            <Page>
                <Header title="故障处理反馈" isShowBack={true} />
                {Base.isEmptyObject(list) ? <NoMessage msg="暂无信息" /> : this.renderContentSection()}
            </Page>
        )
    }

    /**
     * 加载完成
     */
    componentDidMount() {
        this.props.fetchData(this.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({ list: nextProps.list, isSolve: FIRST });
        }
    }

}

let mapStateToProps = state => {
    return ({
        isFetching: state.faultDetail.isFetching,
        list: state.faultDetail.list
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FaultDetail)