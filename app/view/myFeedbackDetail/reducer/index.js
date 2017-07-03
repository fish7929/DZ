import * as ActionType from './actionType'

const initialState = {
    //附件列表
    attachmentList: [],
    //设备类型
    equipmentType: "",
    //故障等级
    faultGrade: "",
    //故障状态
    faultStatus: "",
    //故障详情说明
    state: ""
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.MY_FEEDBACK_DETAIL_INIT:
            return {
                ...state
            }
        default:
            return state
    }
}