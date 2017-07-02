/** 
 * @component action.js
 * @time CreateTime
 * @author zhao
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveListData = (data) => ({
    type: ActionType.INIT_ALARM_SEARCH_POWERSTATION,
    data: data
})

export const getMyPowerStationList = () => dispatch =>{
    let url = Api.GetUserPowerStation()
    dispatch(utils.sendMsg(url, {}, "POST")).then(data => dispatch(receiveListData(data)))
}

const receiveData = data => ({
    type: ActionType.INIT_ALARM_SEARCH_RESULT_DATA,
    data: data
})

export const searchAlarmList = opt => (dispatch, getState) => {
    let url = Api.GetAlarmListByOption()
    return new Promise((resolve, reject)=>{
        dispatch(utils.sendMsg(url, opt, "GET")).then(data => {
            let state = getState();
            if(opt.page != 1){
                data.results = state.alarmSearchReducer.searchList.concat(data.results)
            }
            dispatch(receiveData(data))
            resolve&&resolve()
        }, reject)
    })
    
}