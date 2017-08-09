import * as ActionType from './actionType'

const initialState = {
    data: {
        //逆变器效率
        efficiency: 0,
        //日发电量
        generationDaily: 0,
        //累计发电量
        generationGross: 0,
        //月发电量
        generationMonth: 0,
        //年发电量
        generationYear: 0,
        //一级报警数量
        level1: 0,
        //二级报警数量
        level2: 0,
        //三级报警数量
        level3: 0,
        //直流参数
        mppt: [
            {
                "mppt1/2/3": "",
                "value": 0
            }
        ],
        //交流参数
        phaseVoltageParam: [
            {
                "A/B/C相": "",
                "value": 0
            }
        ],
        //温度功率时间曲线
        powerTemperatureTime: [
        ],
        //逆变器温度
        temperature: 0,
        //	交流总功率
        threePhaseActivePower: 0,
        //直流总功率
        totalInputPower: 0
    }
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_INVERTER_DETAIL:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}