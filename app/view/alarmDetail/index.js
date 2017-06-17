import React, { PropTypes } from 'react'

import Page from '../../component/page'
import Header from '../../component/header'

import './index.scss'

class AlarmDetail extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){

    }

    render(){
        return(
            <Page className="alarm-detail-container">
                <Header title="报警详情" isShowBack={true} />
                <div className="alarm-detail-name">
                    <div>
                        <div></div>
                        <div>已提交</div>
                    </div>
                    <div>
                        <div>江苏省神将是很熟按粗野分布式光伏电站</div>
                        <div>直流电压过低</div>
                        <div>2017-05-16 22:33:33</div>
                    </div>
                </div>
                <div>
                    <div>电站位置</div>
                    <div>背景市朝阳区曙光西里6号楼</div>
                    <div></div>
                </div>
                <div>
                    <div>本设备近3个月报警历史<span className="animation-arrow" /></div>
                    <div>
                        <div>
                            <div>
                                <div>逆变器电压低</div>
                                <div>2017-05-15 12:12:12</div>
                            </div>
                            <div>
                                <div>逆变器电压低</div>
                                <div>2017-05-15 12:12:12</div>
                            </div>
                            <div>
                                <div>逆变器电压低</div>
                                <div>2017-05-15 12:12:12</div>
                            </div>
                            <div>
                                <div>逆变器电压低</div>
                                <div>2017-05-15 12:12:12</div>
                            </div>
                            <div>89.43</div>
                        </div>
                        <div>该设备近3个月没有报警记录</div>
                    </div>
                </div>
                <div>
                    <div>说明</div>
                    <textarea placeholder="请输入说明（可不填）" />
                </div>
                <div>
                    <div>上传附件<span>视频拍摄长度小于30秒</span></div>
                    <div></div>
                </div>

                <button>提交</button>
            </Page>
        )
    }
}

AlarmDetail.PropTypes = {

}

export default AlarmDetail