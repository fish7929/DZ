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
 * @param {number} dataType  数据类型， 1，2，3
 */
function requestData(orderNumber) {
    return {
        type: ActionType.REQUEST_FAULT_DATA,
        dataType: orderNumber
    };
}

// 接收远程数据
/**
 * 接收远程数据
 * @param {any} result  返回的数据，可能是 array，json, text
 */
function receiveData(result) {
    return {
        type: ActionType.RECEIVE_FAULT_DATA,
        data: result
    };
}

/**
 * 请求远程数据
 * @param {number} orderNumber  工单编号
 */
export const fetchData = (orderNumber) => dispatch => {
    dispatch(requestData(orderNumber));
    let _url = Api.GetFaultListByOrder(orderNumber);
    dispatch(utils.sendMsg(_url, null, "GET")).then(data => {
        dispatch(receiveData(data));
    })
}