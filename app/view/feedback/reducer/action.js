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
        if(data.length > 0){
            getDeviceType(data[0].id, dispatch)
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

export const uploadVideoFile = (opt) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = Api.GetUploadApi()
        dispatch(utils.sendMsg(url, opt, "POST", {}, "form")).then(data => {
            resolve && resolve(data)
        }, reject)
    })
}

export const pushFeedbackMessage = opt => dispatch => {
    return new Promise((resolve, reject) => {
        let url = Api.InsertFaultInfo()
        dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
            resolve && resolve(data)
        }, reject)
    })
}