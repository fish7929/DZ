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
import AmmeterItem from '../../component/ammeterItem'

import { getAmmeterList } from './reducer/action'

import './index.scss'

class AmmeterList extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getAmmeterList(this.props.params.id)
    }

    render(){
        let { list } = this.props
        return(
            <Page className="ammeter-list-container">
                <Header title="电表列表" isShowBack={true} />
                <div className="ammeter-list">
                    {
                        list.map((obj, key) => <AmmeterItem key={key} data={obj} />)
                    }
                </div>
            </Page>
        )
    }
}

let mapStateToProps = state => ({
    list: state.ammeterReducer.list
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAmmeterList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AmmeterList)