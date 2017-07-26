/** 
 * @component action.js
 * @time CreateTime
 * @author zhao
 */
import { hashHistory } from 'react-router'
import * as utils from '../../../utils'
import * as Api from '../../../static/const/apiConst'
import * as RouterConst from '../../../static/const/routerConst'

const receiveListData = (data) => ({
    type: ActionType.INIT_AMMETER_LIST,
    data: data
})

export const bindWeiXin = (opt) => dispatch =>{
    let url = Api.BindWEIXIN()
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        console.log(data);
        if(data){
            Base.setLocalStorageObject("user", data)
            hashHistory.push(RouterConst.ROUTER_HOME)
        }else{
            AppModal.toast("微信号绑定失败！")
        }
    })
}