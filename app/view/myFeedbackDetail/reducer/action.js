/**
 * create by zhao at 2017/6/18
 */
import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'


const receiveData = (data) => ({
    type: ActionType.MY_FEEDBACK_DETAIL_INIT,
    data: data
})

export const getMyFeedbackDetail = (id) => dispatch =>{
    let url = Api.getMyFeedbackDetail(id)
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {
        url = Api.GetPowerStationDetail(data.powerStationId)
        dispatch(utils.sendMsg(url, {}, "GET")).then(result => {
            data = {
                ...data,
                powerStationName: result.name
            }
            dispatch(receiveData(data))
        })
    })
}