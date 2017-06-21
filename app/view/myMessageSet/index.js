import React, {} from 'react'

import Page from '../../component/page'
import Header from '../../component/header'
import ButtonIOS from '../../component/button/buttonSwitchIOS'

import './index.scss'


class MyMessageSet extends React.Component{

    render(){
        return(
            <Page className="my-message-set-container">
                <Header title="推送消息" isShowBack={true} />
                <div className="btn-item">
                    <span>II级报警消息推送</span>
                    <ButtonIOS checked={true}  />
                </div>
                <div className="btn-item">
                    <span>III级报警消息推送</span>
                    <ButtonIOS checked={true} />
                </div>
                <div className="btn-item">
                    <span>站内消息推送</span>
                    <ButtonIOS checked={true} />
                </div>
                <div className="btn-item">
                    <span>系统消息推送</span>
                    <ButtonIOS checked={false} />
                </div>
            </Page>
        )
    }
}

export default MyMessageSet