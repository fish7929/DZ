import * as ActionType from './actionType'

const initialState = {
    tabIndex: 0,
    inverterList: [],
    total: 0
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INVERTER_INIT_LIST:
            return {
                ...state,
                inverterList: action.data.results,
                total: action.data.pageCounts
            }
        case ActionType.INVERTER_CHANGE_TAB:
            return{
                ...state,
                tabIndex: action.data
            }
        default:
            return state
    }
}