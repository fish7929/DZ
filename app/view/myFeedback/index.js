import React, {} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {hashHistory} from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'
import MyFeedbackItem from './myFeedbackItem'
import ScrollList from '../../component/scrollList'

import { getMyFeedbackList } from './reducer/action'

import * as RouterConst from '../../static/const/routerConst'

import './index.scss'


class MyFeedback extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            currentPage: 1,
            pagesize: 10
        }
    }

    componentDidMount(){
        this.onLoaderData(this.state.currentPage)
    }

    onLoaderData(currentPage){
        let opt = {
            page: currentPage,
            pagesize: this.state.pagesize,
        }
        this.props.getMyFeedbackList(opt).then(()=>{
            this.setState({currentPage: currentPage})
        })
    }

    render(){
        let { currentPage } = this.state
        let { list, pageTotal } = this.props
        return(
            <Page className="my-feedback-container">
                <Header title="我的故障反馈" isShowBack={true} />
                <div className="main-content">
                    <ScrollList className="my-feedback-list" onScroll={ page=>this.onLoaderData(page) } currentPage={ currentPage } pageTotal={ pageTotal }>
                        { list.map((obj, key) => <MyFeedbackItem data={obj} key={key} onClick={()=>hashHistory.push(RouterConst.ROUTER_MY_FEEDBACK_DETAIL + "/" + obj.id)} />) }
                    </ScrollList>
                </div>
            </Page>
        )
    }
}


let mapStateToProps = state => ({
    pageTotal: state.myFeedbackReducer.pageTotal,
    list: state.myFeedbackReducer.myFeedbackList
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMyFeedbackList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFeedback);