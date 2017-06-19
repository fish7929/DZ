import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'
import InverterItem from '../../component/inverterItem'

import './index.scss'

class InverterList extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <Page className="inverter-list-container">
                <Header title="逆变器列表" isShowBack={true} />
                <div className="search-div"><input type="text" placeholder="搜索"><span className="search-icon"></span></input></div>
                <div className="tab-div">
                    <div className="tab-item">全部</div>
                    <div className="tab-item">停机</div>
                    <div className="tab-item">通讯异常</div>
                </div>
                <div className="inverter-list">
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                    <InverterItem />
                </div>
            </Page>
        )
    }

}

InverterList.PropTypes = {
    tabIndex: PropTypes.number.isRequired
}

export default InverterList