import React, { PropTypes } from "react"

import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'

import './index.scss'

const xLabel = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]

class ChartItem extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.colors = ["#32dadd", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    }

    getPieOption(data) {
        let {unitY} = this.props
        data = data.filter((obj) => obj.value !== 0)
        return {
            series: [
                {
                    type: 'pie',
                    radius: "50%",
                    center: ['50%', '50%'],
                    roseType: 'area',
                    data: data,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#0F3B65'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: "#0F3B65"
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                }
            ],
            //color: this.colors,
            // tooltip: {
            //     trigger: 'item',
            // },
            // legend: {
            //     x: 'center',
            //     y: 'bottom',
            //     data: data.map(obj => obj.name)
            // },
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
        let {unitY, barBgColor, barColors} = this.props
        barColors = barColors || ['#87E2F8', '#3899EB']
        let colors = barColors.map((obj, index)=>({offset: index, color: obj}))
        return {
            xAxis: {
                data: data.map(obj=>obj.name),
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10,
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
                    },
                    formatter: (value, index) => {
                        return value + (unitY || "")
                    }
                }
            },

            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: barBgColor || '#D8E3EA'},
                        emphasis: {color: barBgColor || '#D8E3EA'}
                    },
                    barGap:'-100%',
                    // barCategoryGap:'50%',
                    data: data.map(obj=>100),
                    animation: false
                },
                {
                    type: 'bar',
                    barMinHeight: 5,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                colors
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                colors
                            )
                        }
                    },
                    data: data.map(obj=>obj.value),
                    // data: [80, 40]
                }
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        opacity:0
                    }
                },
                position: function (pos, params, dom, rect, size) {
                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    var obj = {top: 60};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                    return obj;
                },
                formatter: '{b1}<br />{c1}' + (unitY || "")
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            }
        }
    }

    getLineOption(data) {
        let { unitY, lineColor, shadowColor } = this.props
        return {
            xAxis:  {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                type: 'category',
                boundaryGap: false,
                data: data.map(obj => obj.name),
                axisLabel: {
                    formatter: (value)=>{
                        return value.substring(value.length-2, value.length)
                    }
                }
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                type: 'value',
                axisLabel: {
                    formatter: '{value}' + (unitY || "")
                }
            },
            series: [
                {
                    type:'line',
                    symbol: "none",
                    smooth: true,
                    data: data.map(obj=>obj.value),
                    lineStyle: {
                        normal: {
                            color: lineColor || "#F18905",
                            width: 6,
                            shadowColor: shadowColor || '#F08806',
                            shadowBlur: 12,
                            shadowOffsetY: 20,
                        }
                    }
                }
            ],
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            }
        }

    }

    getDoubleBarOption(){
        let {unitY, barBgColor, barColors, legend, data} = this.props
        barColors = barColors || ['#87E2F8', '#3899EB']
        return {
            xAxis: {
                data: data.map(obj=>obj.name),
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10,
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
                    },
                    formatter: (value, index) => {
                        return value + (unitY || "")
                    }
                },
                type : 'value'
            },
            series: legend.map((obj, index) => ({
                itemStyle: {
                    normal: {color: barColors[index]}
                },
                name: obj,
                type: 'bar',
                barMinHeight: 5,
                data: data.map(obj=>obj.value[index]),

            })),
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                },
                position: function (pos, params, dom, rect, size) {
                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    var obj = {top: 60};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                    return obj;
                },
                // formatter: '{b1}<br />{c1}' + (unitY || "")
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            }
        }
    }

    render() {
        let { data, type } = this.props, opts
        if(data.length>0){
            if (type === "pie") {
                opts = this.getPieOption(data)
            }
            else if(type === "line"){
                opts = this.getLineOption(data)
            }
            else if(type === "doubleBar"){
                opts = this.getDoubleBarOption()
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
    data: PropTypes.array,
    type: PropTypes.string,
    unitY: PropTypes.string,
    barBgColor: PropTypes.string,
    barColors: PropTypes.array,
    lineColor: PropTypes.string,
    shadowColor: PropTypes.string,
    legend: PropTypes.array
}

export default ChartItem