/**
 * create by zhao at 2017/5/25
 */
import { hashHistory } from 'react-router'

import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as RouterConst from '../../../static/const/routerConst'
import * as Api from '../../../static/const/apiConst'

const receiveData = data => ({
    type: ActionType.UPDATE_USER_LOGIN,
    data: data
})

/**
 * 用户登录 
 @userName 用户名
 @password 密码
*/
export const userLogin = (userName, password) => dispatch => {
    let url = Api.UserLogin()
    let opt = {
        username: userName,
        password: password
    }

    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        Base.setLocalStorageObject("user", data)
        hashHistory.push(RouterConst.ROUTER_HOME)
    })
}