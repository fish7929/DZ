/**
 * @component GlobalVar.js
 * @description 全局变量的定义。
 * @time 2017-04-10 10:20
 * @author fishYu
 **/
import Base from "./Base";
import AppModal from "../component/modal";
import DialogConstants from "../static/const/dialogConst";
//定义全局属性
Object.defineProperties((window || global), {
    Base: {
        get() {
            return Base;
        }
    },
    AppModal: {
        get() {
            return AppModal;
        }
    },
    DialogConstants: {
        get() {
            return DialogConstants;
        }
    }
});
