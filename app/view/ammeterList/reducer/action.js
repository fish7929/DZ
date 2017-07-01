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

export const getAmmeterList = (id) => dispatch =>{
    let url = Api.GetAmmeterList(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => dispatch(receiveListData(data)))
}