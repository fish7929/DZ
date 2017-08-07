import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Page from '../../component/page'
import Header from '../../component/header'

import { bindWeiXin } from "./reducer/action"

import './index.scss'

class BindMobile extends React.Component{

    constructor(props, context){
        super(props, context)
        this.state = {
            mobile: "",
            code: "",
            count: 0
        }
    }

    componentDidMount(){
        this.setState({
            mobile: "",
            code: "",
        })
    }

    componentDidUpdate(){
    }

    onMobileChange(e, type){
        let state = {};
        state[type] = e.target.value
        this.setState(state)
    }

    onBindHandler(){
        let weixinInfoStr = Base.getLocalStorageItem("weixinInfo");
        if(!weixinInfoStr){
            AppModal.toast('没有微信信息');
            return
        }
        let weixinInfo = JSON.parse(weixinInfoStr)
        let { mobile, code } = this.state
        if(mobile == ""){
            AppModal.toast('账号不能为空');
            return
        }else if(code == ""){
            AppModal.toast('密码不能为空');
            return
        }

        let opt = {
            username: mobile,
            password: code,
            wxheadimgurl: weixinInfo.headimgurl,
            wxnickname: weixinInfo.nickname,
            wxopenId: weixinInfo.openid,
            wxsex: weixinInfo.sex,
            wxunionId: weixinInfo.unionid
        }

        this.props.bindWeiXin(opt)

    }

    render(){
        let {mobile, code, count} = this.state
        return(
            <Page className="bind-mobile-container">
                <Header title="绑定运维账号" isShowBack={false} />
                <div className="input-mobile-div">
                    <span className="icon"></span>
                    <input type="text" value={mobile} onChange={(e)=>this.onMobileChange(e, "mobile")} placeholder="请输入账号"  />
                </div>
                <div className="input-code-div">
                    <span className="icon"></span>
                    <input type="text" value={code} onChange={(e)=>this.onMobileChange(e, "code")} placeholder="请输入密码"  />
                </div>
                <div className="btn-div"> 
                    <button onClick={()=>this.onBindHandler()}>绑定账号</button>
                </div>
            </Page>
        )
    }
}


let mapStateToProps = state => ({
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ bindWeiXin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BindMobile)