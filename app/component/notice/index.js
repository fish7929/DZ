import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import Scroll from './scroll'

import * as RouterConst from '../../static/const/routerConst'

import './index.scss'

class Notice extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.myscroll = new Scroll("myscroll")
        this.init = true
    }

    componentWillReceiveProps(nextProps){
        if(this.props.data.length != nextProps.data.length){
            this.init = true
        }
    }

    componentDidUpdate(){
        let { data } = this.props
        if(data.length && this.init){
            this.myscroll.init("myscroll")
            this.init = false
        }
    }

    onItemClickHandler(e){
        var target = e.target;
        if(target.dataset.id){
            hashHistory.push(RouterConst.ROUTER_MESSAGE_DETAIL + "/" + target.dataset.id + "/2")
        }
    }

    render(){
        let { data } = this.props
        return (
            <div className="notice-container">
                <div className="notice-title-div">
                    <span className="icon-notice"></span>
                    <span className="title-notice">公告</span>
                </div>
                <div id="myscroll" className="cls_container" onClick={(e)=>this.onItemClickHandler(e)}>
                    <ul>
                        {data.map((obj, index)=><li key={index} className="no-wrap" data-id={obj.id}>{obj.name}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

Notice.PropTypes = {
    data: PropTypes.array.isRequired
}

export default Notice