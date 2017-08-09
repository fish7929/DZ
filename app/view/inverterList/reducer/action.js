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

export const getInverterList = (id, tabIndex, page, searchTxt) => (dispatch, getState) =>{
    let url = Api.GetInverterInfo()
    let opt = {
        powerStationId: id,
        equipmentStatus: tabIndex,
        page: page,
        pagesize: 20
    }
    if(searchTxt){
        opt.name = searchTxt
    }
    return new Promise((resolve, reject) => {
        dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
            let state = getState();
            if(opt.page != 1){
                data.results = state.inverterReducer.inverterList.concat(data.results)
            }
            dispatch(receiveListData(data))
            resolve(data)
        }, reject)
    })
}

export const changeTabIndex = tabIndex => dispatch => {
    dispatch({
        type: ActionType.INVERTER_CHANGE_TAB,
        data: tabIndex
    })
}