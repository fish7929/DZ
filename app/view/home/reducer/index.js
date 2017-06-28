/**
 * @component index.js
 * @description redux 动作常量
 * @time 2017-06-17 18:40
 * @author fishYu
 **/
import * as ActionType from './actionType'

const initialState = {
    tabIndex: 0,
    isFetching: false, //是否正在加载
    homeContainerList: [],
    workOrderList: [],
    messageCenterList: [],
    personalCenterList: [],

    alarmList: [],
    alarmCount: 0,
    //7日工单完成量
    workOrderCompletionList: [],
    //公告列表
    noticeList: []
}

export default function homeData(state = initialState, action) {
    switch (action.type) {
        case ActionType.HOME_CHANGE_TAB:
            return {
                ...state,
                tabIndex: action.data
            }
        case ActionType.REQUEST_HOME_DATA:
            return Object.assign(
                {},
                state,
                { isFetching: true }
            );
        case ActionType.RECEIVE_HOME_CONTAINER_DATA:  //首页
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    homeContainerList: action.data
                }
            ); 
        case ActionType.RECEIVE_WORK_ORDER_DATA:  //工单
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    workOrderList: action.data
                }
            );
        case ActionType.RECEIVE_MESSAGE_CENTER_DATA:  //消息中心
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    messageCenterList: action.data
                }
            );
        case ActionType.RECEIVE_PERSONAL_CENTER_DATA:  //我的
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    personalCenterList: action.data
                }
            );
        case ActionType.HOME_INIT_ALARM_LIST:
            return {
                ...state,
                alarmList: action.data.results
            }
        case ActionType.HOME_INIT_ALARM_COUNT:
            return {
                ...state,
                alarmCount: action.data.count
            }
        case ActionType.HOME_INIT_WORKORDER_COMPLETION:
            return {
                ...state,
                workOrderCompletionList: action.data
            }
        case ActionType.HOME_INIT_NOTICE_LIST:
            return {
                ...state,
                noticeList: action.data
            }
        default:
            return state
    }
}