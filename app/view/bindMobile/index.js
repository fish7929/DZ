import React, { PropTypes } from 'react'

import Header from '../../component/header'


class BindMobile extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            mobile: ""
        }
    }

    componentDidMount(){
        
    }
    

    render(){
        let {mobile} = this.state
        return(
            <div className="container bind-mobile-container">
                <Header title="绑定手机号" isShowBack={false} />
                <div className="input-mobile-div">
                    <span className="username-icon"></span>
                    <input type="text" value={mobile} onChange={(e)=>this.onInputChange(e, "username")} />
                </div>
                <div className="input-pw-div">
                    <span className="password-icon"></span>
                    <input type="password" value={password} onChange={(e)=>this.onInputChange(e, "password")} />
                </div>
                <div className="btn-div"> 
                    <button onClick={()=>this.onLoginHandler()}>微信登陆</button>
                    <button onClick={()=>hashHistory.goBack()}>登陆</button>
                </div>
            </div>
        )
    }
}

export default BindMobile