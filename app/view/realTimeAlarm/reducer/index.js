import * as ActionType from './actionType'

const initialState = {
    tabIndex: 0,
    alarmList: [],
    pageTotal: 0
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.REAL_TIME_ALARM_LIST_INIT:
            return {
                ...state,
                alarmList: action.data.results,
                pageTotal: action.data.pageCounts
            }
        case ActionType.REAL_TIME_ALARM_CHANGE_TAB:
            return {
                ...state,
                tabIndex: action.data
            }
        default:
            return state
    }
}