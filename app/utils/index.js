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
        headers = assignIn(headers, {
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
    let user = Base.getLocalStorageObject("user")
    let token = '';
    if(user && user.hasOwnProperty('token')){
        token = user.token;
    }
    if(token){
        //token = "DA58A5485E52B2A5DA3EA90F367A1636"
        headers = {
            ...headers,
            fromType: 'app',
            token
        }
    }

    return (dispatch, getState) => {
        
        return new Promise(function(resolve, reject){
            
            dispatch(fetchMsg(url, param, type, headers, repType))
            .then(data=>{
                if(data.code === 1 || data.code === 0 || data.message){
                    resolve&&resolve(data.result || data.data || null)
                }else{
                    // reject&&reject(data)
                    resolve&&resolve(data);
                    // AppModal.toast(data.message);
                }
            })
        }
    )}
}

export const checkNumber = number =>{
    let reg = /^[0-9]*$/;
    if(!reg.test(number)) return false
    return true
}

export const checkPhone = txt => {
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(!reg.test(txt)) return false
        
    return true
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

//百度地图获取坐标
export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                resolve && resolve(r)
            }else{
                reject && reject()
            }
        })
            
    })
}