import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'

import { getMyFeedbackDetail } from './reducer/action'

import './index.scss'

class MyFeedbackDetail extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getMyFeedbackDetail(this.props.params.id)
    }

    render(){
        return (
            <Page className="myFeedback-detail">
                <Header title="故障反馈详情" isShowBack={true} />

                <div className="name-div">
                    <span>电站名称</span>
                    <div className="no-wrap">江苏省镇江市2.12MW分布式12MW分布式光伏电站12MW分布式光伏电站光伏电站</div>
                </div>

                <div className="item-div div-top">
                    <span>提交方式</span>
                    <span>报警提交</span>
                </div>

                <div className="item-div">
                    <span>故障状态</span>
                    <span>已解决</span>
                </div>

                <div className="name-div">
                    <span>设备类型</span>
                    <div>逆变器</div>
                </div>
                <div className="name-div">
                    <span>故障等级</span>
                    <div>I级故障</div>
                </div>
                <div className="info-div">
                    <span>故障信息</span>
                    <div>
                        逆变器电压过高 100.22
                    </div>
                </div>

                <div className="info-div div-top">
                    <span>说明</span>
                    <div>
                        故障描述故障描述故障描述故障描述故障描述故障描述故障描述
                    </div>
                </div>
                <div className="images-div div-top">
                    <span>附件</span>
                    <div className="images-list">
                        <ul>
                            <div className="images-item"></div>
                            <div className="images-item"></div>
                            <div className="images-item"></div>
                            <div className="images-item"></div>
                            <div className="images-item"></div>
                            <div className="images-item"></div>
                            <div className="images-item"></div>
                        </ul>
                    </div>
                </div>
            </Page>
        )
    }
}

let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMyFeedbackDetail }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFeedbackDetail);