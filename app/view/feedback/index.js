/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import UploadComponent from '../../component/uploadComponent'

import { getMyPowerStationList, getPowerStationDeviceTypes, pushFeedbackMessage } from './reducer/action'

import './index.scss'

class Feedback extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state = {
            powerStationId: "",
            deviceTypeId: "",
            deviceCode: "",
            alarmLevel: 1,
        }
    }

    componentDidMount(){
        this.reset()
        this.props.getMyPowerStationList()
    }

    reset(){
        let powerStationId = "", deviceTypeId=""
        if(this.props.powerStationList.length > 0){
            powerStationId = this.props.powerStationList[0].id
        }

        if(this.props.deveiceTypes.length > 0){
            deviceTypeId =  this.props.deveiceTypes[0].id
        }

        this.setState({
            powerStationId: powerStationId,
            deviceTypeId: deviceTypeId,
            deviceCode: "",
            alarmLevel: 1,
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.powerStationList.length != nextProps.powerStationList.length && this.state.powerStationId==""){
            this.setState({powerStationId: nextProps.powerStationList[0].id})
        }

        if(this.props.deveiceTypes.length != nextProps.deveiceTypes.length && this.state.deviceTypeId==""){
            this.setState({deviceTypeId: nextProps.deveiceTypes[0].id})
        }
    }

    onChangeHandler(e, type){
        let state = {}
        state[type] = e.target.value
        this.setState(state);       
    }

    onPushInfo(type){
        let { powerStationId, deviceTypeId, deviceCode, alarmLevel } = this.state
        if(deviceCode == ""){
            AppModal.toast('请输入设备编号');
            return
        }

        let uploadComponent = this.refs.dealUploadComponent;
        let uploadObj = uploadComponent.getUploadContent();

        let opt = {
            // equipmentId: 0,
            equipmentNumber: deviceCode,
            equipmentType: deviceTypeId,
            faultGrade: alarmLevel,
            faultMessage: uploadObj.explain,
            powerStationId: powerStationId,
            state: uploadObj.explain,
            attachmentList: uploadObj.photos
        }
        
        this.props.pushFeedbackMessage(opt).then((data)=>{
            if(data){
                AppModal.alert("提交成功！", "", ()=>{
                    if(type == 1){
                        this.reset()
                    }else{
                        hashHistory.goBack()
                    }
                })
            }else{
                AppModal.toast('提交失败！');
            }
        })
    }

    render(){
        let { powerStationId, deviceTypeId, deviceCode, alarmLevel, desc } = this.state
        let { powerStationList, deveiceTypes } = this.props

        return(
            <Page className="feedback-container">
                <Header title="故障反馈" isShowBack={true} />
                <div className="feedback-select-div name-div">
                    <span>电站名称</span>
                    <select onChange={(e)=>this.onChangeHandler(e, "powerStationId")} defaultValue={powerStationId} >
                        { powerStationList.map((obj, index) => <option key={index} value={obj.id}>{obj.name}</option>) }
                    </select>
                </div>

                <div className="feedback-select-div name-div">
                    <span>设备类型</span>
                    <select onChange={(e)=>this.onChangeHandler(e, "deviceTypeId")} defaultValue={deviceTypeId} >
                        { deveiceTypes.map((obj, index) => <option key={index} value={obj.id}>{obj.name}</option>) }
                    </select>
                </div>

                <div className="feedback-main">
                    <div className="feedback-item">
                        <span>设备编号</span>
                        <input type="text" placeholder="请输入设备编号" value={deviceCode} onChange={(e)=>this.onChangeHandler(e, "deviceCode")} />
                    </div>
                    <div className="feedback-item">
                        <span>故障级别</span>
                        <select onChange={(e)=>this.onChangeHandler(e, "alarmLevel")} defaultValue={alarmLevel} >
                            <option value="1">Ⅰ级报警</option>
                            <option value="2">Ⅱ级报警</option>
                            <option value="3">Ⅲ级报警</option>
                        </select>
                    </div>
                    <UploadComponent ref="dealUploadComponent" type={0} uploadModule="feedback" />
                </div>

                <div className="button-div">
                    <button onClick={()=>this.onPushInfo()}>提交</button>
                    <button onClick={()=>this.onPushInfo(1)}>提交并创建</button>
                </div>
            </Page>
        )
    }
}

let mapStateToProps = state => ({
    powerStationList: state.feedbackReducer.powerStations,
    deveiceTypes: state.feedbackReducer.deveiceTypes,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMyPowerStationList, getPowerStationDeviceTypes, pushFeedbackMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);