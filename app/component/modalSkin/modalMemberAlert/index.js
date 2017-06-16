'use strict'
import * as React from 'react';

import * as ModalConst from '../../modal/modalConst'
import './index.scss'
import '../../../static/scss/common.scss'

class ModalMemberAlertSkin extends React.Component {

    constructor(props) {
        super(props);
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
        return (
            <div className="alert-member-skin">
                <div className="alert-member-container">
                    <div className="alert-member-icon"></div>
                    <div className="alert-member-tip">只有会员才能体验该功能哦！</div>
                    <div className="alert-member-btn-div">
                        <button className="alert-button-no" onTouchTap={()=>this.handNo()}>取消</button>
                        <button className="alert-button-ok" onTouchTap={()=>this.handYes()}>成为会员</button>
                    </div>
                </div>
            </div>
        )
    }
}

ModalMemberAlertSkin.defaultProps = {
    callBack: null,
}

module.exports = ModalMemberAlertSkin;