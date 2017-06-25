/**
 * created by zhao at 2017/6/13
 */
import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'

import './index.scss'

class Header extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
    }
    /**
     * 右键点击事件
     * @param {object} e 事件对象
     */
    rightClickHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.rightFn && this.props.rightFn();
    }
    render(){
        return(
            <div className="header-container">
                <div className="title-div">
                    {this.props.title}
                    {
                        this.props.isShowBack ? <button className="btn_back" onClick={()=>hashHistory.goBack()}></button> : ""
                    }
                    {
                        this.props.isShowRight ? <button className={this.props.rightClass} onClick={(e)=>this.rightClickHandler(e)}>{this.props.rightContent}</button> : ""
                    }
                </div>
            </div>
        )
    }
}

Header.PropTypes = {
    title: PropTypes.string.isRequired,
    isShowBack: PropTypes.bool.isRequired,
    isShowRight: PropTypes.bool,
    rightClass:  PropTypes.string,
    rightFn: PropTypes.func,
    rightContent: PropTypes.string
}
/**
 * 默认props
 */
Header.defaultProps = {
    isShowRight: false,
    rightClass: '',
    rightContent: ''
};
export default Header
