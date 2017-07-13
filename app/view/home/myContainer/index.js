/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */

import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { hashHistory } from 'react-router'
import * as RouterConst from '../../../static/const/routerConst'

import { getAppVersion } from "../reducer/action"

import './index.scss'

class MyContainer extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
        this.props.getAppVersion()
    }

    onLoginOut(){
        Base.setLocalStorageItem("user", "");
        AppModal.confirm("是否退出？", "温馨提示", ()=>{
            hashHistory.push(RouterConst.ROUTER_LOGIN);
        })
    }

    render(){
        let user = Base.getLocalStorageObject("user")
        let { username, nickname, email, mobile, departmentName } = user
        let { appVersion } = this.props
        return(
            <div className="my-container">
                <div className="user-info-header">
                    <div className="user-name-div">
                        <div className="left-div"><span className="icon personal"></span>姓名</div>
                        <div className="right-div">{nickname}</div>
                    </div>
                    <div className="user-info-div">
                        <div className="info-item">
                            <div className="left-div"><span className="icon account"></span>账号</div>
                            <div className="right-div">{username}</div>
                        </div>
                        <div className="info-item">
                            <div className="left-div"><span className="icon department"></span>部门</div>
                            <div className="right-div">{departmentName}</div>
                        </div>
                        <div className="info-item">
                            <div className="left-div"><span className="icon mobile"></span>联系</div>
                            <div className="right-div">{mobile}</div>
                        </div>
                    </div>
                </div>

                <div className="button-div">
                    <button onClick={()=>hashHistory.push(RouterConst.ROUTER_CHANGE_PASSWORD)}>修改密码</button>
                    {/*<button>绑定微信</button>*/}
                </div>

                <div className="button-div">
                    <button onClick={()=>hashHistory.push(RouterConst.ROUTER_MY_FEEDBACK)}>我的故障反馈</button>
                </div>

                <div className="button-div">
                    <button onClick={()=>hashHistory.push(RouterConst.ROUTER_MY_MESSAGE_SET)}>推送消息</button>
                    <div className="btn-div"><span>系统版本号</span><span>{appVersion}</span></div>
                </div>

                <div className="button-exit-div">
                    <button onClick={()=>this.onLoginOut()}>退出当前账号</button>
                </div>
                
            </div>
        )
    }

}

let mapStateToProps = state => ({
    appVersion: state.homeData.appVersion,
})

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAppVersion }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyContainer);