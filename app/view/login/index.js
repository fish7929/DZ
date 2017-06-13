import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

import * as RouterConst from '../../static/const/routerConst'
import ErrorMessage from '../../static/const/errorMessage'

import { userLogin } from './reducer/action'
import { checkEmail } from '../../utils'

import './index.scss'

class Login extends React.Component{

    constructor(props, context){
        super(props, context)

        this.state = {
            username: "",
            password: "",
        }
    }

    componentDidMount(){
        this.setState({
            username: "",
            password: ""
        })
    }

    /**输入框改变事件 */
    onInputChange(e, type){
        let value = e.currentTarget.value.replace(/\s/g,''), state = {}
        state[type] = value
        this.setState(state)
    }

    /**登录按钮事件 */
    onLoginHandler(){
        hashHistory.push(RouterConst.ROUTER_HOME)
        return 

        let { username, password } = this.state, msg=""
        if(username == ""){
            msg = ErrorMessage.Error_Email_Empty
        }else if(!checkEmail(username)){
            msg = ErrorMessage.Error_Email_Invalid
        }else if(password == ""){
            msg = ErrorMessage.Error_Password_Empty
        }else if(password.length<5||password.length>12){
            msg = ErrorMessage.Error_PassWord_Invalid
        }
        if(msg){
            return
        }

        this.props.userLogin(username, password)
    }

    render(){
        let { username, password } = this.state
        return(
            <div className="login-container">
                <div>登录</div>
                <div>
                    <span>用户名:</span>
                    <input type="text" value={username} onChange={(e)=>this.onInputChange(e, "username")} />
                </div>
                <div>
                    <span>密码:</span>
                    <input type="password" value={password} onChange={(e)=>this.onInputChange(e, "password")} />
                </div>
                <div><button onClick={()=>this.onLoginHandler()}>登录</button><button onClick={()=>hashHistory.goBack()}>返回</button></div>
            </div>
        )
    }

}

Login.PropTypes = {
    isLogin: PropTypes.bool.isRequired
}

let mapStateToProps = state => ({
    isLogin: state.loginReducer.isLogin
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ userLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)