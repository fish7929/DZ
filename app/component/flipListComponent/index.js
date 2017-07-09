import React, { PropTypes } from 'react'

import './index.scss'

class FlipListComponent extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            isShow: true,
            listHeight: 0
        }
    }

    componentDidMount(){
        this.listHeight = 0
        let { defaultShow } = this.props;
        if(defaultShow === undefined) defaultShow = true

        this.setState({isShow: defaultShow})
    }

    componentDidUpdate(){
        setTimeout(()=>{
            let { isShow } = this.state
            let _h = this.refs.flipList.offsetHeight
            this.listHeight = _h > 0 ? _h : this.listHeight
            this.refs.flipList.style.height = isShow ? this.listHeight + "px" : 0
        }, 500)
    }

    onClickHandler(){
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render(){
        let { isShow } = this.state
        let { title, children } = this.props

        return(
            <div className="flip-list-component">
                <div className="flip-title" onClick={()=>this.onClickHandler()}>
                    <span className="txt">{title}</span>
                    <span className={"arrow-icon " + (isShow ? "arror-up" : "")}></span>
                </div>
                <div ref="flipList" className="flip-list">{this.props.children}</div>
            </div>
        )
    }
}

FlipListComponent.PropTypes = {
    title: PropTypes.string.isRequired,
    defaultShow: PropTypes.bool
}

export default FlipListComponent