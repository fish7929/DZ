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
    data: {
        ...data,
        generationDailyList: data.generationDailyList.map(obj=>({value: obj.value, name:utils.formatDate(obj.time, "yyyy-MM-dd")})),
        powerTime: data.powerTime.map(obj=>({value: obj.value, name: obj.time}))
    }
})

export const getPSMDetail = (id) => dispatch =>{
    let url = Api.GetPowerStationDetail(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data || [])))
}