/** 
 * @component index.js
 * @description description
 * @time  createTime
 * @author zhao
 */

import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'

import { getInverterDetail } from './reducer/action'

import './index.scss'

class InverterDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getInverterDetail(this.props.params.id)
    }

    getTds(data){
        return data.map((obj, key)=>{
            return (
                <div className="table-tr" key={key}>
                    <div className="table-td">{obj.key}</div>
                    <div className="table-td"><span>{obj.value}</span></div>
                </div>
            )
        })
    }

    render(){
        let { data } = this.props 
        return(
            <Page className="inverter-detail-container">
                <Header title="逆变器详情" isShowBack={true} />
                <div className="header-div"><span>逆变器编号</span><span>SW001</span></div>
                <div className="alarm-div">
                    <div className="alarm-title">报警数量</div>
                    <div className="alarm-list">
                        <div className="alarm-item">
                            <div className="alarm-icon alarm_1"></div>
                            <div className="alarm-count">{data.level1}</div>
                            <div className="alarm-level">Ⅰ级报警</div>
                        </div>
                        <div className="alarm-item">
                            <div className="alarm-icon alarm_2"></div>
                            <div className="alarm-count">{data.level2}</div>
                            <div className="alarm-level">Ⅱ级报警</div>
                        </div>
                        <div className="alarm-item">
                            <div className="alarm-icon alarm_3"></div>
                            <div className="alarm-count">{data.level2}</div>
                            <div className="alarm-level">Ⅲ级报警</div>
                        </div>
                    </div>
                </div>
                <div className="temperature-div">
                    <div className="temperature-title">逆变器功率-温度曲线</div>
                    <div className="echart-div">

                    </div>
                </div>
                <div className="table-div">
                    <div className="table-header">发电量</div>
                    <div className="info-div">
                        <div className="info-left">
                            <span className="big-txt">{data.generationDaily}Kw/h</span>
                            <span className="normal-txt">当日发电量</span>
                        </div>
                        <div className="info-right">
                            <div className="right-item">
                                <span className="txt-1">当月发电量</span>
                                <span className="txt-2">{data.generationMonth}Kw/h</span>
                            </div>
                            <div className="right-item">
                                <span className="txt-1">累计发电量</span>
                                <span className="txt-2">{data.generationGross}Kw/h</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-div">
                    <div className="table-header">交流参数</div>
                    <div className="table-info">
                        {this.getTds(data.phaseVoltageParam)}
                    </div>
                </div>
                <div className="table-div">
                    <div className="table-header">直流参数</div>
                    <div className="table-info">
                        {this.getTds(data.mppt)}
                    </div>
                </div>
            </Page>
        )
    }
}

InverterDetail.PropTypes = {
    data: PropTypes.object.isRequired
}

let mapStateToProps = state => ({
    data: state.inverterDetailReducer.data
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getInverterDetail }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InverterDetail)