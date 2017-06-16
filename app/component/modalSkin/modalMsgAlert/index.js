'use strict'
import * as React from 'react';

import * as ModalConst from '../../modal/modalConst'
import './index.scss'
import '../../../static/scss/common.scss'

class ModalMsgAlertSkin extends React.Component {

    constructor(props) {
        super(props);
    }

    handOk(){
        this.callBack(ModalConst.OK);
    }

    handYes(){
        this.callBack(ModalConst.YES)
    }

    handNo(){
        this.callBack(ModalConst.NO)
    }

    callBack(data){
        let { callBack } = this.props;
        callBack&&callBack(data);
    }

    componentDidMount(){
    }

    render() {
        let { title, message, buttonType, style} = this.props
        return (
            <div className="jgd-msg-box">
                <div className="jgd-msg-box-bg">
                    <div className="jgd-msg-box-title">{title}</div>
                    <div className="jgd-msg-box-content" style={style}>{message}</div>
                    {
                        buttonType == ModalConst.OK ?
                            <div className="jgd-msg-box-button-container">
                                <button className="jgd-msg-box-ok" onTouchTap={()=>this.handOk()}>确定</button>
                            </div>
                            :
                            <div className="jgd-msg-box-button-container">
                                <button className="jgd-msg-box-no" onTouchTap={()=>this.handNo()}>取消</button>
                                <button className="jgd-msg-box-yes" onTouchTap={()=>this.handYes()}>确定</button>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

ModalMsgAlertSkin.defaultProps = {
    title: "温馨提示",
    message: "",
    buttonType: "",
    callBack: null,
    style: {},
}

module.exports = ModalMsgAlertSkin;