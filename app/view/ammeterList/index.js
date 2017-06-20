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

class AmmeterList extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <Page className="ammeter-list-container">
                <Header title="电表列表" isShowBack={true} />
            </Page>
        )
    }
}

AmmeterList.PropTypes = {

}

export default AmmeterList