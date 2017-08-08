import * as ActionType from './actionType'

const initialState = {
    list: [],
    total: 0
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_AMMETER_LIST:
            return {
                ...state,
                list: action.data.results,
                total: action.data.pageCounts
            }
        default:
            return state
    }
}