import * as ActionType from './actionType'

const initialState = {
    powerStations: [],
    deveiceTypes: [],
    deveiceNumbers: []
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_FEEDBACK_POWER_STATION_LIST:
            return {
                ...state,
                powerStations: action.data
            }
        case ActionType.INIT_FEEDBACK_DEVICE_TYPES:
            return {
                ...state,
                deveiceTypes: action.data
            }
        case ActionType.INIT_FEEDBACK_DEVICE_NUMBER:
            return{
                ...state,
                deveiceNumbers: action.data
            }
        default:
            return state
    }
}