import * as ActionType from './actionType'

const initialState = {
    showType: ActionType.SHOW_TYPE_LIST,
    list: []
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.PSM_LIST_INIT:
            return {
                ...state,
                list: action.data.rows
            }
        case ActionType.PSM_CHANGE_SHOW_TYPE:
            return{
                ...state,
                showType: action.data
            }
        default:
            return state
    }
}