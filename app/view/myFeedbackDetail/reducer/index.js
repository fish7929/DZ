import * as ActionType from './actionType'

const initialState = {
    //附件列表
    attachmentList: [],
    //设备类型
    equipmentType: "",
    //故障等级
    faultGrade: "",
    //故障原因
    faultMessage: "",
    //故障状态
    faultStatus: "",
    //故障详情说明
    state: "",
    //故障来源
    faultSource: 0,
    //电站名称
    powerStationName: ""
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.MY_FEEDBACK_DETAIL_INIT:
            console.log(action.data)
            return {
                ...state,
                powerStationName: action.data.powerStationName,
                attachmentList: action.data.attachmentList,
                equipmentType: action.data.equipmentType,
                faultGrade: action.data.faultGrade,
                faultStatus: action.data.faultStatus,
                state: action.data.state,
                faultSource: action.data.faultSource,
                faultMessage: action.data.faultMessage
            }
        default:
            return state
    }
}