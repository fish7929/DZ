import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'

import AlarmHomeItem from '../../../component/alarmHomeItem'
import HomePowerItem from '../../../component/homePowerItem'
import ChartItem from '../../../component/chartItem'
import Notice from '../../../component/notice'

import { getHomeData } from "../reducer/action"

import * as RouterConst from '../../../static/const/routerConst'
import * as Api from '../../../static/const/apiConst'
import * as HomeConst from '../reducer/const'

import WeiXinUtils from '../../../utils/WeiXinUtils'
import * as utils from '../../../utils'

import './index.scss'
const MaxPS = 4
class HomeContianer extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isShow: false,
        }
    }

    componentDidMount() {
        this.props.getHomeData()
    }

    onTabHandler(link){
        if(link){
            hashHistory.push(link)
        }else{
            if(window.cordova){
                // alert("window.cordova.plugins.spacekplugin.richscan")
                window.cordova.plugins.spacekplugin.richscan("10", data=>{
                    // alert("扫一扫成功"+data);
                    if(data.indexOf("http") === 0){
                        window.location.href = data;
                    }else{
                        AppModal.toast(data);
                    }
                }, ()=>{
                    AppModal.toast('扫一扫失败');
                })
            }else{
                WeiXinUtils.scanQRCode().then(data=>{
                    if(data.indexOf("http") === 0){
                        window.location.href = data;
                    }else{
                        AppModal.toast(data);
                    }
                }, ()=>{
                    AppModal.toast('微信未授权');
                })
            }
        }
    }

    getHomeTabs(){
        return HomeConst.HOME_BTN_TABS.map((obj, index) => (
            <div className="btn-tab-item button" key={index} onClick={()=>this.onTabHandler(obj.link)}>
                <div className={obj.icon}></div>
                <div className="tab-title">{obj.title}</div>
            </div>
        ))
    }

    onAlarmClickHandler(id, alarmId){
        let url = Api.ChangeMessageStatusById(id);
        utils.fetchUtils(url).then((res) => {
            console.log('更新消息状态',  res);
            // if(res && res.data){
                hashHistory.push(RouterConst.ROUTER_ALARM_DETAIL + "/" + alarmId)
            // }
        }).catch((e) => console.log(e));
    }

    getAlarmItem(){
        let { alarmList } = this.props
        return alarmList.map((obj, index) => <AlarmHomeItem onClick={()=>this.onAlarmClickHandler(obj.id, obj.messageId)} data={obj} key={index} />)
    }

    render() {
        let { alarmCount, workOrderCompletionList, psList, noticeList, prList, fbList, fdList } = this.props

        return (
            <div className="home-container">
                <div className="btn-tabs">{this.getHomeTabs()}</div>
                <Notice data={noticeList} />
                <div className="home-alarm-content">
                    <div className="home-list-title-div">
                        <span></span>报警消息
                    </div>
                    <div className="home-alarm-list">{this.getAlarmItem()}</div>
                    {
                        alarmCount > 0 ? 
                            <div className="btn-alarm-more" onClick={()=>hashHistory.push(RouterConst.ROUTER_MESSAGE_ALARM)}>查看{alarmCount}条未读消息</div> 
                        : 
                            <div className="btn-alarm-more">没有未读消息</div> 
                    }
                </div>
                <div className="home-monitor-content">
                    <div className="home-list-title-div">
                        <span></span>电站监控
                    </div>
                    <div ref="flipList" className="home-monitor-list">
                        { psList.map((obj, key) => {
                            if(this.state.isShow == false && key >= MaxPS){
                                return ""
                            }else{
                                return <HomePowerItem key={key} data={obj} onClick={()=>hashHistory.push(RouterConst.ROUTER_POWER_STATION_MONITOR_DETAIL + "/" + obj.id)} />
                            }
                        })}
                    </div>
                    { psList.length > MaxPS ? 
                        this.state.isShow == false ? 
                            <button className="btn-monitor-more" onClick={()=>this.setState({isShow: true})}>展开</button> 
                            :  
                            <button className="btn-monitor-more" onClick={()=>this.setState({isShow: false})}>收起</button> 
                        : "" }
                </div>

                <div className="home-rp-content">
                    <div className="home-list-title-div">
                        <span></span>PR值监控
                    </div>
                    <div className="rp-echart-div">
                        <ChartItem data={prList} type="bar" unitY="%" />
                    </div>
                </div>

                <div className="home-alarm-fb-content">
                    <div className="home-list-title-div">
                        <span></span>报警分布
                    </div>
                    <div className="alarm-fb-echart-div">
                        <ChartItem data={fbList} type="pie" unitY="%" />
                    </div>
                </div>

                <div className="home-order-content">
                    <div className="home-list-title-div">
                        <span></span>7天工单完成量
                    </div>
                    <div className="work-order-echart-div">
                        <ChartItem data={workOrderCompletionList} type="line" toolTip={true} />
                    </div>
                </div>

                <div className="home-fd-content">
                    <div className="home-list-title-div">
                        <span></span>电站发电情况
                    </div>
                    <div className="fd-echart-div">
                        <ChartItem data={fdList} type="doubleBar" legend={["容量/kWp", "日发电量/kWh"]} barColors={["#F47D3A", "#E2B64A"]} />
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    noticeList: state.homeData.noticeList,
    alarmList: state.homeData.alarmList,
    alarmCount: state.homeData.alarmCount,
    psList: state.homeData.psList,
    workOrderCompletionList: state.homeData.workOrderCompletionList,
    prList: state.homeData.prList,
    fbList: state.homeData.fbList,
    fdList: state.homeData.fdList,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getHomeData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContianer);
