import * as ActionType from './actionType'

const initialState = {
    list: []
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.PSM_LIST_INIT:
            return {
                ...state,
                list: action.data
            }
        default:
            return state
    }
}