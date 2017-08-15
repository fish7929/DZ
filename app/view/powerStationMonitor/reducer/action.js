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

export const getUserPowerList = () => dispatch => {
    let url = Api.GetUserPowerList()
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {
        console.log(data)
        data.results.map(obj => {
            getUserTrack(obj, dispatch)
        })
    })
}

const getUserTrack = (user, dispatch) => {
    let url = Api.GetUserTrack(user.id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {

    })
}