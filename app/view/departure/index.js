/**
 * @component index.js
 * @description 离场申请
 * @time 2017-06-22 21:50
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
import { hashHistory } from 'react-router';
import './index.scss'

import { ZERO, FIRST } from '../../static/const/constants';
import * as utils from '../../utils'
import * as Api from '../../static/const/apiConst';

class Departure extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.order = this.props.params && this.props.params.order;  //工单号
        // this.order = parseInt(order);
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
        param.attachmentList = upload.photos;
        console.log(param, 'tijiao');
        AppModal.loading();
        let url = Api.SaveDeparture();
        utils.fetchUtils(url, param, "POST").then((res) => {
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
     * 渲染内容
     */
    renderContentSection() {
        let { list } = this.state; //结果不是数组
        let component = null;
        let departureExamine = list.departureExamine;
        let conclusion = list.conclusion;
        console.log(departureExamine, 899, list);
        let attachmentList = list.attachmentList;  //附近 后续需要修改
        return (<div className="margin-top-20">
            <div className="common-divide">检查项目</div>
            {departureExamine.map((examine, num) => {
                let isQualified = examine.isQualified;
                let lastClass = num == (departureExamine.length - 1) ? 'examine-item-last' : ''
                let checkedClass1 = isQualified == FIRST ? "checked-input-radio" : '';
                let checkedClass2 = (isQualified == ZERO || !isQualified) ? "checked-input-radio" : '';
                return (<div className={"examine-item " + lastClass} key={num}>
                    <div className="examine-item-title">{(num + 1) + "." + examine.examineName}</div>
                    <span>
                        {this.status == 0 ? <input type="radio" id={examine.examineId + ' ' + FIRST} name={examine.examineId} checked={isQualified == FIRST}
                            onChange={(e) => this.changeQualiHandler(e, examine.examineId, FIRST)} className={checkedClass1} />
                            : <input type="radio" id={examine.examineId + ' ' + FIRST} name={examine.examineId} checked={isQualified == FIRST} disabled className={checkedClass1} />}
                        <label htmlFor={examine.examineId + ' ' + FIRST}>合格</label>
                    </span>
                    <span>
                        {this.status == 0 ? <input type="radio" className={checkedClass2} id={examine.examineId + ' ' + ZERO} name={examine.examineId} checked={isQualified == ZERO || !isQualified}
                            onChange={(e) => this.changeQualiHandler(e, examine.examineId, ZERO)} />
                            : <input type="radio" id={examine.examineId + ' ' + ZERO} className={checkedClass2} name={examine.examineId} checked={isQualified == ZERO || !isQualified} disabled />}
                        <label htmlFor={examine.examineId + ' ' + ZERO}>不合格就地解决</label>
                    </span>
                </div>)
            })}
            <UploadComponent ref="uploadComponent" type={this.status} photos={attachmentList}
                explain={conclusion} explainHint="检查结论" uploadModule='departure'/>
            {this.status == 0 ? <div className="examine-save-wrapper"><div className="examine-save" onClick={(e) => this.onSaveHandler(e)}>保存</div></div> : null}
        </div>)
    }
    /**
     * 渲染
     */
    render() {
        let { list } = this.state;
        return (
            <Page className="third-contact-container">
                <Header title="离场申请" isShowBack={true} />
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
            this.setState({ list: nextProps.list });
        }
    }

}

let mapStateToProps = state => {
    return ({
        isFetching: state.departureData.isFetching,
        list: state.departureData.list
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Departure)