import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import UploadComponent from '../../component/uploadComponent'

import { getMyFeedbackDetail } from './reducer/action'

import './index.scss'

class MyFeedbackDetail extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getMyFeedbackDetail(this.props.params.id)
    }

    getFaultState(val){
        switch (val) {
            case "0":
                return "未分配"
            case "1":
                return "已分配"
            case "2":
                return "已解决"
            case "3":
                return "未解决"
            default:
                return "未知"
        }
    }

    render(){
        let {powerStationName, faultSource, faultStatus, faultGrade, equipmentType, faultMessage, state, attachmentList} = this.props
        console.log(faultMessage)
        return (
            <Page className="myFeedback-detail">
                <Header title="故障反馈详情" isShowBack={true} />

                <div className="name-div">
                    <span>电站名称</span>
                    <div className="no-wrap powerStationName">{powerStationName}</div>
                </div>

                <div className="item-div div-top">
                    <span>提交方式</span>
                    <span>{faultSource == 1 ? "报警提交" : "现场提交"}</span>
                </div>

                <div className="item-div">
                    <span>故障状态</span>
                    <span>{this.getFaultState(faultStatus)}</span>
                </div>

                <div className="name-div">
                    <span>设备类型</span>
                    <div>{equipmentType}</div>
                </div>
                <div className="name-div">
                    <span>故障等级</span>
                    <div>{faultGrade == 1 ? "I" : faultGrade == 2 ? "II" : "III"}级故障</div>
                </div>
                <div className="info-div">
                    <span>故障信息</span>
                    <div>
                        {faultMessage}
                    </div>
                </div>
                <UploadComponent type={1} uploadModule="feedbackDetail" photos={attachmentList || []} explain={state || ""} />
            </Page>
        )
    }
}

let mapStateToProps = state => ({
    powerStationName: state.myFeedbackDetailReducer.powerStationName,
    faultSource: state.myFeedbackDetailReducer.powerStationName,
    faultStatus: state.myFeedbackDetailReducer.powerStationName,
    faultGrade: state.myFeedbackDetailReducer.powerStationName,
    equipmentType: state.myFeedbackDetailReducer.powerStationName,
    faultMessage: state.myFeedbackDetailReducer.powerStationName,
    state: state.myFeedbackDetailReducer.powerStationName,
    attachmentList: state.myFeedbackDetailReducer.powerStationName,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMyFeedbackDetail }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFeedbackDetail);