import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { hashHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import * as RouterConst from '../../static/const/routerConst'

import './index.scss'
import './animate.scss'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup component='div'
                transitionName={{
                    enter: 'default-enter',
                    enterActive: this.props.location.action == 'PUSH'?'fadeInRight':'enterIn',
                    leave: 'default-leave',
                    leaveActive: this.props.location.action == 'PUSH'?'':'fadeOutRight'
                }}
                style={{overflowY: 'scroll', height: '100%', position: 'absolute',top: 0,width:'100%' }}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                    { React.cloneElement(this.props.children, { key: this.props.location.pathname }) }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}


App.PropTypes = {
}

export default App