/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */
import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'

class Feedback extends React.Component{

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){
    }

    render(){
        return(
            <Page className="feedback-container">
                <Header title="故障反馈" isShowBack={true} />
                <div className="feedback-select-div">
                    <div className="header">
                        <span>电站名称</span>
                        <select placeholder="选择添加"></select>
                    </div>
                    <div className="feedback-select-list">
                        <div className="select-list-item"><span>江苏省镇江市2.12MW分布式光伏电站</span><button></button></div>
                    </div>
                </div>

                <div className="feedback-select-div">
                    <div className="header">
                        <span>设备类型</span>
                        <select placeholder="选择添加"></select>
                    </div>
                    <div className="feedback-select-list">
                        <div className="select-list-item"><span>逆变器</span><button></button></div>
                    </div>
                </div>

                <div className="feedback-main">
                    <div className="feedback-item">
                        <span>设备编号</span>
                        <input type="text" placeholder="请输入设备编号" />
                    </div>
                    <div className="feedback-item">
                        <span>故障级别</span>
                        <select placeholder="请选择故障级别"></select>
                    </div>
                    <div className="textarea-div">
                        <div className="title-txt">说明</div>
                        <textarea placeholder="请输入说明（可不填）" />
                    </div>
                    <div className="media-div">
                        <div className="media-title-div">上传附件<span className="media-desc">视频拍摄长度小于30秒</span></div>
                        <div className="media-content-div">
                            <div className="btn-media-result"></div>
                            <button className="btn-media"><span></span></button>
                        </div>
                    </div>
                </div>

                <div className="button-div">
                    <button>提交</button>
                    <button>提交并创建</button>
                </div>
            </Page>
        )
    }
}

export default Feedback