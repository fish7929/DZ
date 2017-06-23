/** 
 * @component action.js
 * @time CreateTime
 * @author zhao
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveListData = (data) => ({
    type: ActionType.PSM_DETAIL_INIT,
    data: data
})

export const getPSMDetail = (id) => dispatch =>{
    let url = Api.GetPowerStationDetail(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data || [])))
}