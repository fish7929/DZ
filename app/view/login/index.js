import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

import Page from '../../component/page'
import Header from '../../component/header'


import * as RouterConst from '../../static/const/routerConst'
import ErrorMessage from '../../static/const/errorMessage'

import { userLogin, checkBindWx } from './reducer/action'
import { checkNumber, checkPhone } from '../../utils'

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

    onPhoneChange(e){
        let value = e.currentTarget.value
        // if(checkNumber(value)){
            this.setState({username: value})
        // }
    }

    /**输入框改变事件 */
    onPasswordChange(e){
        let value = e.currentTarget.value
        this.setState({password: value})
    }

    /**登录按钮事件 */
    onLoginHandler(){
        let { username, password } = this.state, msg=""
        if(username == ""){
            msg = ErrorMessage.Error_Phone_Empty
        // }else if(!checkPhone(username)){
            // msg = ErrorMessage.Error_Phone_Invalid
        }else if(password == ""){
            msg = ErrorMessage.Error_Password_Empty
        }else if(password.length < 3){ // 这只是123 5
            msg = ErrorMessage.Error_PassWord_Invalid
        }
        if(msg){
            AppModal.toast(msg)
            return
        }

        this.props.userLogin(username, password)
    }

    onWXLoginHandler(){
        // let data = {
        //     expires: 7200,
        //     id: "oJqh40s6yjwVehm-qP2Ms0WSN7xU",
        //     info: {
        //         city: "Pudong New District",
        //         country: "CN",
        //         headimgurl: "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ept2cKsf98r6r8kw025gKr99BEYza1ibHQkiaw6z5Q81djicJHn0QiabpIj5wBxFeCEc67eicc8XqsCd0g/0",
        //         language: "zh_CN",
        //         nickname: "BlackInter",
        //         openid: "oJqh40s6yjwVehm-qP2Ms0WSN7xU",
        //         privilege: "",
        //         province: "Shanghai",
        //         sex: "1",
        //         unionid: "oRCUSwy016Y2F9RUt7sX233zpjGo",
        //     },
        //     token: "WGGfJkM6BTF2EV9WGdG_vzyLvmxx1Yy8AMXzktMgXMpTzH1Y4-wlpTXkoyfSMRYzWnxzj1pokc3ZByKo9gXIitc8eg2LpE1_Nx0IAZOMtrs"
        // }
        // this.props.checkBindWx(data.info)
        // return;
        if(window.cordova){
            // alert("调用window.cordova.plugins.spacekplugin.isThirdAppInstalled wx")
            window.cordova.plugins.spacekplugin.isThirdAppInstalled("wx", ()=>{
                // alert("wx是否安装成功回调");
                window.cordova.plugins.spacekplugin.thirdAppLogin("wx", data=>{
                    // alert("微信登陆成功"+ JSON.stringify(data))
                    this.props.checkBindWx(data.info)
                }, error=>{
                    AppModal.toast('微信登陆失败！');
                })
            }, error=>{
                AppModal.toast('微信未安装');
            })
        }else{
            window.open("http://www.yunengzhe.com/wechat/login/weixin?redirect_uri=http://www.yunengzhe.com/pvmts_app/files/wxLogin.html","_self");
        }
    }

    render(){
        let { username, password } = this.state
        return(
            <Page className="login-container">
                <Header title="登录" isShowBack={false} />
                <div className="main-content">
                    <div className="input-user-div">
                        <span className="icon"></span>
                        <input type="text"  className="ime-disabled" style="ime-mode: disabled;" value={username} onChange={(e)=>this.onPhoneChange(e)} placeholder="请输入手机号" />
                    </div>
                    <div className="input-pw-div">
                        <span className="icon"></span>
                        <input type="password" value={password} onChange={(e)=>this.onPasswordChange(e)} placeholder="请输入密码" />
                    </div>
                    <div className="btn-div">
                        <button onClick={()=>this.onLoginHandler()}>登录</button>
                        <button onClick={()=>this.onWXLoginHandler()}><span className="icon-wx" />微信登录</button>
                    </div>
                </div>
            </Page>
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
    return bindActionCreators({ userLogin, checkBindWx }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)