/**
 * @component WeiXinUtils
 * @description 所有与微信端的接口
 * @time 2017-05-17 9:50
 * @author fishYu
 **/

'use strict';
var WeiXinUtils = {
    /**
     * 选择图片
     * @param {string} uploadUrl 需要上传的url
     * @param {string} success 图片上传完成的回调
     * @param {ReactObject} loading react 对象用于显示加载动画
     */
    chooseOneImage(uploadUrl, success) {
        wx.chooseImage({
            success: function (res) {
                if (res.localIds.length > 1) {
                    console.log('只能选择1张图片，请重新选择');
                    return;
                }
                //显示加载
                AppModal.loading();
                setTimeout(function () { //微信6.1不上传的bug
                    wx.uploadImage({
                        localId: res.localIds[0],
                        isShowProgressTips: 0,
                        success: function (res) {
                            let headers = Object.assign({}, {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
                            });
                            fetch(uploadUrl + '?serverId=' + res.serverId, {
                                method: "GET",
                                headers: headers,
                                credentials: 'same-origin'
                            })
                                .then((res) => {
                                    return res.json();
                                })
                                .then((json) => {
                                    //隐藏加载
                                    AppModal.hide();
                                    if (json.status === 0) {
                                        // alert("调用成功-->"+ JSON.stringify(json));
                                        success(json.data);
                                    } else {
                                        // alert("调用返回不正确-->"+ JSON.stringify(json));
                                        console.log(json.msg);
                                    }
                                })
                                .catch((res) => {
                                    //隐藏加载
                                    AppModal.hide();
                                    var msg = JSON.stringify(res);
                                    // alert('上传图片失败：' + msg);
                                    if (msg.indexOf('function not exist') > -1) {
                                        console.log('您当前微信版本不支持图片上传功能，请升级微信');
                                    } else {
                                        console.log(msg);
                                    }
                                });
                        },
                        fail: function (res) {

                        }
                    });
                }, 100);
            },
            fail: function (res) {
                var msg = JSON.stringify(res);
                if (msg.indexOf('function not exist') > -1) {
                    console.log('您当前微信版本不支持图片选择功能，请升级微信');
                } else {
                    console.log(msg);
                }
            }
        });
    },
    /**
     * 下载图片
     * @param {string} serverId 图片serverId
     * @param {function} getLocalIdCallback 获取本地图片指向的回调
     */
    downloadImage(serverId, getLocalIdCallback) {
        wx.downloadImage({
            serverId: serverId,
            success: function (res) {
                getLocalIdCallback(res.localId);
            }
        });
    },
    /**
     * 判断图片地址是否是微信serverId
     * @param {string} photo 图片地址
     */
    isServerId(photo) {
        return photo.indexOf('http://') > -1 ? false : true;
    },
    /**
     * 获取地理位置
     * @param {function} success 获取地理位置的回调函数
     * @param {function} fail 获取地理位置失败的回调
     */
    getGPS(success, fail) {
        wx.getLocation({
            success: function (res) {
                /*
                * var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                * var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                * var speed = res.speed; // 速度，以米/每秒计
                * var accuracy = res.accuracy; // 位置精度
                */
                success(res);
            },
            fail: function (res) {
                fail && fail(res);
                var msg = JSON.stringify(res);
                if (msg.indexOf('function not exist') > -1) {
                    console.log('您当前微信版本不支持GPS定位功能，请升级微信');
                } else {
                    console.log(msg);
                }
            },
            cancel: function (res) {
                fail && fail(res);
                var msg = JSON.stringify(res);
                if (msg.indexOf('function not exist') > -1) {
                    console.log('您当前微信版本不支持GPS定位功能，请升级微信');
                } else {
                    console.log(msg);
                }
            }
        });
    },
    /**
     * 初始化微信JSSDK
     * @param {string} authUri 认证的URL
     * @param {function} callBack 初始化成功的回调函数
     */
    initWXSDK(authUri, callBack = null) {
        var pageurl = window.location.href.replace(window.location.hash, '');
        let headers = Object.assign({}, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
        });
        fetch(authUri, {
            method: "POST",
            headers: headers,
            credentials: 'same-origin',
            body: JSON.stringify({ 'pageurl': pageurl })
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.status === 0) {
                    var auth = json.data;
                    wx.config({
                        debug: false,
                        appId: auth.appId,
                        timestamp: auth.timestamp,
                        nonceStr: auth.nonceStr,
                        signature: auth.signature,
                        jsApiList: ['hideOptionMenu', 'chooseImage', 'uploadImage', 'downloadImage', 'previewImage', 'closeWindow', 'getLocation']
                    });
                    wx.ready(function () {
                        wx.hideOptionMenu();
                        callBack && callBack();
                        /*wx.hideMenuItems({
                            menuList: [
                                "menuItem:share:appMessage",
                                "menuItem:share:timeline",
                                "menuItem:share:qq",
                                "menuItem:share:weiboApp",
                                "menuItem:favorite",
                                "menuItem:share:facebook",
                                "menuItem:share:QZone",
                                "menuItem:copyUrl",
                                "menuItem:originPage",
                                "menuItem:openWithQQBrowser",
                                "menuItem:openWithSafari"
                            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        });*/
                    });
                    wx.error(function (res) {
                        console.log("config信息验证失败" + res);
                    });
                } else {
                    console.log(json.msg);
                }
            })
            .catch((msg) => {
                console.log('初始化微信SDK出错：' + msg);
            });

    }
}

module.exports = WeiXinUtils;