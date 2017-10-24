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
        type: ActionType.REQUEST_MESSAGE_DATA,
        dataType
    };
}

// 接收远程数据
/**
 * 接收远程数据
 * @param {any} result  返回的数据，可能是 array，json, text
 */
function receiveData(result, currentPage) {
    return {
        type: ActionType.RECEIVE_MESSAGE_DATA,
        data: result.results,
        total: result.pageCounts,
        currentPage: currentPage
    };
}

/**
 * 请求远程数据
 * @param {number} type  消息数据类型， 1，2，3
 * @param {number} currentPage 分页参数
 */
let messageType = ""
export const fetchData = (type, currentPage = 1) => dispatch => {
    messageType = type;
    dispatch(requestData(type));
    //这里组分页查询，pagesize每页查询个数
    let _opt = {
        page: currentPage,
        pagesize: 8,  //test
        massageType: type
    }
    // let _url = Api.GetMessageDataByType(type);
    let _url = Api.GetMessageDataByType();
    dispatch(utils.sendMsg(_url, _opt, "GET")).then(data => {
        console.log(_opt, messageType, 2222222222222222);
        if(messageType == _opt.massageType){
            dispatch(receiveData(data, currentPage));
        }
    })
}


export const clearList = () => dispatch =>{
    dispatch(receiveData({results:[], total: 0}, 1));
}