/**
 * @component action4.js
 * @description redux 动作常量
 * @time 2017-06-17 18:40
 * @author fishYu
 **/

import * as utils from '../../../utils';
import * as ActionType from './actionType';

// 获取远程数据
/**
 * 获取远程数据
 * @param {number} dataType  数据类型， 1，2，3
 */
function requestData(dataType) {
    return {
        type: ActionType.REQUEST_MESSAGE_DATA,
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
        type: ActionType.REQUEST_MESSAGE_DATA,
        data: result
    };
}

/**
 * 请求远程数据
 * @param {number} type  消息数据类型， 1，2，3
 */
export const fetchData = (type) => dispatch => {
    dispatch(requestData(type));
    // let _url = "/pvmtsys/messageSystemInfo/getMassageByType/" + type;
    let _url = "/app/test/mockup/message/messageData.json";
    dispatch(utils.sendMsg(_url, null, "GET")).then(data => {
        dispatch(receiveData(data))
    })
}