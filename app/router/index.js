import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as RouterConst from '../static/const/routerConst'

const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Login = cb => require.ensure([], require => { cb(null, require('../view/login').default)}, "Login")
const Home = cb => require.ensure([], require => { cb(null, require('../view/home').default)}, "Home")
const BindMobile = cb => require.ensure([], require => { cb(null, require('../view/bindMobile').default)}, "BindMobile")
const RealTimeAlarm = cb => require.ensure([], require => { cb(null, require('../view/realTimeAlarm').default)}, "RealTimeAlarm")
const AlarmDetail = cb => require.ensure([], require => { cb(null, require('../view/alarmDetail').default)}, "AlarmDetail")
const AlarmSearch = cb => require.ensure([], require => { cb(null, require('../view/alarmSearch').default)}, "AlarmSearch")
/**电站监控 */
const PowerStationMonitor = cb => require.ensure([], require => { cb(null, require('../view/powerStationMonitor').default)}, "PowerStationMonitor")

const Message = cb => require.ensure([], require => { cb(null, require('../view/message').default)}, "message");
const MessageDetail = cb => require.ensure([], require => { cb(null, require('../view/messageDetail').default)}, "messageDetail");
/**故障列表 */
const FaultList = cb => require.ensure([], require => { cb(null, require('../view/faultList').default)}, "faultList")
const Routers = {
	path: RouterConst.ROUTER_HOME,
	getComponent(nextState, cb){ App(cb) },
	indexRoute: {
		getComponent(nextState, cb){ Home(cb) }
	},
	childRoutes: [
		{
			path: RouterConst.ROUTER_LOGIN,
			getComponent(nextState, cb){ Login(cb) },
		},
		{
			path: RouterConst.ROUTER_BIND_MOBILE,
			getComponent(nextState, cb){ BindMobile(cb) },
		},
		{
			path: RouterConst.ROUTER_REAL_TIME_ALARM,
			getComponent(nextState, cb){ RealTimeAlarm(cb) }
		},
		{
			path: RouterConst.ROUTER_ALARM_DETAIL + "/:id",
			getComponent(nextState, cb){ AlarmDetail(cb) },
		},
		{
			path: RouterConst.Router_AlARM_SEARCH,
			getComponent(nextState, cb){ AlarmSearch(cb) },
		},
		{
			path: RouterConst.ROUTER_POWER_STATION_MONITOR,
			getComponent(nextState, cb){ PowerStationMonitor(cb) },
		},
		{
			path: RouterConst.ROUTER_MESSAGE + "/:type",
			getComponent(nextState, cb){ Message(cb) },
		},
		{
			path: RouterConst.ROUTER_MESSAGE_DETAIL + "/:id/:type",
			getComponent(nextState, cb){ MessageDetail(cb) },
		},
		{
			path: RouterConst.ROUTER_FAULT_LIST + "/:order/:param",
			getComponent(nextState, cb){ FaultList(cb) },
		}
	]
}

export default Routers