
/**home api MessageCenter */
export const MessageCenter = "/pvmtsys/messageSystemInfo/getIsReadCount";

/**home api GetWorkOrdrDataByStatus */
export const GetWorkOrdrDataByStatus = (status) => "/pvmtsys/workOrderInfo/orderlist/" + status;

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
export const GetAlarmListByOption = "/pvmtsys/alarmInfo/getAlarmList"

/**AlarmDetail api GetAlarmDetailById + id */
export const GetAlarmDetailById = "/pvmtsys/alarmInfo/getAlarmByid/"


/**FaultList api GetFaultListByOrder + order */
export const GetFaultListByOrder = (orderNumber) => "/pvmtsys/workOrderFault/faultList/" + orderNumber;
