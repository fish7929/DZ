/**
 * create by zhao at 2017/6/18
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveData = (data) => ({
    type: ActionType.ALARM_DETAIL_INIT,
    data: data
})

export const getAlarmList = (id, tabIndex) => dispatch =>{
    let url = Api.GetAlarmDetailById(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveData(data)))
}

export const pushAlarmInfo = opt => dispatch =>{
    return new Promise((resolve, reject) => {
        let url = Api.AffirmAlarm()
        dispatch(utils.sendMsg(url, opt, "POST")).then(data =>{
            if(data){
                resolve&&resolve()
            }else{
                reject&&reject()
            }
        }, reject)
    })
}