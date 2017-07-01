/**
 * create by zhao at 2017/5/25
 */

import * as utils from '../../../utils'
import * as ActionType from './actionType'
import * as Api from '../../../static/const/apiConst'

const receiveData = data => ({
    type: ActionType.INIT_MY_FEEDBACK_LIST,
    data: data
})


export const getMyFeedbackList = (opt) => (dispatch, getState) => {
    return new Promise((resolve, reject)=>{
        let url = Api.GetUserFaultList()
        dispatch(utils.sendMsg(url, opt, "GET")).then(data =>{
            let state = getState();
            if(opt.page != 0){
                data.results = state.myFeedbackReducer.myFeedbackList.concat(data.results)
            }
            dispatch(receiveData(data))
            resolve&&resolve()
        }, reject)
    })
    
    
}