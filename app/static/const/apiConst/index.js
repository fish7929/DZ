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
        return "/pvmtsys/noticeReader/queryNoticeOne/" + id ;
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
export const GetInverterInfo = () => "/pvmtsys/powerStation/getInverterInfo";
/**inverterDetail 逆变器详情 */
export const GetInverterDetail = inverterId =>  "/pvmtsys/inverter/getInverteInfo/" + inverterId

/**电表列表 */
export const GetAmmeterList = id => "/pvmtsys/powerStation/getAmmeterInfo/" + id

/**FaultList api GetFaultListByOrder + order */
export const GetFaultListByOrder = (orderNumber) => "/pvmtsys/workOrderFault/faultList/" + orderNumber;

/**Sparepart api GetSparepartDataByOrder + order */
export const GetSparepartDataByOrder = (orderNumber) => "/pvmtsys/sparepartMapping/spareInfo/" + orderNumber;

/**ThirdContact api GetThirdContactDataByOrder + order */
export const GetThirdContactDataByOrder = (orderNumber) => "/pvmtsys/thirdContact/thirdContact/" + orderNumber;

/**Departure 离场申请api GetDepartureDataByOrder + order */ 
export const GetDepartureDataByOrder = (orderNumber) => "/pvmtsys/departure/departureInfo/" + orderNumber;
export const SaveDeparture = () => '/pvmtsys/departure/saveDeparture';

/**Physical  电站体检api GetPhysicalDataByOrder + order */ 
export const GetPhysicalDataByOrder = (orderNumber) => "/pvmtsys/physical/physicalInfo/" + orderNumber;
//保存电站体检
export const SavePhysicalExamine = () => '/pvmtsys/physical/editExamine';
export const CompletedPhysicalByOrder = (orderNumber) => '/pvmtsys/workOrderInfo/physicalSubmit/' + orderNumber;

/**FaultDetail api GetFaultDetailById + id */ 
export const GetFaultDetailById = (id) => "/pvmtsys/faultInfo/getFaultInfo/" + id;

/**七日工单完成量 图表 */
export const GetWorkOrderCompletion = () => '/pvmtsys/workOrderInfo/workOrderCompletion'

/**我的故障反馈列表 */
export const GetUserFaultList = () => "/pvmtsys/faultInfo/getUserFaultList"

export const getMyFeedbackDetail = id => "/pvmtsys/faultInfo/getFaultInfo/" + id

/**版本号 */
export const GetAppVersion = () => "/pvmtsys/version/newVersion"

/**获取我的消息状态 */
export const GetMyMessageStatus = () => ""

/**修改我的消息状态 */
export const ChangeMyMessageStatus = () => "/pvmtsys/settingInfo/updateUserSetting"

/**获取电站设备类型 */
export const GetPowerStationDeviceTypes = id => "/pvmtsys/powerStation/getEquipmentType/" + id

export const GetUploadApi = () => "/tools/file/upload"

export const InsertFaultInfo = () => "/pvmtsys/faultInfo/insert"


export const UserLogin = () => "/pvmtsys/user/api/login"

export const UserChangePw = () => "pvmtsys/user/resetpsw"
