import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import AlarmItem from '../../component/realTimeAlarmItem'
import AlarmHistoryItem from '../../component/alarmHistoryItem'
import FlipListComponent from '../../component/flipListComponent'

import { getAlarmList } from './reducer/action'

import './index.scss'

class AlarmDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        let id = this.props.params.id
        this.props.getAlarmList(id)
    }

    render(){
        let { alarmData } = this.props
        return(
            <Page className="alarm-detail-container">
                <Header title="报警详情" isShowBack={true} />
                <AlarmItem data={alarmData} />
                <div className="power-site-div">
                    <p className="power-title">电站位置</p>
                    <p className="power-name">{alarmData.powerStationBaseInfo.name}</p>
                    <div className="power-map-div"></div>
                </div>
                <div className="power-history-div">
                    <FlipListComponent title="本设备近3个月报警历史">
                        <AlarmHistoryItem data={{}} />
                        <AlarmHistoryItem data={{}} />
                        <AlarmHistoryItem data={{}} />
                        <AlarmHistoryItem data={{}} />
                        <div className="power-no-history">该设备近3个月没有报警记录</div>
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
                    </div><button ></button>
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