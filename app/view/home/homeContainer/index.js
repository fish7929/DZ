import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'

import AlarmHomeItem from '../../../component/alarmHomeItem'
import HomePowerItem from '../../../component/homePowerItem'
import ChartItem from '../../../component/chartItem'

import { getHomeData } from "../reducer/action"

import * as RouterConst from '../../../static/const/routerConst'
import * as HomeConst from '../reducer/const'

import './index.scss'

class HomeContianer extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.props.getHomeData()
    }

    onTabHandler(link){
        hashHistory.push(link)
    }

    getHomeTabs(){
        return HomeConst.HOME_BTN_TABS.map((obj, index) => (
            <div className="btn-tab-item button" key={index} onClick={()=>this.onTabHandler(obj.link)}>
                <div className={obj.icon}></div>
                <div className="tab-title">{obj.title}</div>
            </div>
        ))
    }

    getAlarmItem(){
        let { alarmList } = this.props
        return alarmList.map((obj, index) => <AlarmHomeItem onClick={()=>hashHistory.push(RouterConst.ROUTER_ALARM_DETAIL + "/" + obj.id)} data={obj} key={index} />)
    }

    render() {
        let { alarmCount, workOrderCompletionList } = this.props

        return (
            <div className="home-container">
                <div className="btn-tabs">{this.getHomeTabs()}</div>
                <div className="home-notice-div">
                    <div className="notice-title-div">
                        <span className="icon-notice"></span>
                        <span className="title-notice">公告</span>
                    </div>
                    <div className="notice-message no-wrap">与能者写奥斯卡的敬爱考虑时间阿斯兰的空间案例</div>
                </div>
                <div className="home-alarm-content">
                    <div className="home-list-title-div">
                        <span></span>报警消息
                    </div>
                    <div className="home-alarm-list">{this.getAlarmItem()}</div>
                    {
                        alarmCount > 0 ? 
                            <button className="btn-alarm-more" onClick={()=>hashHistory.push(RouterConst.ROUTER_MESSAGE_ALARM)}>查看{alarmCount}条未读消息</button> 
                        : 
                            <div className="btn-alarm-more">没有未读消息</div> 
                    }
                </div>
                <div className="home-monitor-content">
                    <div className="home-list-title-div">
                        <span></span>电站监控
                    </div>
                    <div className="home-monitor-list">
                        <HomePowerItem data={{}} />
                        <HomePowerItem data={{}} />
                        <HomePowerItem data={{}} />
                    </div>
                    <button className="btn-monitor-more">展开</button>
                </div>

                <div className="home-rp-content">
                    <div className="home-list-title-div">
                        <span></span>PR值监控
                    </div>
                    <div className="rp-echart-div">

                    </div>
                </div>

                <div className="home-alarm-fb-content">
                    <div className="home-list-title-div">
                        <span></span>报警分布
                    </div>
                    <div className="echart-div"></div>
                </div>

                <div className="home-order-content">
                    <div className="home-list-title-div">
                        <span></span>7天工单完成量
                    </div>
                    <div className="work-order-echart-div">
                        <ChartItem data={workOrderCompletionList} />
                    </div>
                </div>

                <div className="home-fd-content">
                    <div className="home-list-title-div">
                        <span></span>电站发电情况
                    </div>
                    <div className="echart-div"></div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    alarmList: state.homeData.alarmList,
    alarmCount: state.homeData.alarmCount,
    workOrderCompletionList: state.homeData.workOrderCompletionList
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getHomeData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContianer);
