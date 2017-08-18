/**
 * create by zhao at 2017/6/18
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveListData = (data) => ({
    type: ActionType.PSM_LIST_INIT,
    data: data
})

export const getPSMList = () => dispatch =>{
    let url = Api.GetUserPowerStation()
    dispatch(utils.sendMsg(url, {}, "POST")).then(data => dispatch(receiveListData(data || [])))
}

export const changeShowType = (type) => dispatch =>{
    dispatch({
        type: ActionType.PSM_CHANGE_SHOW_TYPE,
        data: type
    })
}

export const getUserPowerList = () => (dispatch, getState) => {
    let url = Api.GetUserPowerList()
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {
        data.results.map((obj, index) => {
            getUserTrack(obj, index, dispatch, getState)
        })
    })
}

const getUserTrack = (user, index, dispatch, getState) => {
    let url = Api.GetUserTrack(user.id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {
        if(data.length > 0){
            data = data[0]
            let list;
            if(index === 0){
                list = []
            }else{
                let state = getState()
                list = state.powerStationMonitorReducer.userList
            }
            list.push({ ...user, ...data})
            dispatch(receiveUserTrack(list))
        }
    })
}

const receiveUserTrack = data => ({
    type: ActionType.PSM_USER_UPDATE,
    data: data
})


export const getListByMapLevel = (opt) => dispatch =>{
    if(opt.type === 0){
        dispatch(reveiveMapLevel([]))
        return 
    }
    let url = Api.GetUserAndPowerStation()
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        if(data){
            dispatch(reveiveMapLevel(data.data))
        }
    })
}

const reveiveMapLevel = data => ({
    type:ActionType.PSM_MAPLEVEL_DATA,
    data: data
})