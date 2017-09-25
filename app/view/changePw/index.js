import React, {} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changePassword } from './reducer/action'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'


class ChangePw extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            oldPw: "",
            newPw: ""
        }
    }

    componentDidMount(){
        this.setState({
            oldPw: "",
            newPw: ""
        })
    }

    onInputChange(e, type){
        let state = {}
        state[type] = e.target.value
        this.setState(state)
    }

    onClickHandler(){
        let { oldPw, newPw } = this.state

        if(oldPw == ""){
            AppModal.toast('请输入旧密码')
            return
        }

        if(newPw == ""){
            AppModal.toast('请输入新密码')
            return
        }

        let opt = {
            newPassword: newPw,
            oldPassword: oldPw
        }
        this.props.changePassword(opt)
    }

    render(){

        let { oldPw, newPw} = this.state

        return(
            <Page className="change-pw-container">
                <Header title="修改密码" isShowBack={true} />
                <div className="main-content">
                    <div className="main-div">
                        <div className="password-div">
                            <div><span></span><input type="password" placeholder="请输入旧密码" value={oldPw} onChange={(e)=>this.onInputChange(e, "oldPw")} /></div>
                        </div>
                        <div className="password-div">
                            <div><span></span><input type="password" placeholder="请输入新密码" value={newPw} onChange={(e)=>this.onInputChange(e, "newPw")} /></div>
                        </div>
                    </div>
                    <button className="btn-comfirm" onClick={()=>this.onClickHandler()}>确认修改</button>
                </div>
            </Page>
        )
    }
}

let mapStateToProps = state => ({
    isLogin: state.loginReducer.isLogin
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changePassword }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePw)