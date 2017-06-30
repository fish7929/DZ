export const baiduApi = "http://api.map.baidu.com/api?v=2.0&ak=3j6qn3gMTZgGCzOegAxyF3wP"

/**home api MessageCenter */
export const MessageCenter = "/pvmtsys/messageSystemInfo/getIsReadCount";

/**home api GetWorkOrdrDataByStatus */
export const GetWorkOrdrDataByStatus = (status) => "/pvmtsys/workOrderInfo/orderlist/" + status;

export const GetNoticeList = () => "/pvmtsys/noticeReader/queryNoticeList"

/**MessageDetail api GetMessageDetailByIdAndStatus */
export const GetMessageDetailByIdAndStatus = (id, status) => {
    if(!status){
        return "/pvmtsys/sender/readLetter/" + id;
    }else {
        return "/pvmtsys/noticeReader/queryNoticeOne/" + id + "/" + status;
    } 
}

/**Message api GetMessageDataByType */
export const GetMessageDataByType = (type) => "/pvmtsys/messageSystemInfo/getMassageByType/" + type;

/**realTimeAlarm api  GetAlarmListByOption 
@opt: {
 
 }
*/
export const GetAlarmListByOption = () => "/pvmtsys/alarmInfo/getAlarmList"

//获取未读报警消息数量
export const GetAlarmCount = () => "/pvmtsys/alarmInfo/getNoReadCount"

/**AlarmDetail api GetAlarmDetailById + id */
export const GetAlarmDetailById = id => "/pvmtsys/alarmInfo/getAlarmByid/" + id

/**获取用户电站列表 */
export const GetUserPowerStation = () => "/pvmtsys/powerStation/getPowerStationInfo"
/**powerStationDetails + /id 电站详情 */
export const GetPowerStationDetail = id => "/pvmtsys/powerStation/powerStationDetails/" + id;
/**inverterList 逆变器列表 */
export const GetInverterInfo = powerStationId => "/pvmtsys/powerStation/getInverterInfo/" + powerStationId;
/**inverterDetail 逆变器详情 */
export const GetInverterDetail = inverterId =>  "/pvmtsys/inverter/getInverteInfo/" + inverterId


/**FaultList api GetFaultListByOrder + order */
export const GetFaultListByOrder = (orderNumber) => "/pvmtsys/workOrderFault/faultList/" + orderNumber;

/**Sparepart api GetSparepartDataByOrder + order */
export const GetSparepartDataByOrder = (orderNumber) => "/pvmtsys/sparepartMapping/spareInfo/" + orderNumber;

/**ThirdContact api GetThirdContactDataByOrder + order */
export const GetThirdContactDataByOrder = (orderNumber) => "/pvmtsys/thirdContact/thirdContact/" + orderNumber;

/**Departure api GetDepartureDataByOrder + order */ 
export const GetDepartureDataByOrder = (orderNumber) => "/pvmtsys/departure/departureInfo/" + orderNumber;
/**Physical api GetPhysicalDataByOrder + order */ 
export const GetPhysicalDataByOrder = (orderNumber) => "/pvmtsys/physical/physicalInfo/" + orderNumber;


/**FaultDetail api GetFaultDetailById + id */ 
export const GetFaultDetailById = (id) => "/pvmtsys/faultInfo/getFaultInfo/" + id;

/**七日工单完成量 图表 */
export const GetWorkOrderCompletion = () => '/pvmtsys/workOrderInfo/workOrderCompletion'

/**我的故障反馈列表 */
export const GetUserFaultList = () => "/pvmtsys/faultInfo/getUserFaultList"
