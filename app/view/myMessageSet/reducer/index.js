import * as ActionType from './actionType'

const initialState = {
    letter: 0,
    system: 0,
    threeAlarm: 0,
    twoAlarm: 0
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.MY_MESSAGE_UPDATE:
            return {
                ...state,
                letter: action.data.letter,
                system: action.data.system,
                threeAlarm: action.data.threeAlarm,
                twoAlarm: action.data.twoAlarm
            }
        default:
            return state
    }
}