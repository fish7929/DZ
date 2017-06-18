import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import * as RouterConst from '../static/const/routerConst'

const App = cb => require.ensure([], require => { cb(null, require('../view/main').default)}, "App")
const Login = cb => require.ensure([], require => { cb(null, require('../view/login').default)}, "Login")
const Home = cb => require.ensure([], require => { cb(null, require('../view/home').default)}, "Home")
const BindMobile = cb => require.ensure([], require => { cb(null, require('../view/bindMobile').default)}, "BindMobile")
const AlarmDetail = cb => require.ensure([], require => { cb(null, require('../view/alarmDetail').default)}, "AlarmDetail")
const RealTimeAlarm = cb => require.ensure([], require => { cb(null, require('../view/realTimeAlarm').default)}, "RealTimeAlarm")

const Message = cb => require.ensure([], require => { cb(null, require('../view/message').default)}, "message")
const MessageDetail = cb => require.ensure([], require => { cb(null, require('../view/messageDetail').default)}, "messageDetail")
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
			path: RouterConst.ROUTER_ALARM_DETAIL,
			getComponent(nextState, cb){ AlarmDetail(cb) },
		},
		{
			path: RouterConst.ROUTER_MESSAGE,
			getComponent(nextState, cb){ Message(cb) },
		},
		{
			path: RouterConst.ROUTER_MESSAGE_DETAIL,
			getComponent(nextState, cb){ MessageDetail(cb) },
		}
	]
}

export default Routers