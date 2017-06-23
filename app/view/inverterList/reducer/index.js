import * as ActionType from './actionType'

const initialState = {
    tabIndex: 0,
    inverterList: []
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INVERTER_INIT_LIST:
            return {
                ...state,
                inverterList: action.data
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