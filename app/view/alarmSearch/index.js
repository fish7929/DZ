import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'

class AlarmSearch extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <Page className="alarm-search-container">
                <Header title="搜索" isShowBack={true} />
                <div></div>
                <div>
                    <span>报警状态</span>
                    <select placeholder="请选择报警状态">
                        <option>已报警</option>
                        <option>未报警</option>
                    </select>
                </div>

                <div>
                    <div>
                        <span>报警原因</span>
                        <input type="text" placeholder="请输入报警原因" />
                    </div>

                    <div>
                        <span>报警级别</span>
                        <select placeholder="请选择报警级别">
                            <option>已报警</option>
                            <option>未报警</option>
                        </select>
                    </div>
                    <div>
                        <span>报警时间范围</span>
                        <div>
                            <input type="date" placeholder="起始时间" />
                            <span>至</span>
                            <input type="date" placeholder="结束时间" />
                        </div>
                    </div>
                </div>

                <button className="btn-search">搜索</button>
            </Page>
        )
    }

}

export default AlarmSearch