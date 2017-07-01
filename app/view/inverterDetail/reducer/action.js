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
        powerTemperatureTime: data.powerTemperatureTime ? data.powerTemperatureTime.map(obj => ({name: obj.time, value: obj.powerTemperature})) : []
    }
})

export const getInverterDetail = (id) => dispatch =>{
    let url = Api.GetInverterDetail(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data)))
}