import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'

class PowerStationMonitorDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        return (
            <Page className="psm-detail-container">
                <Header title="电站详情" isShowBack={true} />
                <div className="psm-detail-content">
                    <div className="title-div">江苏省镇江市恒顺醋业2.12MW分布式光伏电站</div>
                    <div className="power-info-div">
                        <div className="titleTxt">实时数据</div>
                        <div className="desc-txt"><span className="txt1">总功率</span><span className="txt2">800.22KW</span></div>
                        <div className="info-div">
                            <div className="info-table">
                                <div className="table-td">
                                    <div className="table-item">
                                        <span className="title-txt">气温</span>
                                        <span className="info-txt">25.4℃</span>
                                    </div>
                                    <div className="table-item-line"></div>
                                    <div className="table-item">
                                        <span className="title-txt">辐照度</span>
                                        <span className="info-txt">200W/m2</span>
                                    </div>
                                    <div className="table-item-line"></div>
                                    <div className="table-item">
                                        <span className="title-txt">风速</span>
                                        <span className="info-txt">3m/s</span>
                                    </div>
                                </div>
                                <div className="table-td">
                                    <div className="table-item">
                                        <span className="title-txt">PR值</span>
                                        <span className="info-txt yellow">33</span>
                                    </div>
                                    <div className="table-item">
                                        <span className="title-txt">停机</span>
                                        <span className="info-txt yellow">5台</span>
                                    </div>
                                    <div className="table-item">
                                        <span className="title-txt">通讯异常</span>
                                        <span className="info-txt yellow">3台</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="electricity-div">
                        <div className="electricity-title">当月发电量</div>
                        <div className="echart-div">

                        </div>
                    </div>
                    <div className="day-power-div">
                        <div className="day-power-title">日功率曲线</div>
                        <div className="echart-div">
                            
                        </div>
                    </div>

                    <button className="psmD-btn">逆变器<span className="arrow-right"></span></button>

                    <button className="psmD-btn">电表<span className="arrow-right"></span></button>
                </div>
            </Page>
        )
    }
}

PowerStationMonitorDetail.PropTypes = {

}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerStationMonitorDetail)