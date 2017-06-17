/**
 * @component index.js
 * @description redux 动作常量
 * @time 2017-06-17 18:40
 * @author fishYu
 **/
import * as ActionType from './actionType'

const initialState = {
    isFetching: false, //是否正在加载
    data: {}
}

export default function messageDetail(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_MESSAGE_DETAIL_DATA:
            return Object.assign(
                {},
                state,
                { isFetching: true }
            );
        case ActionType.RECEIVE_MESSAGE_DETAIL_DATA:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    data: action.data
                }
            );
        default:
            return state
    }
}