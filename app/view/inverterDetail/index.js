/** 
 * @component index.js
 * @description description
 * @time  createTime
 * @author zhao
 */

import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'

class InverterDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <Page className="inverter-detail-container">
                <Header title="逆变器详情" isShowBack={true} />
            </Page>
        )
    }
}

InverterDetail.PropTypes = {

}

export default InverterDetail