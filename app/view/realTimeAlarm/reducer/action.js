/**
 * create by zhao at 2017/6/18
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'

const receiveListData = (data) => ({
    type: ActionType.REAL_TIME_ALARM_LIST_INIT,
    data: data
})

export const getAlarmList = (opt) => dispatch =>{
    let url = Api.GetAlarmListByOption
    dispatch(utils.sendMsg(url, opt, "GET")).then(data => dispatch(receiveListData(data)))
}

export const changeTabIndex = (index) => dispatch => {
    dispatch({
        type: ActionType.REAL_TIME_ALARM_CHANGE_TAB,
        data: index  
    })
}