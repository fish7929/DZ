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
import * as utils from '../../utils'
import * as Api from '../../static/const/apiConst';
import './index.scss'
import { hashHistory } from 'react-router';
import { ZERO, FIRST, SECOND, THREE } from '../../static/const/constants';

class FaultDetail extends React.Component {

    constructor(props, context) {
        super(props, context)
        let id = this.props.params && this.props.params.id;  //故障ID
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
        console.log(SECOND, 899);
        this.state = {
            list: this.props.list,
            solveResult: SECOND
        }
    }
    selectDealResultHandler(e, solveResult){
        // e.preventDefault();
        // e.stopPropagation();
        this.setState({solveResult});
    }
    /**
     * 提交离场申请保存.
     * @param {object} e 事件对象
     */
    onSaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { list ,solveResult } = this.state;
        if(solveResult == null){
            AppModal.toast("请选择处理结果");
            return;
        }
        let uploadComponent = this.refs.dealUploadComponent;
        let upload = uploadComponent.getUploadContent();
        let opt = {
            faultId: this.id,
            solveId: list.solveId, //？？？？？是什么
            solveResult: solveResult
        }
        opt.solveInfo = upload.explain;
        opt.fileInfo = upload.photos;
        console.log(opt, 'save');
        /**
         * faultId
         * fileInfo		array<object>	
            filename	文件名称	string	
            filepath
         *solveId	处理故障id
         *solveInfo	处理说明
         *solveResult	处理结果	number	2-已解决 3-未解决
         */
        let url = Api.SaveFaultSolve();
        
        utils.fetchUtils(url, opt, "POST").then((res) => {
            AppModal.hide()
            if (res.data) {
                AppModal.toast('保存成功');
                setTimeout(() => {
                    AppModal.hide() 
                    hashHistory.goBack();
                }, 1000);
            }else{
                let msg = res.message || '保存失败';
                AppModal.toast(msg);
            }

        }).catch((e) => AppModal.hide());
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
    renderMineDealSection() {
        let { list } = this.state;
        let photos = list.solveList || [];
        let explain = list.solveInfo || '';
        let result = list.solveResult;
        let resultStr = result == FIRST ? "已解决" : '未解决';  //1 
        return (
            <div className="margin-bottom-20">
                <div className="common-divide">我的处理结果</div>
                <div className="common-order-item-hint">
                    处理结果
                    <span className="no-wrap">{resultStr}</span>
                </div>
                <UploadComponent type={FIRST} photos={photos} explain={explain} 
                ref="dealUploadComponent" uploadModule='faultdetail'/>
            </div>
        );
    }
    /**
     * 
     * @param {number } type 1 运维人员, 2调度人员
     */
    renderDealPersonnelSection(type) {
        let { list } = this.state;
        //运维人员, 相当创建人员
        let solveList = list.attachmentList || [];
        let solveTime = list.createTime;
        let solveName = list.createUsername;
        let solveInfo = list.faultMessage || '';
        //调度人员
        let dispatcherList = list.dispatcherList || [];
        let dispatcherTime = list.dispatcherTime;
        let dispatcherName = list.dispatcherName;
        let dispatcherInfo = list.dispatcherState || '';

        let name = type == FIRST ? solveName : dispatcherName;
        let nameHint = type == FIRST ? '运维人员' : '调度人员';
        let time = type == FIRST ? Base.formatTime(solveTime, "yyyy-MM-dd HH:mm") :
            Base.formatTime(dispatcherTime, "yyyy-MM-dd HH:mm");
        let timeHint = type == FIRST ? '运维时间' : '调度时间';

        let photos = type == FIRST ? solveList : dispatcherList;   //处理人员
        let explain = type == FIRST ? solveInfo : dispatcherInfo;   //处理人员
        //故障状态
        let faultStatus = list.faultStatus;
        let faultStatusStr = '未分配';  //0 的状态
        if(faultStatus == FIRST){
            faultStatusStr = '以分配';
        }else if(faultStatus == SECOND){
            faultStatusStr = '已解决';
        }else if(faultStatus == THREE){
            faultStatusStr = '未解决';
        }
        return (
            <div>
                {type == FIRST ? <div className="common-order-item-hint">
                    故障状态<span className="no-wrap">{faultStatusStr}</span>
                </div> : null}
                <div className="common-order-item-hint">
                    {nameHint}<span className="no-wrap">{name}</span>
                </div>
                <div className="common-order-item-hint">
                    {timeHint}
                    <span className="no-wrap">{time}</span>
                </div>
                <UploadComponent type={FIRST} photos={photos} explain={explain} 
                ref="dealUploadComponent" uploadModule='faultdetail' />
            </div>
        );
    }
    /**
     * 渲染故障详情
     */
    renderDetailSection() {
        return (
            <div>
                <div className="common-divide">故障详情</div>
                {this.renderDealPersonnelSection(FIRST)}
                {this.renderDealPersonnelSection(SECOND)}
            </div>
        );
    }
    /**
     * 渲染处理结果
     */
    renderDealResultSection() {
        let { list, solveResult } = this.state;
        let dispatcherList = list.solveList || [];
        let dispatcherInfo = list.solveInfo || '';
        console.log(solveResult, 8999);
        return (
            <div className="margin-top-20">
                <div className="common-divide deal-result">处理结果</div>
                <div className="deal-result-select">
                    <label htmlFor="dealResult1"><input type="radio" name="dealResult"
                        id="dealResult1" checked={solveResult == SECOND ? true : false} onChange={(e) => this.selectDealResultHandler(e, SECOND)} />
                        已解决
                    </label>
                    <label htmlFor="dealResult0"><input type="radio" name="dealResult"
                        id="dealResult0" checked={solveResult == THREE ? true : false} onChange={(e) => this.selectDealResultHandler(e, THREE)} />
                        未解决
                    </label>
                </div>
                <UploadComponent ref="dealUploadComponent" type={ZERO} photos={dispatcherList} explain={dispatcherInfo} />
            </div>
        );
    }

    renderContentSection() {
        let { list } = this.state;
        return (
            <div>
                <div className="fault-detail-name no-wrap">{this.param.faultMsg || ""}</div>
                {this.renderBaseSection()}
                {this.status == ZERO ? null : this.renderMineDealSection()}
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
                <div className="main-content">
                    {Base.isEmptyObject(list) ? <NoMessage msg="暂无信息" /> : this.renderContentSection()}
                </div>
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
            this.setState({ list: nextProps.list, solveResult: nextProps.list.solveResult });
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