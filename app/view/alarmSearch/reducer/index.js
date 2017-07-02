import * as ActionType from './actionType'

const initialState = {
    powerStations: [],
    searchList: [],
    pageTotal: 0
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_ALARM_SEARCH_POWERSTATION:
            return {
                ...state,
                powerStations: action.data.rows
            }
        case ActionType.INIT_ALARM_SEARCH_RESULT_DATA:
            return {
                ...state,
                searchList: action.data.results,
                pageTotal: action.data.pageCounts
            }
        default:
            return state
    }
}