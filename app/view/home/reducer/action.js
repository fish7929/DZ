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
function receiveData(result, category, currentPage) {
    switch(category) {
        case ZERO:
            return {
                type: ActionType.RECEIVE_HOME_CONTAINER_DATA,
                data: result.IsReadCount
            }
        case FIRST:
            return {
                type: ActionType.RECEIVE_WORK_ORDER_DATA,
                data: result.results,
                total: result.pageCounts,
                currentPage: currentPage
            }
        case SECOND:
            return {
                type: ActionType.RECEIVE_MESSAGE_CENTER_DATA,
                data: result
            }
        case THREE:
            return {
                type: ActionType.RECEIVE_PERSONAL_CENTER_DATA,
                data: result.IsReadCount
            }
    }
}

export const getHomeData = () => dispatch => {
    getNoticeList(dispatch)
    getHomeAlarmList(dispatch)
    getHomeAlarmCount(dispatch)
    getHomeWorkOrderCompletion(dispatch)
    getUserPowerStation(dispatch)
}

/**获取首页公告 */
let getNoticeList = dispatch => {
    let url = Api.GetNoticeList()
    let opt = {
        page: 1,
        pagesize: 10,
    }
    dispatch(utils.sendMsg(url, opt, "POST")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_NOTICE_LIST,
            data: data
        });
    })
}

/**获取首页报警列表 */
let getHomeAlarmList = dispatch => {
    let url = Api.GetMessageDataByType();
    let opt = {
        page: 1,
        pagesize: 5,
        isread: 0,
        massageType: 1
    }
    dispatch(utils.sendMsg(url, opt, "GET")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_ALARM_LIST,
            data: data
        });
    })
}

/**获取首页未读报警数量 */
let getHomeAlarmCount = dispatch => {
    let url = Api.GetAlarmCount()
    dispatch(utils.sendMsg(url, {}, "POST")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_ALARM_COUNT,
            data: data
        });
    })
}

/**获取用户电站列表
 * 电站监控列表
 * PR值监控
 * 报警分布
 */
let getUserPowerStation = dispatch => {
    let url = Api.GetUserPowerStation()
    let opt = {
        page: 1,
        pageSize: 3
    }
    dispatch(utils.sendMsg(url, {}, "POST")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_USER_POWER_STATION,
            data: {
                psList: data.map(obj => { return { ...obj }}),
                prList: data.map(obj => { return {name: obj.name, value: obj.pr.toFixed(2)}}),
                fbList: data.map(obj => { return {name: obj.name, value: obj.alarms}}),
                fdList: data.map(obj => { return {name: obj.name, value: [obj.installCapacity.toFixed(2), obj.generationDaily.toFixed(2)]}})
            }
        })
    })
}

/**获取七日工单完成量 */
let getHomeWorkOrderCompletion = dispatch => {
    let url = Api.GetWorkOrderCompletion()
    let opt = {
        startDate: utils.formatDate(Date.now() - 7 * 24 * 3600 * 1000, "yyyy-MM-dd"),
        endDate: utils.formatDate(Date.now(), "yyyy-MM-dd")
    }
    dispatch(utils.sendMsg(url, opt, "GET")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_WORKORDER_COMPLETION,
            data: data.map((obj, key)=>{
                return {
                    name: utils.formatDate(obj.time, "MM-dd"),
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
export const fetchData = (category, status = 0, currentPage = 1) => dispatch => {
    dispatch(requestData(category));
    // let _url = "/pvmtsys/messageSystemInfo/getMassageByType/" + type;
    let _url = "", method="GET";
    switch(category) {
        case ZERO:
            _url = Api.MessageCenter;
            method = "POST"
            break;
        case FIRST:
            _url = Api.GetWorkOrdrDataByStatus(status);
            break;
        case SECOND:
            _url = Api.MessageCenter;
            method = "POST"
            break;
        case THREE:
            _url = Api.MessageCenter;
            method = "POST"
            break;
    }
    let opt = category == FIRST ? {page: currentPage, pagesize: 10} : null;
    dispatch(utils.sendMsg(_url, opt, method)).then(data => {
        dispatch(receiveData(data, category, currentPage));
    })
}

export const changeHomeTabIndex = index => dispatch => {
    dispatch({
        type: ActionType.HOME_CHANGE_TAB,
        data: index
    })
}

export const getAppVersion = () => dispatch => {
    let url = Api.GetAppVersion()
    dispatch(utils.sendMsg(url, {}, "GET")).then(data => {
        dispatch({
            type: ActionType.HOME_INIT_APP_VERSION,
            data: data.version
        });
    })
}