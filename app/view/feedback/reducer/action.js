/**
 * create by zhao at 2017/5/25
 */

import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'

const receiveData = data => ({
    type: ActionType.INIT_MY_FEEDBACK_LIST,
    data: data
})


const receiveListData = (data) => ({
    type: ActionType.INIT_FEEDBACK_POWER_STATION_LIST,
    data: data
})

export const getMyPowerStationList = () => dispatch =>{
    let url = Api.GetUserPowerStation()
    dispatch(utils.sendMsg(url, {}, "POST")).then(data => {
        if(data.rows.length > 0){
            getDeviceType(data.rows[0].id, dispatch)
        }
        dispatch(receiveListData(data))
    })
}


const receiveDeviceType = data => ({
    type: ActionType.INIT_FEEDBACK_DEVICE_TYPES,
    data: data
})

const getDeviceType = (id, dispatch) => {
    let url = Api.GetPowerStationDeviceTypes(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveDeviceType(data)))
}

export const getPowerStationDeviceTypes = (id) => dispatch => {
    getDeviceType(id, dispatch)
}
