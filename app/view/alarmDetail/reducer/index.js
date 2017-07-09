import * as ActionType from './actionType'

const initialState = {
    alarmData: {
        alarmGrade: 0,
        alarmMessage: "",
        alarmTime: "",
        attachmentList: [],
        powerStationBaseInfo: {
            name: ""
        },
        explain: "",
        alarmInfoList: [],
        status: 0
    }
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.ALARM_DETAIL_INIT:
            return {
                ...state,
                alarmData: action.data
            }
        default:
            return state
    }
}