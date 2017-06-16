'use strict'
import * as React from 'react';

import WinMark from "./winMark.js";

//modal skin
// import Alert from "./alert.js";
import { ModalSuccessAlertSkin, ModalAutoCloseSkin, ModalMsgAlertSkin, ModalMemberAlertSkin } from '../modalSkin'
import * as ModalConst from './modalConst'

class HelpModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modal: {},
            showModal: false,
            showMask: false
        }

        this.alert = this.alert.bind(this);
        this.ask = this.ask.bind(this);

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.clear = this.clear.bind(this);
    }

    alert(data, skinName){
        return this.show({...data, buttonType: ModalConst.OK}, skinName);
    }

    ask(data, skinName){
        return this.show({...data, buttonType: ModalConst.YES | ModalConst.NO}, skinName);
    }

    clear(){
        this.setState({
            showModal: false,
            showMask: false
        })
    }
    
    close(){
        return new Promise((resolve, reject)=>{
            this.setState({
                showModal: false,
                showMask: false,
                modal:{}
            })

            setTimeout(()=>{
                this.setState({
                    showModal:false,
                    showMask: false,
                    modal:{}
                })
                resolve()
            }, 300)
        }) 
    }


    show(data, skinName){
        return new Promise((resolve, reject)=>{
            let modal = Object.assign({},{
                ...data,
                callBack: result => this.close().then(()=>resolve(result))
            })
            let isFind = [ModalConst.MODAL_AUTO_CLOSE_SKIN].find((name)=>{return name==skinName})
            this.setState({
                showModal:true,
                showMask: isFind ? false : true,
                modal,
                skinName
            })
        })
    }

    getAlertSkin(skinName, modal){
        switch(skinName){
            case ModalConst.MODAL_SUCCESS_ALERT_SKIN:
                return <ModalSuccessAlertSkin {...modal} />
            case ModalConst.MODAL_AUTO_CLOSE_SKIN:
                return <ModalAutoCloseSkin {...modal} />
            case ModalConst.MODAL_ALERT_SKIN:
                return <ModalAlertSkin {...modal} />
            case ModalConst.MODAL_ALERT_MEMBER_SKIN:
                return <ModalMemberAlertSkin {...modal} />
            default:
                return <ModalMsgAlertSkin {...modal} />
        }
    }


    render(){
        let {showModal, modal, skinName, showMask} = this.state
        modal.show = showModal
        let skin = modal.show ? this.getAlertSkin(skinName, modal) : ""
        return (
            <div className="help">
                <WinMark show={showMask}/>
                {skin}
            </div>
        )
    }

}

module.exports = HelpModal;