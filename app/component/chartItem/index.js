import React, { PropTypes } from "react"

import ReactEcharts from 'echarts-for-react'

import './index.scss'

class ChartItem extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.colors = ["#32dadd", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    }

    getPieOption(data) {
        return {
            series: [
                {
                    type: 'pie',
                    radius: [40, 100],
                    center: ['50%', '40%'],
                    roseType: 'area',
                    data: data
                }
            ],
            color: this.colors,
            tooltip: {
                trigger: 'item',
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: data.map(obj => obj.name)
            },
            xAxis: [
                {
                    show: false
                }
            ],
            yAxis: [
                {
                    show: false
                }
            ],
            calculable: true,
        }
    }

    getBarOption(data) {
        return {
            xAxis: {
                data: data.map(obj=>obj.name),
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#000'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],

            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: [],
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#188df0'}
                                ]
                            )
                        },
                        // emphasis: {
                        //     color: new echarts.graphic.LinearGradient(
                        //         0, 0, 0, 1,
                        //         [
                        //             {offset: 0, color: '#2378f7'},
                        //             {offset: 0.7, color: '#2378f7'},
                        //             {offset: 1, color: '#83bff6'}
                        //         ]
                        //     )
                        // }
                    },
                    data: data.map(obj=>obj.value),
                }
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                // left: '5%',
                // right: '5%',
                // bottom: '5%',
                // top: '5%',
                containLabel: true
            }
        }
    }

    render() {
        let { title, data, type } = this.props, opts
        let temp = data.filter(obj => obj.value != 0)
        if(temp.length>0){
            if (type === "pie") {
                data = temp
                opts = this.getPieOption(data)
            }
            else {
                opts = this.getBarOption(data)
            }
        }
        return (
            <div className="chart-div">
                {
                    opts ? <ReactEcharts option={opts} /> : <div className="chart-no-data-tip">无数据</div>
                }
            </div>
        )
    }
}

ChartItem.PropTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
    type: PropTypes.string
}

export default ChartItem