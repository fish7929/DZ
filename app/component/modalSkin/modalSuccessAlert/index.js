'use strict'
import * as React from 'react';

import * as ModalConst from '../../modal/modalConst'
import Velocity from '../../velocity'
import './index.scss'
import '../../../static/scss/common.scss'

class ModalSuccessAlertSkin extends React.Component {

    constructor(props) {
        super(props);
    }

    handOk(){
        this.callBack(ModalConst.YES);
    }

    handCancel(){
        this.callBack(ModalConst.NO)
    }

    callBack(data){
        let { callBack } = this.props;
        callBack&&callBack(data);
    }

    render() {
        let {show, tip} = this.props;
        return (
            <Velocity show={show} >
                <div className="alert-success-skin">
                    <div className="alert-success-container ">
                        <div className="alert-success-icon"></div>
                        <div className="alert-success-tip">{ tip }</div>
                        <button className="alert-button-ok" onClick={()=>this.handOk()}>我知道了</button>
                    </div>
                </div>
            </Velocity>
        )
    }
};

ModalSuccessAlertSkin.defaultProps = {
    show: false,
    tip: "我知道了"
}

module.exports = ModalSuccessAlertSkin;