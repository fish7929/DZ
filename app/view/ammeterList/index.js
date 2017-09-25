/** 
 * @component index.js
 * @description description
 * @time  createTime
 * @author zhao
 */

import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'
import ScrollList from '../../component/scrollList'
import AmmeterItem from '../../component/ammeterItem'

import { getAmmeterList } from './reducer/action'

import './index.scss'

class AmmeterList extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            currentPage: 1,
        }
    }

    componentDidMount(){
        this.sendData(1)
    }

    sendData(page){
        this.props.getAmmeterList(this.props.params.id, page).then(()=>{
            if(this){
                this.setState({ currentPage: page });
            }
        })
    }

    render(){
        let { list } = this.props
        return(
            <Page className="ammeter-list-container">
                <Header title="电表列表" isShowBack={true} />
                <div className="main-content">
                    <ScrollList className="ammeter-list" onScroll={page => this.sendData(page)} currentPage={this.state.currentPage} pageTotal={this.props.total}>
                        {
                            list.map((obj, key) => <AmmeterItem key={key} data={obj} />)
                        }
                    </ScrollList>
                </div>
            </Page>
        )
    }
}

let mapStateToProps = state => ({
    list: state.ammeterReducer.list,
    total: state.ammeterReducer.total,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAmmeterList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AmmeterList)