import React, {} from 'react'

import Page from '../../component/page'
import Header from '../../component/header'
import MyFeedbackItem from './myFeedbackItem'

import './index.scss'


class MyFeedback extends React.Component{

    render(){
        return(
            <Page className="my-feedback-container">
                <Header title="我的故障反馈" isShowBack={true} />
                <div className="my-feedback-list">
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                    <MyFeedbackItem />
                </div>
            </Page>
        )
    }
}

export default MyFeedback