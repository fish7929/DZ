/**
 * @component action.js
 * @description redux 动作常量
 * @time 2017-06-18 20:40
 * @author fishYu
 **/

import * as utils from '../../../utils';
import * as ActionType from './actionType';
import { ZERO, FIRST, SECOND, THREE } from '../../../static/const/constants';
import * as Api from '../../../static/const/apiConst'

// 获取远程数据
/**
 * 获取远程数据
 * @param {number} category  数据类型，0, 1，2，3
 */
function requestData(category) {
    return {
        type: ActionType.REQUEST_HOME_DATA,
        dataType: category
    };
}

// 接收远程数据
/**
 * 接收远程数据
 * @param {any} result  返回的数据，可能是 array，json, text
 * @param {number} category  类别
 */
function receiveData(result, category) {
    switch(category) {
        case ZERO:
            return {
                type: ActionType.RECEIVE_HOME_CONTAINER_DATA,
                data: result.IsReadCount
            }
        case FIRST:
            return {
                type: ActionType.RECEIVE_WORK_ORDER_DATA,
                data: result.workOrderInfo
            }
        case SECOND:
            return {
                type: ActionType.RECEIVE_MESSAGE_CENTER_DATA,
                data: result.IsReadCount
            }
        case THREE:
            return {
                type: ActionType.RECEIVE_PERSONAL_CENTER_DATA,
                data: result.IsReadCount
            }
    }
}

export const getHomeData = () => dispatch => {
    getHomeAlarmList(dispatch)
    getHomeAlarmCount(dispatch)
    getHomeWorkOrderCompletion(dispatch)
    getNoticeList(dispatch)
}

/**获取首页报警列表 */
let getHomeAlarmList = dispatch => {
    let url = Api.GetAlarmListByOption();
    let opt = {
        page: 0,
        pagesize: 3,
    }
    dispatch(utils.sendMsg(url, opt, "GET")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_ALARM_LIST,
            data: data
        });
    })
}

/**获取首页公告 */
let getNoticeList = dispatch => {
    let url = Api.GetNoticeList()
    let opt = {
        page: 1,
        pagesize: 5,
    }
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_NOTICE_LIST,
            data: data
        });
    })
}

/**获取首页未读报警数量 */
let getHomeAlarmCount = dispatch => {
    let url = Api.GetAlarmCount()
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_ALARM_COUNT,
            data: data
        });
    })
}

/**获取七日工单完成量 */
let getHomeWorkOrderCompletion = dispatch => {
    let url = Api.GetWorkOrderCompletion()
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_WORKORDER_COMPLETION,
            data: data.map((obj, key)=>{
                return {
                    name: obj.time,
                    value: obj.val
                }
            })
        });
    })
}


/**
 * 请求远程数据
 * @param {number} category  消息数据类型， 0 首页信息，1 工单信息，2 消息信息，3 我的信息
 * @param {number} status  状态类型，0, 1
 */
export const fetchData = (category, status = 0) => dispatch => {
    dispatch(requestData(category));
    // let _url = "/pvmtsys/messageSystemInfo/getMassageByType/" + type;
    let _url = "";
    switch(category) {
        case ZERO:
            _url = Api.MessageCenter;
            break;
        case FIRST:
            _url = Api.GetWorkOrdrDataByStatus(status);
            break;
        case SECOND:
            _url = Api.MessageCenter;
            break;
        case THREE:
            _url = Api.MessageCenter;
            break;
    }
    dispatch(utils.sendMsg(_url, null, "GET")).then(data => {
        dispatch(receiveData(data, category));
    })
}

export const changeHomeTabIndex = index => dispatch => {
    dispatch({
        type: ActionType.HOME_CHANGE_TAB,
        data: index
    })
}