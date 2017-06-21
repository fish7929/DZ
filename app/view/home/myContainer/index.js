/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */

import React, {PropTypes} from 'react'

import { hashHistory } from 'react-router'

import * as RouterConst from '../../../static/const/routerConst'

import './index.scss'

class MyContainer extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div className="my-container">
                <div className="user-info-header">
                    <div className="user-name-div">
                        <div className="left-div"><span className="icon personal"></span>姓名</div>
                        <div className="right-div">张三</div>
                    </div>
                    <div className="user-info-div">
                        <div className="info-item">
                            <div className="left-div"><span className="icon account"></span>账号</div>
                            <div className="right-div">18866668888</div>
                        </div>
                        <div className="info-item">
                            <div className="left-div"><span className="icon department"></span>部门</div>
                            <div className="right-div">北京分公司运维部</div>
                        </div>
                        <div className="info-item">
                            <div className="left-div"><span className="icon mobile"></span>联系</div>
                            <div className="right-div">18866668888</div>
                        </div>
                    </div>
                </div>

                <div className="button-div">
                    <button onClick={()=>hashHistory.push(RouterConst.ROUTER_CHANGE_PASSWORD)}>修改密码</button>
                    <button>绑定微信</button>
                </div>

                <div className="button-div">
                    <button onClick={()=>hashHistory.push(RouterConst.ROUTER_MY_FEEDBACK)}>我的故障反馈</button>
                </div>

                <div className="button-div">
                    <button onClick={()=>hashHistory.push(RouterConst.ROUTER_MY_MESSAGE_SET)}>推送消息</button>
                    <div className="btn-div"><span>系统版本号</span><span>1.1.2</span></div>
                </div>

                <div className="button-exit-div">
                    <button>退出当前账号</button>
                </div>
                
            </div>
        )
    }

}

MyContainer.PropTypes = {

}

export default MyContainer