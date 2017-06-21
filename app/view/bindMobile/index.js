import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'

const MaxCount = 60
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
            count: 0
        })
    }

    componentDidUpdate(){
        let { count } = this.state
        if(count >0 ){
            setTimeout(()=>this.setState({count: count-1}), 1000)
        } 
    }

    onMobileChange(e){

    }

    onCodeChange(e){

    }

    onCodeHandler(){
        this.setState({count: MaxCount})
    }

    onBindHandler(){
        
    }

    render(){
        let {mobile, code, count} = this.state
        return(
            <Page className="bind-mobile-container">
                <Header title="绑定手机号" isShowBack={false} />
                <div className="input-mobile-div">
                    <span className="icon"></span>
                    <input type="text" value={mobile} onChange={(e)=>this.onMobileChange(e)} placeholder="请输入手机号"  />
                </div>
                <div className="input-code-div">
                    <span className="icon"></span>
                    <input type="text" value={code} onChange={(e)=>this.onCodeChange(e)} placeholder="请输入验证码"  />
                    <button onClick={()=>this.onCodeHandler()} disabled={count?true:false}>{count? count+"s" : "发送验证码"}</button>
                </div>
                <div className="btn-div"> 
                    <button onClick={()=>this.onBindHandler()}>绑定手机</button>
                </div>
            </Page>
        )
    }
}

export default BindMobile