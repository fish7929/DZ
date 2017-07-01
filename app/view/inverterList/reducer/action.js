/** 
 * @component action.js
 * @time CreateTime
 * @author zhao
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveListData = (data) => ({
    type: ActionType.INVERTER_INIT_LIST,
    data: data
})

export const getInverterList = (id, tabIndex) => dispatch =>{
    let url = Api.GetInverterInfo()
    let opt = {
        powerStationId: id,
        equipmentStatus: tabIndex
    }
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => dispatch(receiveListData(data || [])))
}

export const changeTabIndex = tabIndex => dispatch => {
    dispatch({
        type: ActionType.INVERTER_CHANGE_TAB,
        data: tabIndex
    })
}