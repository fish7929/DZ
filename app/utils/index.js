/**
 * create by zhao at 2017/5/25
 * utils.js
 * 工具类
 */
'use strict'
import 'whatwg-fetch';  // 可以引入fetch来进行Ajax
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

/**
 * 获取和提交RESTful数据接口
 * @param url 接口地址
 * @param param  传输数据 如果contentType = "application/json"，data可以用Object或json string,其他类型data只能为string
 * @param type  取数据type = "GET"，提交数据type = "POST"
 * @param headers 头部额外配置
 * @param dataType 成功返回数据的格式dataType= "json"或dataType= "text"等ajax支持的格式
 */
export function fetchUtils(url, param, type = "GET", headers = {}, dataType = "json") {
    if(type.toLocaleUpperCase()==="GET"&&size(param)>0){
        url +="?"+toExcString(param)
    }
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
    if(dataType == "json"){
        headers = assignIn(headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
        })
    }
    //TODO 可能需要在前面增加域名  Config.api
    return fetch(url, {
        method: type.toLocaleUpperCase(),
        headers: headers,
        credentials: 'same-origin',
        body: type.toLocaleUpperCase() === "GET" ? undefined : (dataType == "json" ? JSON.stringify(param) : param)
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => error)
}


const fetchMsg = (url, param, type = "GET", headers={}, repType="json") => {
    return (dispatch, getState) => {
        if(type.toLocaleUpperCase()==="GET"&&size(param)>0){
            url +="?"+toExcString(param)
        }

        if(repType == "json"){
            headers = assignIn(headers, {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
            })
        }
        return fetch(url, {
            method: type.toLocaleUpperCase(),
            headers: headers,
            // credentials: 'same-origin',
            body: type.toLocaleUpperCase()==="GET"? undefined : (repType=="json" ? JSON.stringify(param):param)
        })  
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {console.log(error)})
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
                    resolve&&resolve(data.result || data.data || data.url || null)
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

export const updateUserTrack = () => {

    getCurrentPosition().then( r => {
        let url = "http://api.map.baidu.com/geocoder/v2/?location=" + r.point.lat + "," + r.point.lng + "&output=json&ak=3j6qn3gMTZgGCzOegAxyF3wP"
        loadXMLDoc(url).then(data => {
            if(data.status === 0){
                let user = Base.getLocalStorageObject("user")
                if(!user) return;
                let opt = {
                    address: data.result.formatted_address,
                    city: data.result.addressComponent.city,
                    cityCode: data.result.cityCode,
                    district: data.result.addressComponent.district,
                    lat: data.result.location.lat,
                    lng: data.result.location.lng,
                    province: data.result.addressComponent.district,
                    street: data.result.addressComponent.street,
                    streetNumber: data.result.addressComponent.street_number,
                    userId: user.userid
                }
                let url = "/pvmtsys/userTrack/updateUserTrack"
                fetch(url, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
                        "token": user.token,
                        "fromType": 'app',
                    },
                    body: JSON.stringify(opt),
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {console.log(error)})
                
            }
        }, error=>console.log(error));
    })
}

const loadXMLDoc = url => {
    return new Promise((resolve, reject) => {
        let xmlhttp = null;
        // code for IE7, Firefox, Opera, etc.
        if (window.XMLHttpRequest) {
            xmlhttp=new XMLHttpRequest();
        }// code for IE6, IE5
        else if (window.ActiveXObject) {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp!=null) {
            xmlhttp.onreadystatechange = (event) => {
                if(event.target.readyState === 4){
                    // 200 = "OK"
                    if (event.target.status==200){
                        resolve(JSON.parse(event.target.responseText));
                    }
                    else {
                        reject("Problem retrieving XML data:" + xmlhttp.statusText)
                    }
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send(null);
        }
        else {
            reject("Your browser does not support XMLHTTP.")
        }
    })
}