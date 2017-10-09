/**
 * @component index.js
 * @description redux 动作常量
 * @time 2017-06-17 18:40
 * @author fishYu
 **/
import * as ActionType from './actionType'

const initialState = {
    isFetching: false, //是否正在加载
    list: null,
    total: 1   //总页数
}

export default function messageData(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_MESSAGE_DATA:
            return Object.assign(
                {},
                state,
                { isFetching: true }
            );
        case ActionType.RECEIVE_MESSAGE_DATA:
            let _list = action.currentPage == 1 ? action.data : state.list.concat(action.data);
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    list: _list,
                    total: action.total
                }
            );
        case ActionType.RECEIVE_MESSAGE_REFRESH:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    list: null
                }
            );
        default:
            return state
    }
}