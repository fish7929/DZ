import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import ChartItem from '../../component/chartItem'

import { getPSMDetail } from './reducer/action'

import * as RouterConst from '../../static/const/routerConst'

import './index.scss'

class PowerStationMonitorDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        let id = this.props.params.id
        this.props.getPSMDetail(id)
    }

    render(){
        let { data } = this.props
        console.log(data)
        return (
            <Page className="psm-detail-container">
                <Header title="电站详情" isShowBack={true} />
                <div className="psm-detail-content">
                    <div className="title-div">{ data.name }</div>
                    <div className="power-info-div">
                        <div className="titleTxt">实时数据</div>
                        <div className="desc-txt"><span className="txt1">总功率</span><span className="txt2">{data.generatedActivePower}KW</span></div>
                        <div className="info-div">
                            <div className="info-table">
                                <div className="table-td">
                                    <div className="table-item">
                                        <span className="title-txt">气温</span>
                                        <span className="info-txt">{data.temperature}℃</span>
                                    </div>
                                    <div className="table-item-line"></div>
                                    <div className="table-item">
                                        <span className="title-txt">辐照度</span>
                                        <span className="info-txt">{data.irradiance}W/m2</span>
                                    </div>
                                    <div className="table-item-line"></div>
                                    <div className="table-item">
                                        <span className="title-txt">风速</span>
                                        <span className="info-txt">{data.windSpeed.toFixed(2)}m/s</span>
                                    </div>
                                </div>
                                <div className="table-td">
                                    <div className="table-item">
                                        <span className="title-txt">PR值</span>
                                        <span className="info-txt yellow">{data.pr}</span>
                                    </div>
                                    <div className="table-item">
                                        <span className="title-txt">停机</span>
                                        <span className="info-txt yellow">{data.stop}台</span>
                                    </div>
                                    <div className="table-item">
                                        <span className="title-txt">通讯异常</span>
                                        <span className="info-txt yellow">{data.communicationAnomaly}台</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="electricity-div">
                        <div className="electricity-title">当月发电量</div>
                        <div className="echart-electricity">
                            <ChartItem type="bar" data={data.generationDailyList} unitY="kWh" barColors={["#FFB089", "#FE5A0B"]} barBgColor="rgba(254,91,13, 0.1)" />
                        </div>
                    </div>
                    <div className="day-power-div">
                        <div className="day-power-title">日功率曲线</div>
                        <div className="echart-day-power">
                            <ChartItem type="line" data={data.powerTime} unitY="Kw" lineColor="#D76662" shadowColor="#D76561" />
                        </div>
                    </div>

                    <button className="psmD-btn" onClick={()=>hashHistory.push(RouterConst.ROUTER_INVERTER_LIST +"/"+data.id)}>逆变器<span className="arrow-right"></span></button>
                    <button className="psmD-btn" onClick={()=>hashHistory.push(RouterConst.ROUTER_AMMETER_LIST +"/"+data.id)}>电表<span className="arrow-right"></span></button>
                </div>
            </Page>
        )
    }
}

PowerStationMonitorDetail.PropTypes = {
    data: PropTypes.object.isRequired
}

let mapStateToProps = state => ({
    data: state.psmDetailReducer.powerData
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPSMDetail }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerStationMonitorDetail)