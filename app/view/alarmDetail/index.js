import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import AlarmItem from '../../component/realTimeAlarmItem'
import AlarmHistoryItem from '../../component/alarmHistoryItem'
import FlipListComponent from '../../component/flipListComponent'

import { getAlarmList } from './reducer/action'

import * as Api from '../../static/const/apiConst'

import './index.scss'

class AlarmDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        let id = this.props.params.id
        this.props.getAlarmList(id)
        this.map = new BMap.Map("allMap")
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

    render(){
        let { alarmData } = this.props
        if(alarmData.powerStationBaseInfo.lat && alarmData.powerStationBaseInfo.lng && this.map){
            let point = new BMap.Point(alarmData.powerStationBaseInfo.lat, alarmData.powerStationBaseInfo.lng);
            var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                offset: new BMap.Size(10, 25),
                imageOffset: new BMap.Size(0, 0 - 0 * 25)
            });
            let marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
	        this.map.addOverlay(marker);              // 将标注添加到地图中
            this.map.centerAndZoom(point, 15);
        }
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
                    <div className="explain-title">说明</div>
                    <textarea className="explain-textarea" placeholder="请输入说明（可不填）" />
                </div>

                <div className="media-div">
                    <div className="media-title-div">上传附件<span className="media-desc">视频拍摄长度小于30秒</span></div>
                    <div className="media-content-div">
                        <div className="btn-media-result"></div>
                        <button className="btn-media"><span></span></button>
                    </div>
                </div>

                <button className="btn-commit">提交</button>
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
    return bindActionCreators({ getAlarmList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmDetail)