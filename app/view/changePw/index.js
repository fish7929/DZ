import React, {} from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'


class ChangePw extends React.Component{

    render(){
        return(
            <Page className="change-pw-container">
                <Header title="修改密码" isShowBack={true} />

                <div className="main-div">
                    <div className="code-div">
                        <div><span></span><input type="text" placeholder="请输入验证码" /></div>
                        <button>发送验证码</button>
                    </div>
                    <div className="password-div">
                        <div><span></span><input type="text" placeholder="请输入新密码" /></div>
                    </div>
                </div>
                <div className="tip-div">已向手机 188 **** 8888发送验证码</div>
                <button className="btn-comfirm">确认修改</button>
            </Page>
        )
    }
}

export default ChangePw