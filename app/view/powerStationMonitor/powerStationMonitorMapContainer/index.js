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
            this.currentP = r;
            console.log(r);
            this.map = new BMap.Map("allMap", {minZoom: 5});
            this.map.addEventListener("onzoomend", ()=>this.onZoomHandler());
            this.map.addEventListener("dragstart", ()=>this.onDragStartHandler());
            this.map.addEventListener("dragend", ()=>this.onDragEndHandler());
            let p = new BMap.Point(r.point.lng, r.point.lat)
            let icon = new BMap.Icon(operationIcon, new BMap.Size(30, 36))
            let marker = new BMap.Marker(p, {icon: icon});  // 创建标注\
            this.map.addOverlay(marker);
            this.map.centerAndZoom(p, 15);
            this.map.enableScrollWheelZoom();
            this.setState({mapIsReady: true})
        })
    }

    onZoomHandler(){
        console.log(this.map.getZoom());
        console.log(this.map.getBounds());
        this.getData();
    }


    onDragStartHandler(){
        this.timer = setInterval(()=>this.getData(), 500)
    }

    onDragEndHandler(){
        clearInterval(this.timer)
        this.timer = null;
        this.getData();
    }

    getData(){
        let bounds = this.map.getBounds()
        let zoomLevel = this.map.getZoom();
        let type = 0;
        switch (zoomLevel) {
            case 11:
            case 12:
            case 13:
                type = 1;
                break;
            case 8:
            case 9:
            case 10:
                type = 2;
                break;
            case 5:
            case 6:
            case 7:
                type = 3;
                break;
            default:
                break;
        }
        let opt = {
            neLat: bounds.Ll.lat,
            neLng: bounds.Ll.lng,
            swLat: bounds.ul.lat,
            swLng: bounds.ul.lng,
            type: zoomLevel
        }
        this.props.getListByMapLevel(opt)
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

    getPowerStationMarker(data, username){
        let point = new BMap.Point(obj.lng, obj.lat)
        let icon = new BMap.Icon(psmIcon, new BMap.Size(30, 33))
        let marker = new BMap.Marker(point, {icon: icon});  // 创建标注\
        let content = "<div class='baiduPopWin'><p>"+ obj.name +"</p>" +
                        "<p>负责人：" + username +"</p>" +
                        "<p>地址："+obj.address+"</p></div>"
        marker.addEventListener("click", e => {
            this.openWinInfo(content,e)
        });

        return marker
    }

    getPersonalMarket(data){
        let p = new BMap.Point(data.lng, data.lat)
        let icon = new BMap.Icon(operationIcon, new BMap.Size(30, 36))
        let marker = new BMap.Marker(p, {icon: icon});  // 创建标注\
        let content = "<div class='baiduPopWin-p'><p>运维人员</p>" +
                        "<p>" + data.userName +"</p>" +
                        "<a class='btnPhoneIcon' href='tel:"+data.mobile+"'>"+ data.mobile +"</a></div>"
        marker.addEventListener("click", e => {
            this.openWinInfo(content,e)
        });

        return marker
    }

    getLable(data){
        let p = new BMap.Point(data.lng, data.lat);
        let content = "<div class='baiduPopWin-p'><p>"+data.areaName+"</p>" +
                        "<p>电站数量:"+data.persionCounts+"</p>" +
                        "<p>人员数量:"+data.powerStationCounts+"</p>";
        let label = new BMap.Label(content, {position: p});
        let style = {
            border: 0,
            padding: "10px"
        }
        label.setStyle(style)
        return label;
    }

    render(){
        let { data, userList, mapLevelData } = this.props
        if(data.length && this.state.mapIsReady){
            this.map.clearOverlays();
            let user = Base.getLocalStorageObject("user")
            let { username, nickname, email, mobile, departmentName } = user;

            if(mapLevelData.length === 0){
                data.map((obj, index)=>{
                    let marker = this.getPowerStationMarker(obj, username);
                    this.map.addOverlay(marker);              // 将标注添加到地图中
                })

                userList.map(obj => {
                    let marker = this.getPersonalMarket(obj);
                    this.map.addOverlay(marker);
                })
            } else {
                mapLevelData.map(obj=>{
                    let label = this.getLable(obj);
                    this.map.addOverlay(label);
                })
            }
        }

        return(
            <div className="psm-map-container">
                <div id="allMap" className="psm-map-div"></div>
            </div>
        )
    }

}

PowerStationMonitorMapContainer.PropTypes = {
    data: PropTypes.array.isRequired,
    userList: PropTypes.array.isRequired,
    mapLevelData: PropTypes.array.isRequired,
    getListByMapLevel: PropTypes.func.isRequired
}

export default PowerStationMonitorMapContainer