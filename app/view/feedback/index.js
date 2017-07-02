/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'

import { getMyPowerStationList, getPowerStationDeviceTypes } from './reducer/action'

import './index.scss'

class Feedback extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state = {
            powerStationId: "",
            deviceTypeId: "",
            deviceCode: "",
            alarmLevel: 1,
            desc: ""
        }
    }

    componentDidMount(){
        this.setState({
            powerStationId: "",
            deviceTypeId: "",
            deviceCode: "",
            alarmLevel: 1,
            desc: ""
        })
        this.props.getMyPowerStationList()
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

    onUploadVideo(e){
        let file = e.target.files[0];
        if(file){
            
        }
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
                    <div className="textarea-div">
                        <div className="title-txt">说明</div>
                        <textarea placeholder="请输入说明（可不填）" value={desc} onChange={(e)=>this.onChangeHandler(e, "desc")} />
                    </div>
                    <div className="media-div">
                        <div className="media-title-div">上传附件<span className="media-desc">视频拍摄长度小于30秒</span></div>
                        <div className="media-content-div">
                            <div className="btn-media-result"></div>
                            <div className="btn-media">
                                <span></span>
                                <input className="inputFile" type="file" accept="video/*" onChange={(e)=>this.onUploadVideo(e)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="button-div">
                    <button>提交</button>
                    <button>提交并创建</button>
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
    return bindActionCreators({ getMyPowerStationList, getPowerStationDeviceTypes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);