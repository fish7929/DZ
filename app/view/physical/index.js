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
import { hashHistory } from 'react-router';
import './index.scss'
import * as utils from '../../utils'
import * as Api from '../../static/const/apiConst';
import { ZERO, FIRST } from '../../static/const/constants';

class Physical extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.order = this.props.params && this.props.params.order;  //工单号
        // this.order = parseInt(order);
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
            facilityList: [], //设备名称列表
            facilityTypes: [] //设备编号
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
        AppModal.loading();
        let orderId = this.param.orderId;
        let url = Api.CompletedPhysicalByOrder(orderId); //{'orderId': this.order}
        
        utils.fetchUtils(url, {'orderId': orderId}, "POST").then((res) => {
            AppModal.hide()
            if (res.data) {
                AppModal.toast('提交成功');
                setTimeout(() => {
                    AppModal.hide()
                    hashHistory.push('/home/1')
                }, 1000);
            }else{
                AppModal.toast('提交失败');
            }

        }).catch((e) => AppModal.hide());
    }
    /**
     * 提交离场申请保存.
     * @param {object} e 事件对象
     */
    onSaveHandler(param) {
        console.log(param, 'save');
        let oldList = this.state.list;
        //对应项目增加一条反馈
        let findItem = oldList.find((item, index) => item.examineId == param.examineId);
        AppModal.loading();
        let url = Api.SavePhysicalExamine();
        
        /**
         *  { "id": 1, 
         * "examineId": 1, 
         * "isSolve": 0, 
         * "explainInfo": " ", 
         * "workorderNum": "2017060816222", 
         * "fileInfo":[ { "filename":"1.txt", "filepath":"c:/upload" }, 
         * { "filename":"2.txt", "filepath":"d:/upload" } ] 
         * }
         */

         /**  /pvmtsys/faultInfo/insert
         * 	attachmentList	附件信息	array<object>	
    filename	文件名称	string	确认报警的时候上传 多个文件
    filepath	文件路径	string	
equipmentId	设备id	number	
equipmentNumber	设备编号	string	
equipmentType	设备类型	number	
faultGrade	故障级别	number	
faultMessage	故障原因	string	
powerStationId	电站id	number	
state  	说明	string
         */
        let opt = {
            id: findItem.id,
            workorderNum: findItem.workorderNum,
            examineId: findItem.examineId,
            isSolve: param.isSolve,
            explainInfo: param.explainInfo,
            fileInfo: param.attachmentList,
        };
        if(param.isSolve == 0){  
            let insetUrl = Api.insertFaultInfo();
            let insetOpt = {
                faultGrade: param.faultGrade,
                equipmentId: param.equipmentId,
                equipmentNumber: parseInt(param.equipmentNumber),
                equipmentType: param.equipmentType,
                faultMessage: param.faultMessage,
                state: param.explainInfo,
                attachmentList: param.attachmentList,
                powerStationId: this.param.powerstationId
            };
            utils.fetchUtils(insetUrl, insetOpt, "POST").then((res) => {
                if (res.data) {
                    console.log('添加故障成功');
                }else{
                    console.log('添加故障失败');
                }
            }).catch((e) => AppModal.hide());
        }
        utils.fetchUtils(url, opt, "POST").then((res) => {
            AppModal.hide()
            if (res.data) {
                let obj = {isSolve: param.isSolve, explainInfo: param.explainInfo, attachmentList: param.attachmentList};
                findItem.examineInfo.push(obj);
                console.log(obj, 88888);
                this.setState({
                    isAdd: false,
                    list: oldList
                });
            }else{
                AppModal.toast('保存失败');
            }

        }).catch((e) => AppModal.hide());
        
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
        let component = list.map((item, index) => {
            let checkupContent = item.checkupContent;
            checkupContent = checkupContent.split(/(?:\r\n|\r|\n)/);
            return (<div key={index} className="physical-examine-item">
                <div className="physical-examine-title">{item.examineId + "." + item.checkupName}</div>
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
        let component = list.map((item, index) => {
            let physical = item.examineInfo;  //反馈的数组
            return physical.map((explain, num) => {
                let isSolve = explain.isSolve;  //问题反馈类型， 0 不合格上报调度中心， 1 不合格就地解决
                let attachmentList = explain.attachmentList;  //todo
                let explainInfo = explain.explainInfo;
                let solve = isSolve == ZERO ? '不合格上报调度中心' : '不合格就地解决';
                return (<li key={index +'' +  num} className="physical-physical-item margin-top-20">
                    <div className="physical-physical-divide off">
                        {item.examineId + "." + item.checkupName}
                        <span onClick={(e) => this.toggleItemHandler(e)}></span>
                        <div className="physical-physical-hint" data-hint="问题反馈">{solve}</div>
                    </div>
                    <div className="physical-wrapper">
                        <UploadComponent ref="uploadComponent" type={1} photos={attachmentList}
                            explain={explainInfo} uploadModule='physical'/>
                    </div>
                </li>);
            })
        })
        return (
            <ul >
                {component}
            </ul>
        );
    }
    addFeedbackHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let old = this.state.isAdd;
        this.setState({ isAdd: !old });
    }
    /**
     * 渲染问题反馈内容
     */
    renderFeedbackSection() {
        let { list, isAdd, facilityList, facilityTypes } = this.state;
        //todo 筛选出剩下的
        let filter = list.map((item, index) => {
            let obj = {};
            obj.id = item.id;
            obj.examineId = item.examineId;
            obj.checkupName = item.checkupName;
            return obj;
        });
        return (
            isAdd ? <PhysicalFeedback physicalList={filter} stationName={this.param.stationName || ''}
                callBack={(param) => this.onSaveHandler(param)} facilityList={facilityList} 
                facilityTypes={facilityTypes} /> : null
        );
    }
    renderContentSection() {
        return (
            <div>
                {this.renderExamineSection()}
                {this.renderPhysicalSection()}
                {this.status == ZERO ? <div className="physical-feedback-wrapper">
                    <div className="physical-feedback" onClick={(e) => this.addFeedbackHandler(e)}>
                        添加问题反馈
                    </div>
                </div> : null}
                {this.renderFeedbackSection()}
                {this.status == ZERO ? <div className="physical-save"
                    onClick={(e) => this.onCompletedHandler(e)}>完成体检</div> : null}
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
        this.props.fetchData(this.order);
        console.log(this.param);
        let url = Api.GetFacilityList(this.param.powerstationId);
        console.log(url, 852);
        utils.fetchUtils(url).then((res) => {
            if (res.data) {
                this.setState({ facilityList: res.data });
            }
        }).catch((e) => console.log(e, 77777));

        let _url = Api.getEquipmentBy();
        utils.fetchUtils(_url, {powerStationId: this.param.powerstationId, equipmentType: 3}).then((res) => {
            if (res.data) {
                this.setState({ facilityTypes: res.data });
            }
        }).catch((e) => console.log(e, 77777));
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