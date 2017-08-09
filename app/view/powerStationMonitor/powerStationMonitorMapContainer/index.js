import React, { PropTypes } from 'react'

import * as utils from '../../../utils'

import './index.scss'
import psmIcon from '../../../static/images/map-p.png'
import operationIcon from '../../../static/images/operation_small.png'

class PowerStationMonitorMapContainer extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            mapIsReady: false
        }
    }

    componentDidMount(){
        utils.getCurrentPosition().then((r)=>{
            this.currentPosition = r;
            this.map = new BMap.Map("allMap")
            this.setState({mapIsReady: true})
        })
    }

    componentWillUnmount(){
        this.map = null;
    }

     openWinInfo(content, e){
        let opts = {
            enableCloseOnClick: false
        };
        var p = e.target;  
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);  
        var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象   
        this.map.openInfoWindow(infoWindow, point);                //开启信息窗口  
    }  

    render(){
        let { data } = this.props
        if(data.length && this.state.mapIsReady){
            this.map.clearOverlays()
            let user = Base.getLocalStorageObject("user")
            let { username, nickname, email, mobile, departmentName } = user
            data.map((obj, index)=>{
                let point = new BMap.Point(obj.lng, obj.lat)
                let icon = new BMap.Icon(psmIcon, new BMap.Size(30, 33))
                let marker = new BMap.Marker(point, {icon: icon});  // 创建标注\
                let content = "<div class='baiduPopWin'><p>"+ obj.name +"</p>" +
                              "<p>负责人：" + username +"</p>" +
                              "<p>地址："+obj.address+"</p></div>"
                marker.addEventListener("click", e => {
                    this.openWinInfo(content,e)
                });
                this.map.addOverlay(marker);              // 将标注添加到地图中
            })

            let p = new BMap.Point(this.currentPosition.point.lng, this.currentPosition.point.lat)
            let icon = new BMap.Icon(operationIcon, new BMap.Size(30, 36))
            let marker = new BMap.Marker(p, {icon: icon});  // 创建标注\
            let content = "<div class='baiduPopWin-p'><p>运维人员</p>" +
                            "<p>" + username +"</p>" +
                            "<a class='btnPhoneIcon' href='tel:"+mobile+"'>"+ mobile +"</a></div>"
            marker.addEventListener("click", e => {
                this.openWinInfo(content,e)
            });
            this.map.addOverlay(marker);              // 将标注添加到地图中
            this.map.centerAndZoom(p, 15);
        }

        return(
            <div className="psm-map-container">
                <div id="allMap" className="psm-map-div"></div>
            </div>
        )
    }

}

PowerStationMonitorMapContainer.PropTypes = {
    data: PropTypes.array.isRequired
}

export default PowerStationMonitorMapContainer