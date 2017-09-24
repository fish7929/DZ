import { hashHistory } from 'react-router'

import * as utils from '../../../utils'
import * as RouterConst from '../../../static/const/routerConst'
import * as Api from '../../../static/const/apiConst'

export const changePassword = opt => dispatch => {
    let url = Api.UserChangePw()
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        if(!data){
            AppModal.toast('原始密码不正确！')
            return
        }
        AppModal.toast('密码修改成功！')
        hashHistory.goBack()
    })
}