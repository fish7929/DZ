/**
 * @component Base.js
 * @description 基本的通用方法调用
 * @time 2017-03-14 11:50
 * @author fishYu
 **/

'use strict';

// require core module
module.exports = {
    /**
     * 判断是否是函数
     * @param {判断的对象} obj 
     * @returns {boolean}
     */
    isFunction(obj) {
        return typeof obj == 'function' || false;
    },
    /**
     * 判断浏览器平台
     * @returns {string}
     */
    judgePlatform() {
        var platform = "pc";
        //来源判断
        if (navigator.userAgent.match(/Android/i)) {
            platform = "android";
        } else if (navigator.userAgent.match(/iPhone/i)) {
            platform = "iphone";
        } else if (navigator.userAgent.match(/iPad/i)) {
            platform = "ipad";
        } else if (navigator.userAgent.match(/Windows Phone/i)) {
            platform = "wphone";
        } else {
            platform = "pc";
        }
        return platform;
    },
    /**
     * 判断是否在微信内部
     * @returns {boolean}
     */
    isWeiXinPlatform() {
        var userAgent = navigator.userAgent.toLowerCase();
        var res = false;
        //来源判断
        if (userAgent.indexOf("micromessenger") > -1) {
            res = true;
        }
        return res;
    },
    /**
     * 动态设置页面标题
     * @param {页面标题名称} title 
     */
    setTitle(title) {
        //动态设置标题
        document.title = title;
        if (this.isWeiXinPlatform()) {
            const iframe = document.createElement('iframe');
            // iframe.src = "./favicon.ico";
            iframe.style.display = "none";
            iframe.addEventListener("load", handler, false);
            function handler() {
                setTimeout(function () {
                    iframe.removeEventListener('load', handler, false);
                    document.body.removeChild(iframe);
                }.bind(this), 0)
            }
            document.body.appendChild(iframe);
            window.addEventListener('hashchange', function () {
                window.location.reload();
            }, false);
        }
    },
    /**
     *  格式化钱的样式，保留两位小数
     * @param amount 格式化的数值
     * @returns {string}
     */
    formatMoney(amount) {
        if (!amount) {
            amount = 0;
        }
        var amountTxt = amount + "";
        if (parseInt(amount) == amount) {
            amountTxt = amount + ".00"
        } else {
            var len = amount.toString().split(".")[1].length
            if (len <= 1) {
                amountTxt = amountTxt + "0";
            } else {
                //保留两位小数amount 转换下先，预防不是number类型
                try {
                    amountTxt = Number(amount).toFixed(2);
                } catch (e) {

                }
            }
        }
        return amountTxt;
    },

    /**
     *  格式化姓名的样式
     * @param name 格式化的名称  如：岳*   岳*目
     * @returns {string}
     */
    formatName(name) {
        name = name + '';
        var len = name.length;
        if (len >= 3) {
            var reg = /^(.).+(.)$/g;    //三字以上名称的生活
            name = name.replace(reg, '$1*$2');
        } else {
            var reg = /^(.).$/g;  //两位名称的生活
            name = name.replace(reg, '$1*');
        }
        return name;
    },
    /**
     *  格式化手机号码的样式
     * @param phone 格式化的手机号码 如： 188****0000
     * @returns {string}
     */
    formatPhone(phone) {
        phone = phone + '';
        phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        return phone;
    },
    /**
     *  格式化身份证的样式
     * @param cardId 格式化的手机号码 如： 334321******232321
     * @returns {string}
     */
    formatCardId(cardId) {
        cardId = cardId + '';
        cardId = cardId.replace(/(\d{6})\d{6}(\d{6})/, '$1******$2');
        return cardId;
    },
    /*
	*把特殊符号%,替换"y百分号c"掉后，编码字符串，
	*@parms : str	需要编码的字符串,  或者json对象 {a: 1, b: 'test',......}, json字符串  '{"a": 1, "b": "test",......}'
	*/
    myEncodeURIComponent(str) {
        //如果是传入对象的话,先转换成json string
        if (typeof (str) == "object" && Object.prototype.toString.call(str).toLowerCase()
            == "[object object]" && !str.length) {
            str = JSON.stringify(str);
        }
        var reStr = str;
        if (str.indexOf("%") > -1) {
            reStr = str.replace(/\%/g, "y百分号c");  //备注： 这里是排除有%的特殊情况。
        }
        try {
            return encodeURIComponent(reStr);
        } catch (e) {
            return reStr;
        }
    },
	/*
	*解码字符串后，把"y百分号c"替换成%
	*@parms : str	需要解码的字符串
	*/
    myDecodeURIComponent(str) {
        var reStr = str;
        try {
            reStr = decodeURIComponent(str);
        } catch (e) {
        }
        if (reStr.indexOf("y百分号c") > -1) {
            reStr = reStr.replace(/y百分号c/g, "%");
        }
        return reStr;
    },
    /**
     * 根据localStorage属性 获取 存储的值
     * @param {localStorage属性} key 
     */
    getLocalStorageItem(key) {
        var str = window.localStorage.getItem(key);
        return str;
    },
    /**
     * 保存对象到localStorage
     * @param {localStorage属性} key 
     * @param {需要保存的对象值} value 
     */
    setLocalStorageItem(key, value) {
        window.localStorage.setItem(key, value);
    },
    /**
     * 根据localStorage属性 获取 存储的JSON对象
     * @param {localStorage属性} prototype 
     */
    getLocalStorageObject(prototype) {
        var str = window.localStorage.getItem(prototype);
        var result = {};
        if (str && str != "") {
            result = JSON.parse(str);
        }
        return result;
    },
    /**
     * 保存对象到localStorage
     * @param {localStorage属性} prototype 
     * @param {需要保存的对象值} obj 
     */
    setLocalStorageObject(prototype, obj) {
        var str = JSON.stringify(obj);
        window.localStorage.setItem(prototype, str);
    },
    /**
     * 根据键值获取保存到localStorage对象的值
     * @param {localStorage属性} prototype 
     * @param {需要获取对象的键值} key 
     */
    getLocalStorageValue(prototype, key) {
        var obj = utils.getLocalStorageObject(prototype);
        if (obj[key]) {
            return obj[key];
        }
        return null;
    },
    /**
     * 追加值到已经存在的localstorage
     * @param {localStorage属性} prototype 
     * @param {需要保存对象的键值} key 
     * @param {需要保存对象的值} value 
     */
    addLocalStorageObject(prototype, key, value) {
        var obj = utils.getLocalStorageObject(prototype);
        obj[key] = value;
        utils.setLocalStorageObject(prototype, obj);
    },
    /**
     * 根据键值删除已经存在的localstorage对象值
     * @param {localStorage属性} prototype 
     * @param {需要保存对象的键值} key 
     */
    delLocalStorageObject(prototype, key) {
        var obj = utils.getLocalStorageObject(prototype);
        if (obj[key]) {
            delete obj[key];
        }
        utils.setLocalStorageObject(prototype, obj);
    },
    /**
     * 判断对象是否为空
     * @param {判断的对象} obj 
     */
    isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    },
    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    */
    formatTime(date, format) {
        var t = new Date(date);
        var tf = function (i) { return (i < 10 ? '0' : '') + i };
        return format.replace(/yyyy|MM|M|dd|d|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                // break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                case 'M':
                    return t.getMonth() + 1;
                // break;
                case 'mm':
                    return tf(t.getMinutes());
                // break;
                case 'dd':
                    return tf(t.getDate());
                case 'd':
                    return t.getDate();
                // break;
                case 'HH':
                    return tf(t.getHours());
                // break;
                case 'ss':
                    return tf(t.getSeconds());
                // break;
            }
        });
    },
    /**
     * 随机获取数组中的元素
     * @param {数组对象} arr 
     */
    getRandomArrayItem(arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
};