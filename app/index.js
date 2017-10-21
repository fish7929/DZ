import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
import GlobalVar from "./utils/GlobalVar";
import { history, store} from './redux'
import Routers from './router'
import iNoBounce from "./lib/inobounce";
import iDevice from "./lib/device";
//修正ios回弹
if(iDevice.ios()){
    iNoBounce.enable();
}
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={Routers}></Router>
    </Provider>,
    document.getElementById('app')
)
