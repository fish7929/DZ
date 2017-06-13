/**
 * create by zhao at 2017/5/25
 * utils.js
 * 工具类
 */
'use strict'
import {size, each, assignIn} from "lodash";
import { hashHistory } from 'react-router'
import * as RouterConst from '../static/const/routerConst'

const toExcString = function(array,type={":":"=",",":"&"}){
    let result ="";
    for(let temp in array){
        result+= temp+'='+array[temp]+"&"
    }
    return result.substring(-1,result.length-1);
}

const fetchMsg = (url, param, type = "GET", headers={}, repType="json") => {
    return (dispatch, getState) => {

        if(type.toLocaleUpperCase()==="GET"&&size(param)>0){
            url +="?"+toExcString(param)
        }

        headers = assignIn({}, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
        });
        return fetch(url, {
            method: type.toLocaleUpperCase(),
            headers: headers,
            credentials: 'same-origin',
            body: type.toLocaleUpperCase()==="GET"?undefined:(repType=="json"?JSON.stringify(param):param)
        })  
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
    }
}

/**
 * sendMsg: 数据请求
 * @param {*} url 请求地址
 * @param {*} param 请求参数
 * @param {*} type 请求类型 POST,GET
 * @param {*} headers 请求头部信息
 * @param {*} repType 
 */
export function sendMsg(url, param, type = "GET",headers={}, repType="json"){

    // url = '/mock'+url+".json"
    return (dispatch, getState) => {
        
        return new Promise(function(resolve, reject){
            
            dispatch(fetchMsg(url, param, type, headers, repType))
            .then(data=>{
                if(data.code === 0){
                    resolve&&resolve(data.result || null)
                }else if(data.code === 200){
                    reject&&reject(data)
                    hashHistory.push(RouterConst.ROUTER_LOGIN)
                }else{
                    reject&&reject(data)
                    Modal.error({
                        title: '提示',
                        content: data.message,
                    })
                }
            })
        }
    )}
}

/**检测是否为邮箱 */
export const checkEmail = email => {
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if(!reg.test(email)) return false
        
    return true
}

/**格式化日期 */
export const formatDate = (time, format) => {
    let t = new Date(time);
    let tf = (i) => { return (i < 10 ? '0' : '') + i }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
            case 'MM':
                return tf(t.getMonth() + 1);
            case 'mm':
                return tf(t.getMinutes());
            case 'dd':
                return tf(t.getDate());
            case 'HH':
                return tf(t.getHours());
            case 'ss':
                return tf(t.getSeconds());
        }
    })
}

