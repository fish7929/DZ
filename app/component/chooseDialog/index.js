/**
 * @component Dialog.jsx
 * @description 通用对话框呈现的界面。
 * @time 2017-06-24 18:20
 * @author fishYu
 **/

'use strict';

// require core module
import React, { PropTypes } from 'react';

//require submodule
import { ZERO, FIRST } from '../../static/const/constants';

import "./index.scss";

class ChooseDialog extends React.Component {
    /**
     *构造函数
     */
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,    //消息框类型
            isShow: this.props.isShow, //是否显示
            title: this.props.title,    //提示框标题
            data: this.props.data,   //显示的内容
            current: null
        };
    }
    /**
     * 确定按钮点击处理事件
     */
    sureHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { current, type } = this.state;
        this.setState({
            isShow: false
        });
        this.props.sureFn && this.props.sureFn(current, type);
    }
    /**
     * 取消点击处理事件
     */
    cancelHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.hide();
    }

    hide() {
        this.setState({ isShow: false });
        this.props.cancelFn && this.props.cancelFn();
    }
    /**
     * 选择对象
     */
    chooseItemHandler(e, item) {
        e.preventDefault();
        e.stopPropagation();
        console.log(7892, item);
        this.setState({ current: item });
    }
    renderItemSection() {
        let { type, data, current } = this.state;
        let nameKey = type == ZERO ? 'checkupName' : 'name';
        // let prevKey = type == ZERO ? 'examineId' : 'facilityId';  //前缀
        let idKey = type == ZERO ? 'examineId' : 'id';
        return (
            <div className="choose-dialog-item-wrapper">
                {data.map((item, index) => {
                    let name = item[nameKey];
                    let id = item[idKey];
                    let prv = type == ZERO ? item['examineId'] : (index + 1 );
                    let _check = current ? current[idKey] == id : false;
                    return (<label key={index} className="choose-dialog-item" htmlFor={id}>{prv + "." + name}
                        <input type="radio" checked={_check} id={id} name="chooseDialog"
                            onChange={(e) => this.chooseItemHandler(e, item)} /></label>)
                })}
            </div>
        );
    }
    /**
     * 渲染全屏按钮
     */
    renderChooseDialog() {
        var _buttonDom = (<div className='choose-dialog-button'>
            <span className='btn-active' onClick={(e) => this.cancelHandler(e)}>取消</span>
            <span className='btn-active' onClick={(e) => this.sureHandler(e)}>确定</span>
        </div>);
        var _titleDom = <div className='choose-dialog-title'>{this.state.title}</div>;
        return (
            <div className='choose-dialog-content xy-center'>
                {_titleDom}
                {this.renderItemSection()}
                {_buttonDom}
            </div>
        );
    }

    /**
     * 渲染界面
     */
    render() {
        return this.state.isShow ? (
            <div className='choose-dialog-container'>
                {this.renderChooseDialog()}
            </div>
        ) : null;
    }
    /**
     * 组件销毁的时候
     */
    componentDidMount() {
    }
    /**
     * 更新属性
     */
    componentWillReceiveProps(nextProps) {
        let obj = {
            type: nextProps.type,    //消息框类型
            isShow: nextProps.isShow, //是否显示
            title: nextProps.title,    //提示框标题
            data: nextProps.data   //显示的内容
        };
        if(nextProps.type !== this.state.type){
            obj.current = null;
        }
        this.setState(obj);
    }
    /**
     * 组件销毁的时候
     */
    componentWillUnmount() {
    }
}
/**
 * 验证props
 */
ChooseDialog.propTypes = {
    type: PropTypes.number,
    isShow: PropTypes.bool.isRequired,
    title: PropTypes.string,
    data: PropTypes.array,
    sureFn: PropTypes.func,
    cancelFn: PropTypes.func
};
/**
 * 默认props
 */
ChooseDialog.defaultProps = {
    type: ZERO,
    title: '选择',
    isShow: false,
    data: []
};
export default ChooseDialog;
