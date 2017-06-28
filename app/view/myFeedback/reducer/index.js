import * as ActionType from './actionType'

const initialState = {
    myFeedbackList: [],
    pageTotal: 0
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_MY_FEEDBACK_LIST:
            return {
                ...state,
                myFeedbackList: action.data.results,
                pageTotal: action.data.pageCounts
            }
        default:
            return state
    }
}