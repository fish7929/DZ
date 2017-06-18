import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import RealTimeAlarmItem from '../../component/realTimeAlarmItem'

class RealTimeAlarm extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    getRealTimeAlarmItems(){
        return this.props.data.map((obj, index)=>(
            <RealTimeAlarmItem key={index} data={obj} />
        ))
    }

    componentDidMount(){

    }

    render(){
        return(
            <Page className="realTime-alarm-container">
                <Header title="实时报警" isShowBack={true} />
                <div className="tab-div">
                    <li><div>全部</div></li>
                    <li><div>已提交</div></li>
                    <li><div>未提交</div></li>
                </div>
                <div className="realTime-alarm-list">{this.getRealTimeAlarmItems()}</div>
            </Page>
        )
    }
}

export default RealTimeAlarm