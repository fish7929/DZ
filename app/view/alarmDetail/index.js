import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import AlarmItem from '../../component/realTimeAlarmItem'
import AlarmHistoryItem from '../../component/alarmHistoryItem'
import FlipListComponent from '../../component/flipListComponent'
import UploadComponent from '../../component/uploadComponent'

import { getAlarmList, pushAlarmInfo } from './reducer/action'

import * as Api from '../../static/const/apiConst'
import * as utils from '../../utils'

import './index.scss'

class AlarmDetail extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            mapIsReady: false
        }
    }

    componentDidMount(){
        let id = this.props.params.id
        this.props.getAlarmList(id)
        utils.getCurrentPosition().then((r)=>{
            this.map = new BMap.Map("allMap")
            let p = new BMap.Point(r.point.lng, r.point.lat)
            this.map.centerAndZoom(p, 15);
            this.setState({mapIsReady: true})
        })
    }

    componentWillUnmount(){
        this.map = null;
    }

    getHistoryItems(){
        let { alarmData } = this.props
        if(alarmData.alarmInfoList.length == 0){
            return (<div className="power-no-history">该设备近3个月没有报警记录</div>)
        }

        return alarmData.alarmInfoList.map((obj, key) => <AlarmHistoryItem key={key} data={obj} />)
    }

    onClickHandler(){
        let { alarmData } = this.props

        if(alarmData.id){
            let uploadComponent = this.refs.dealUploadComponent;
            let uploadObj = uploadComponent.getUploadContent();

            let opt = {
                id: alarmData.id,
                status: 1,
                state: uploadObj.explain,
                attachmentList: uploadObj.photos
            }
            this.props.pushAlarmInfo(opt).then(()=>{
                AppModal.alert("保存成功！", "", ()=>hashHistory.goBack())
            }, ()=>{
                AppModal.alert("保存失败！", "")
            })
        }
    }

    render(){
        let { alarmData } = this.props
        if(alarmData.powerStationBaseInfo.lat && alarmData.powerStationBaseInfo.lng && this.state.mapIsReady){
            this.map.clearOverlays()
            let point = new BMap.Point(alarmData.powerStationBaseInfo.lng, alarmData.powerStationBaseInfo.lat);
            var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                offset: new BMap.Size(10, 25),
                imageOffset: new BMap.Size(0, 0 - 0 * 25)
            });
            let marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
            this.map.addOverlay(marker);              // 将标注添加到地图中
            this.map.disableDragging();
            this.map.disableScrollWheelZoom();
            this.map.disableDoubleClickZoom();
            this.map.disablePinchToZoom();
        }
        let _disabled = alarmData.status == 0 ? 0 : 1
        return(
            <Page className="alarm-detail-container">
                <Header title="报警详情" isShowBack={true} />
                <AlarmItem data={alarmData} type="detail" />
                <div className="power-site-div">
                    <p className="power-title">电站位置</p>
                    <p className="power-name">{alarmData.powerStationBaseInfo.address}</p>
                    <div id="allMap" className="power-map-div"></div>
                </div>
                <div className="power-history-div">
                    <FlipListComponent title="本设备近3个月报警历史">
                        {this.getHistoryItems()}
                    </FlipListComponent>
                </div>
                
                <div className="explain-div">
                    <UploadComponent ref="dealUploadComponent" type={_disabled} uploadModule="alarmDetail" photos={alarmData.attachmentList} explain={alarmData.description || ""} />
                </div>
                {_disabled == 0 ? <button className="btn-commit" onClick={()=>this.onClickHandler()}>提交</button> : ""}
            </Page>
        )
    }
}

AlarmDetail.PropTypes = {
    alarmData: PropTypes.object.isRequired,
}

let mapStateToProps = state => ({
    alarmData: state.alarmDetailRducer.alarmData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAlarmList, pushAlarmInfo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmDetail)