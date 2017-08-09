/** 
 * @component action.js
 * @time CreateTime
 * @author zhao
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveListData = (data) => ({
    type: ActionType.INIT_INVERTER_DETAIL,
    data: {
        ...data,
        powerTemperatureTime: data.powerTemperatureTime ? data.powerTemperatureTime.sort((a, b)=>{return a.time >= b.time }).map(obj => ({name: utils.formatDate(obj.time, "MM-dd HH:mm"), value: [obj.power, obj.temperature]})).slice(0, 60) : []
    }
})

export const getInverterDetail = (id) => dispatch =>{
    let url = Api.GetInverterDetail(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data)))
}