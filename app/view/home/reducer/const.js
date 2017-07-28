/**
 * created by at zhao
 */
import * as RouterConst from '../../../static/const/routerConst'

export const HOME_BTN_TABS = [
    {
        icon: "icon-alarm",
        title: "实时报警",
        link: RouterConst.ROUTER_REAL_TIME_ALARM
    },
    {
        icon: "icon-monitor",
        title: "电站监控",
        link: RouterConst.ROUTER_POWER_STATION_MONITOR
    },
    {
        icon: "icon-feedback",
        title: "故障反馈",
        link: RouterConst.ROUTER_FEEDBACK
    },
    {
        icon: "icon-patrol",
        title: "巡查助手",
        link: ""
    }
]