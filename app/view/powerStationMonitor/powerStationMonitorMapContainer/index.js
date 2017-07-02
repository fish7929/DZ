import React, { PropTypes } from 'react'

import * as utils from '../../../utils'

import './index.scss'

class PowerStationMonitorMapContainer extends React.Component{
    constructor(props, context){
        super(props, context)
        this.state = {
            mapIsReady: false
        }
    }

    componentDidMount(){
        utils.getCurrentPosition().then((r)=>{
            this.map = new BMap.Map("allMap")
            let p = new BMap.Point(r.point.lng, r.point.lat)
            this.map.centerAndZoom(p, 15);
            this.setState({mapIsReady: true})
        })
    }

    componentWillUnmount(){
        this.map = null;
    }

    render(){
        let { data } = this.props
        if(data.length && this.state.mapIsReady){
            this.map.clearOverlays()
            data.map((obj, index)=>{
                let point = new BMap.Point(obj.lng, obj.lat)
                let icon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                    offset: new BMap.Size(10, 25),
                    imageOffset: new BMap.Size(0, 0 - index * 25)
                })
                let marker = new BMap.Marker(point, {icon: icon});  // 创建标注
                this.map.addOverlay(marker);              // 将标注添加到地图中
            })
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