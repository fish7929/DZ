import { hashHistory } from 'react-router'

import * as utils from '../../../utils'
import * as RouterConst from '../../../static/const/routerConst'
import * as Api from '../../../static/const/apiConst'

export const changePassword = opt => dispatch => {
    let url = Api.UserChangePw()
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        hashHistory.goBack()
    })
}