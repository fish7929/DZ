import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'

class AlarmDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){

    }

    render(){
        return(
            <Page className="alarm-detail-container">
                <Header title="报警详情" isShowBack={true} />

            </Page>
        )
    }
}

AlarmDetail.PropTypes = {

}

export default AlarmDetail