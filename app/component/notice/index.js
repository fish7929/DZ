import React, { PropTypes } from 'react'

import Scroll from './scroll'

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

    render(){
        let { data } = this.props
        return (
            <div className="notice-container">
                <div className="notice-title-div">
                    <span className="icon-notice"></span>
                    <span className="title-notice">公告</span>
                </div>
                <div id="myscroll" className="cls_container">
                    <ul>
                        {data.map((obj, index)=><li key={index} className="no-wrap">{obj.name}</li>)}
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