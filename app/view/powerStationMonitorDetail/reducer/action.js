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
        generationDailyList: data.generationDailyList.sort((a, b)=>{return a.time - b.time }).map(obj=>({value: obj.value, name:utils.formatDate(obj.time, "dd/MM/yyyy")})),
        powerTime: data.powerTime.filter(a=>(a.time/1000%3600) === 0 && (a.time/1000/3600%2) === 0).sort((a, b)=>{return a.time - b.time }).map(obj=>({value: obj.value, name: utils.formatDate(obj.time, "HH")}))
    }
})

export const getPSMDetail = (id) => dispatch =>{
    let url = Api.GetPowerStationDetail(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data || [])))
}