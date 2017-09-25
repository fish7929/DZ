import React, {} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import ButtonIOS from '../../component/button/buttonSwitchIOS'

import { getMyMessageStatus, changeMyMessageStatus } from './reducer/action'

import './index.scss'


class MyMessageSet extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getMyMessageStatus()
    }

    onItemChange(e, type){
        let value = e ? 1 : 0
        this.props.changeMyMessageStatus(type, value)
    }

    render(){

        let { letter, system, threeAlarm, twoAlarm } = this.props
        console.log(letter, system, threeAlarm, twoAlarm)
        return(
            <Page className="my-message-set-container">
                <Header title="推送消息" isShowBack={true} />
                <div className="main-content">
                    <div className="btn-item">
                        <span>II级报警消息推送</span>
                        <ButtonIOS checked={twoAlarm === 1 ? true : false} onChangeHandler={(e)=>this.onItemChange(e, 'twoAlarm')} />
                    </div>
                    <div className="btn-item">
                        <span>III级报警消息推送</span>
                        <ButtonIOS checked={threeAlarm === 1 ? true : false} onChangeHandler={(e)=>this.onItemChange(e, 'threeAlarm')} />
                    </div>
                    <div className="btn-item">
                        <span>站内消息推送</span>
                        <ButtonIOS checked={letter === 1 ? true : false} onChangeHandler={(e)=>this.onItemChange(e, 'letter')} />
                    </div>
                    <div className="btn-item">
                        <span>系统消息推送</span>
                        <ButtonIOS checked={system === 1 ? true : false} onChangeHandler={(e)=>this.onItemChange(e, 'system')} />
                    </div>
                </div>
            </Page>
        )
    }
}

let mapStateToProps = state => ({
    letter: state.myMessageReducer.letter,
    system: state.myMessageReducer.system,
    threeAlarm: state.myMessageReducer.threeAlarm,
    twoAlarm: state.myMessageReducer.twoAlarm,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMyMessageStatus, changeMyMessageStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMessageSet);