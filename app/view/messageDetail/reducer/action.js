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
function requestData(dataType) {
    return {
        type: ActionType.REQUEST_MESSAGE_DETAIL_DATA,
        dataType
    };
}

// 接收远程数据
/**
 * 接收远程数据
 * @param {any} result  返回的数据，可能是 array，json, text
 */
function receiveData(result) {
    return {
        type: ActionType.RECEIVE_MESSAGE_DETAIL_DATA,
        data: result
    };
}

/**
 * 请求远程数据
 * @param {string} id  消息id
 * @param {number} type  消息数据类型， 1，2
 */
export const fetchData = (id, type) => dispatch => {
    dispatch(requestData(type));
    // let _url = "/pvmtsys/messageSystemInfo/getMassageByType/" + type;
    let _url = Api.GetMessageDetailByIdAndStatus(id, type);
    dispatch(utils.sendMsg(_url, null, "GET")).then(data => {
        dispatch(receiveData(data));
    })
}