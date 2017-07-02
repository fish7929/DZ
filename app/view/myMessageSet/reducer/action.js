/**
 * create by zhao at 2017/6/18
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveData = (data) => ({
    type: ActionType.MY_MESSAGE_UPDATE,
    data: data
})

export const getMyMessageStatus = () => dispatch =>{
    let url = Api.GetMyMessageStatus()
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveData(data)))
}

export const changeMyMessageStatus = (type, value) => (dispatch, getState) => {
    let url = Api.ChangeMyMessageStatus()
    let state = getState()
    let opt = {
        letter: type === "letter" ? value : state.myMessageReducer.letter,
        system: type === "system" ? value : state.myMessageReducer.system,
        threeAlarm: type === "threeAlarm" ? value : state.myMessageReducer.threeAlarm,
        twoAlarm: type === "twoAlarm" ? value : state.myMessageReducer.twoAlarm
    }
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        if(data){
            dispatch(receiveData(opt))
        }
    })
}