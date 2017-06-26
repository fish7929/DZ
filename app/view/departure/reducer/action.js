/**
 * @component action4.js
 * @description redux 动作常量
 * @time 2017-06-17 18:40
 * @author fishYu
 **/

import * as utils from '../../../utils';
import * as ActionType from './actionType';
import * as Api from '../../../static/const/apiConst'

// 获取远程数据
/**
 * 获取远程数据
 */
function requestData(dataType) {
    return {
        type: ActionType.REQUEST_DEPARTURE_DATA
    };
}

// 接收远程数据
/**
 * 接收远程数据
 * @param {any} result  返回的数据，可能是 array，json, text
 */
function receiveData(result) {
    return {
        type: ActionType.RECEIVE_DEPARTURE_DATA,
        data: result
    };
}

/**
 * 请求远程数据
 * @param {number} orderNumber  工单编号
 */
export const fetchData = (orderNumber) => dispatch => {
    dispatch(requestData(orderNumber));
    let _url = Api.GetDepartureDataByOrder(orderNumber);
    dispatch(utils.sendMsg(_url, null, "GET")).then(data => {
        console.log(data, 789);
        dispatch(receiveData(data));
    })
}