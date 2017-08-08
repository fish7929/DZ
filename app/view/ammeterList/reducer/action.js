/** 
 * @component action.js
 * @time CreateTime
 * @author zhao
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveListData = (data) => ({
    type: ActionType.INIT_AMMETER_LIST,
    data: data
})

export const getAmmeterList = (id, page) => (dispatch, getState) =>{
    let url = Api.GetAmmeterList()
    let opt = {
        powerStationId: id,
        page: page,
        pagesize: 20
    }

    return new Promise((resolve, reject) => {
        dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
            let state = getState();
            if(opt.page != 1){
                data.results = state.ammeterReducer.list.concat(data.results)
            }
            dispatch(receiveListData(data))
            resolve(data)
        }, reject)
    })
    
}