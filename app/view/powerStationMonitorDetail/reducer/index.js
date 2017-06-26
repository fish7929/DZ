import * as ActionType from './actionType'

const initialState = {
    powerData: {
        //逆变器总数
        InverterCounts: 0,
        //通讯异常数量
        communicationAnomaly: 0,
        //实际故障次数
        faultCounts: 0,
        //故障运行
        faultOperation: 0,
        //故障排除比例
        faultSaved: 0,
        //功率
        generatedActivePower: 0,
        //日发电量
        generationDaily: 0,
        //日发电量数组
        generationDailyList: [
            {
                //日发电量
                generationDaily: 0,
                //时间
                time: 0
            }
        ],
        //湿度
        humidity: 0,
        //电站id
        id: 0,
        //辐照度
        irradiance: 0,
        //最后一次体检时间
        lastPhysicalExaminationTime: 0,
        /** 体检次数*/
        physicalExaminationCounts: 0,
        /**电站名称 */
        powerStationName: "",
        /**功率时间曲线图 */
        powerTime: {
            /**功率 */
            power: 0,
            /**时间 */
            time: 24178
        },
        /**PR值 */
        pr: 0,
        /**停机数 */
        stop: 0,
        /**温度 */
        temperature: 0,
        /**组件温度 */
        temperatureofModules: 0,
        /**总报警次数 */
        totalAlarmsCounts: 0,
        /**风向 */
        windDirection: 0,
        /**	风速 */
        windSpeed: 0
    }
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.PSM_DETAIL_INIT:
            return {
                ...state,
                powerData: action.data
            }
        default:
            return state
    }
}