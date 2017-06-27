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
    let url = Api.GetPowerStationBaseInfo()
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data || [])))
}