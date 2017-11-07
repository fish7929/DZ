/** 
 * @component action.js
 * @time CreateTime
 * @author zhao
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveListData = (data) => {
    let seen = new Map();
    let powerTemperatureTime = data.powerTemperatureTime ? data.powerTemperatureTime.filter(a=>(a.time/1000%3600) === 0 && (a.time/1000/3600%2) === 0 && !seen.has(a.time) && seen.set(a.time, true)).sort((a, b)=>{return a.time - b.time }).map(obj=>({value: [obj.power, obj.temperature], time:obj.time, name: utils.formatDate(obj.time, "HH")})): []

    return {
        type: ActionType.INIT_INVERTER_DETAIL,
        data: {
            ...data,
            powerTemperatureTime: powerTemperatureTime
        }
    }
}

export const getInverterDetail = (id) => dispatch =>{
    let url = Api.GetInverterDetail(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data)))
}