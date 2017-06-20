/**
 * @component index.js
 * @description redux 动作常量
 * @time 2017-06-17 18:40
 * @author fishYu
 **/
import * as ActionType from './actionType'

const initialState = {
    isFetching: false, //是否正在加载
    list: []
}

export default function sparepartData(state = initialState, action) {
    switch (action.type) {
        case ActionType.REQUEST_SPAREPART_DATA:
            return Object.assign(
                {},
                state,
                { isFetching: true }
            );
        case ActionType.RECEIVE_SPAREPART_DATA:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false, //是否正在加载
                    list: action.data
                }
            );
        default:
            return state
    }
}