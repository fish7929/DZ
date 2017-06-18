/**
 * create by zhao at 2017/6/18
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'


const receiveListData = (data) => ({
    type: ActionType.PSM_LIST_INIT,
    data: data
})

export const getPSMList = () => dispatch =>{
    let url = "/pvmtsys/powerStation/getPowerStationBaseInfo"
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data.powerStationList || [])))
}