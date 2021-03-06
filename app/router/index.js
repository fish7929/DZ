import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import * as RouterConst from '../static/const/routerConst'

const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Login = cb => require.ensure([], require => { cb(null, require('../view/login').default)}, "Login")
const Home = cb => require.ensure([], require => { cb(null, require('../view/home').default)}, "Home")
/**绑定手机 */
const BindMobile = cb => require.ensure([], require => { cb(null, require('../view/bindMobile').default)}, "BindMobile")
/**实时警报 */
const RealTimeAlarm = cb => require.ensure([], require => { cb(null, require('../view/realTimeAlarm').default)}, "RealTimeAlarm")
/**报警详情 */
const AlarmDetail = cb => require.ensure([], require => { cb(null, require('../view/alarmDetail').default)}, "AlarmDetail")
/**报警搜索 */
const AlarmSearch = cb => require.ensure([], require => { cb(null, require('../view/alarmSearch').default)}, "AlarmSearch")
/**电站监控 */
const PowerStationMonitor = cb => require.ensure([], require => { cb(null, require('../view/powerStationMonitor').default)}, "PowerStationMonitor")
/**电站详情 */
const PowerStationMonitorDetail = cb => require.ensure([], require => { cb(null, require('../view/powerStationMonitorDetail').default)}, "PowerStationMonitorDetail")
/**逆变器列表 */
const InverterList = cb => require.ensure([], require => { cb(null, require('../view/inverterList').default)}, "InverterList")
/**逆变器详情 */
const InverterDetail = cb => require.ensure([], require => { cb(null, require('../view/inverterDetail').default)}, "InverterDetail")
/**电表列表 */
const AmmeterList = cb => require.ensure([], require => { cb(null, require('../view/ammeterList').default)}, "AmmeterList")
/**故障反馈 */
const Feedback = cb => require.ensure([], require => { cb(null, require('../view/feedback').default)}, "Feedback")
/**修改密码 */
const ChangePw = cb => require.ensure([], require => { cb(null, require('../view/changePw').default)}, "ChangePw")
/**我的故障反馈 */
const MyFeedback = cb => require.ensure([], require => { cb(null, require('../view/myFeedback').default)}, "MyFeedback")
/**我的故障反馈详情 */
const MyFeedbackDetail = cb => require.ensure([], require => { cb(null, require('../view/myFeedbackDetail').default)}, "MyFeedbackDetail")
/**推送消息设置 */
const MyMessageSet = cb => require.ensure([], require => { cb(null, require('../view/myMessageSet').default)}, "MyMessageSet")

const Message = cb => require.ensure([], require => { cb(null, require('../view/message').default)}, "message");
const MessageDetail = cb => require.ensure([], require => { cb(null, require('../view/messageDetail').default)}, "messageDetail");
/**故障列表 */
const FaultList = cb => require.ensure([], require => { cb(null, require('../view/faultList').default)}, "faultList")
/**备品备件 */
const Sparepart = cb => require.ensure([], require => { cb(null, require('../view/sparepart').default)}, "sparepart")
/**备品备件 */
const ThirdContact = cb => require.ensure([], require => { cb(null, require('../view/thirdContact').default)}, "thirdContact")
/**离场申请 */
const Departure = cb => require.ensure([], require => { cb(null, require('../view/departure').default)}, "departure")
/**电站体检 */
const Physical = cb => require.ensure([], require => { cb(null, require('../view/physical').default)}, "physical")

/**故障处理反馈 */
const FaultDetail = cb => require.ensure([], require => { cb(null, require('../view/faultDetail').default)}, "faultDetail")


const checkLogin = (nextState, replace, next)=> {
	let user = Base.getLocalStorageItem("user")
	if(!user){
		replace(RouterConst.ROUTER_LOGIN)
	}
	next()//如果有值直接下一步
}

const Routers = {
	path: RouterConst.ROUTER_HOME,
	getComponent(nextState, cb){ App(cb) },
	indexRoute: {
		getComponent(nextState, cb){ Home(cb) },
		onEnter:checkLogin
	},
	childRoutes: [
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_HOME_TAB + '/:tab',
			getComponent(nextState, cb){ Home(cb) },
			
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_HOME_TAB + '/:tab/:type',
			getComponent(nextState, cb){ Home(cb) },
		},
		{
			path: RouterConst.ROUTER_LOGIN,
			getComponent(nextState, cb){ Login(cb) },
		},
		{
			path: RouterConst.ROUTER_BIND_MOBILE,
			getComponent(nextState, cb){ BindMobile(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_REAL_TIME_ALARM,
			getComponent(nextState, cb){ RealTimeAlarm(cb) }
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_ALARM_DETAIL + "/:id",
			getComponent(nextState, cb){ AlarmDetail(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.Router_AlARM_SEARCH,
			getComponent(nextState, cb){ AlarmSearch(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_POWER_STATION_MONITOR,
			getComponent(nextState, cb){ PowerStationMonitor(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_POWER_STATION_MONITOR_DETAIL + "/:id",
			getComponent(nextState, cb){ PowerStationMonitorDetail(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_INVERTER_LIST + "/:id",
			getComponent(nextState, cb){ InverterList(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_INVERTER_DETAIL + "/:id",
			getComponent(nextState, cb){ InverterDetail(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_AMMETER_LIST + "/:id",
			getComponent(nextState, cb){ AmmeterList(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_FEEDBACK,
			getComponent(nextState, cb){ Feedback(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_CHANGE_PASSWORD,
			getComponent(nextState, cb){ ChangePw(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_MY_FEEDBACK,
			getComponent(nextState, cb){ MyFeedback(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_MY_FEEDBACK_DETAIL + "/:id",
			getComponent(nextState, cb){ MyFeedbackDetail(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_MY_MESSAGE_SET,
			getComponent(nextState, cb){ MyMessageSet(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_MESSAGE + "/:type",
			getComponent(nextState, cb){ Message(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_MESSAGE_DETAIL + "/:id/:type",
			getComponent(nextState, cb){ MessageDetail(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_FAULT_LIST +  "/:order/:status/:param",
			getComponent(nextState, cb){ FaultList(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_SPAREPART + "/:order",
			getComponent(nextState, cb){ Sparepart(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_THIRD_CONTACT + "/:order",
			getComponent(nextState, cb){ ThirdContact(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_DEPARTURE + "/:order/:status",
			getComponent(nextState, cb){ Departure(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_PHYSICAL + "/:order/:status/:param",
			getComponent(nextState, cb){ Physical(cb) },
		},
		{
			onEnter:checkLogin,
			path: RouterConst.ROUTER_FAULT_DETAIL + "/:id/:status/:param",
			getComponent(nextState, cb){ FaultDetail(cb) },
		}
		
	]
}

export default Routers