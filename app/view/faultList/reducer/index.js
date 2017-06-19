/**
 * @component index.js
 * @description redux 动作常量
 * @time 2017-06-17 18:40
 * @author fishYu
 **/
import * as ActionType from './actionType'

const initialState = {
    isFetching: false, //是否正在加载
    faultList: []
}

export default function faultData(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_FAULT_DATA:
            return Object.assign(
                {},
                state,
                { isFetching: true }
            );
        case ActionType.RECEIVE_FAULT_DATA:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    faultList: action.data
                }
            );
        default:
            return state
    }
}