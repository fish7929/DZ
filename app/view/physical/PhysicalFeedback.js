/** 
 * @component PhysicalFeedback.jsx
 * @description 添加电站反馈问题组件
 * @time 2017-6-24 12:30
 * @author fishYu
 */

'use strict';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import UploadComponent from '../../component/uploadComponent';
import ChooseDialog from '../../component/chooseDialog';
import { ZERO, FIRST } from '../../static/const/constants';
const Level = ['', 'Ⅰ', 'Ⅱ', 'Ⅲ'];
class PhysicalFeedback extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            type: FIRST,  // 就地解决， 0上报调度中心
            stationName: this.props.stationName,  //上报调度中心  电站名称
            currentPhysical: null,  //当前选择电站体检项目
            currentFacility: null,  //当前选择设备名称
            facilityNumber: '',   //设备编号
            faultLevel: '',  //故障级别

            isShowDialog: false,  //是否显示选择对话框 false
            dialogTitle: '',
            dialogType: ZERO,   //选择对话框类型
            dialogData: [],  //选择的对话框内容
        }
    }
    /**
     * 选择解决类型 
     * @param {object} e 事件对象
     * @param {number} type 解决类型
     */
    selectTypeHandler(e, type) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ type });
    }
    /**
     * 选择解决类型 
     * @param {object} e 事件对象
     * @param {number} type 选择的类型 0 体检项目， 1 设备名称
     */
    showChooseDialog(e, type) {
        e.preventDefault();
        e.stopPropagation();
        let _data = [];
        let _title = '';
        if (type == ZERO) { //电站体验项目
            _title = '选择检查项目';
            _data = this.props.physicalList;
        } else { //设备
            _title = '选择设备名称';
            _data = this.props.facilityList;
        }
        this.setState({
            isShowDialog: true,
            dialogTitle: _title,
            dialogType: type,
            dialogData: _data
        });
    }
    /**
     * 对话框确定
     * @param {object} data 选择的对象
     * @param {number} type  类型 0， 1设备名称
     */
    onDialogSureHandler(data, type) {
        let _key = type == ZERO ? 'currentPhysical' : 'currentFacility';
        let obj = {};
        obj.isShowDialog = false;
        if(data){
            obj[_key] = data;
        }
        this.setState(obj);
    }
    /**
     * 对话框取消
     */
    onDialogCancelHandler() {
        this.setState({ isShowDialog: false });
    }
    /**
     * 选择或者输入设备名称或者设备号
     * @param {object} e 事件对象 
     * @param {string} key  对象值
     */
    changeStateHandler(e, key) {
        e.preventDefault();
        e.stopPropagation();
        let val = e.target.value;
        let obj = {};
        obj[key] = val;
        this.setState(obj);
    }
    /**
     * 渲染选择类型
     */
    renderTypeSection() {
        let { currentPhysical, type, stationName } = this.state;
        let _name = currentPhysical ? currentPhysical.checkupName : '';
        let _typeSlected0 = type == ZERO ? 'physical-feedback-type-selected' : '';
        let _typeSlected1 = type == FIRST ? 'physical-feedback-type-selected' : '';
        let _wrapper = type == ZERO ? '' : 'zero-wrapper';
        return (
            <div className={"physical-feedback-type-wrapper " + _wrapper}>
                <div className="physical-feedback-name" data-hint="选择"  onClick={(e) => this.showChooseDialog(e, ZERO)}>{_name}</div>
                <div className="physical-feedback-type-content">
                    <span className={_typeSlected1} onClick={(e) => this.selectTypeHandler(e, FIRST)}>不合格就地解决</span>
                    <span className={_typeSlected0} onClick={(e) => this.selectTypeHandler(e, ZERO)}>不合格上报调度中心</span>
                </div>
                {type == ZERO ? <div className="physical-feedback-common-hint" data-hint="电站名称">{stationName}</div> : null}
            </div>
        );
    }
    /**
     * 渲染不合格就上报调度中心
     */
    renderDispatchSection() {
        let { currentFacility, type, facilityNumber, faultLevel } = this.state;
        let _name = currentFacility ? currentFacility.name : '';
        let slectHint = faultLevel ? '' : 'physical-feedback-select-hint';
        return (
            <div className="physical-feedback-dispatch-wrapper">
                <div className="facility-name physical-feedback-common-hint" data-hint="设备名称">
                    {_name}
                    <span onClick={(e) => this.showChooseDialog(e, FIRST)} >添加选择 +</span>
                </div>
                <div className="physical-feedback-common-item">
                    设备编号
                    <input placeholder="请输入设备编号" type="text" value={facilityNumber} ref='facilityNumber'
                        onChange={(e) => this.changeStateHandler(e, 'facilityNumber')} />
                </div>
                <div className={"physical-feedback-common-item " + slectHint} data-hint="请选择故障级别">
                    故障级别
                    <select className='feedback-common-select' value={faultLevel} onChange={(e) => this.changeStateHandler(e, 'faultLevel')} >
                        {Level.map((item, index) => {
                            var val = '';
                            var _style = index == 0 ? { display: 'none' } : {};   //显示第一条信息
                            if (index != 0) val = item;
                            return (<option value={val} key={Level.length - index} style={_style}>{item}</option>);
                        })}
                    </select>
                </div>
            </div>
        );
    }
    /**
     * 点击保存实现
     * @param {object} e 事件对象 
     */
    onSaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { currentPhysical, type, currentFacility } = this.state;
        this.cancelFocus();
        if(!currentPhysical){
            AppModal.toast('请选择体检项目');
            return;
        }else if(type == ZERO){  //上传调度中心
            if(!currentFacility){
                AppModal.toast('请选择设备名称');
                return;
            }else if(!this.state.facilityNumber){
                AppModal.toast('请输入设备编号');
                return;
            }else if(!this.state.faultLevel){
                AppModal.toast('请选择故障级别');
                return;
            }
        }
        
        let uploadComponentFeedback = this.refs.uploadComponentFeedback;
        let uploadObj = uploadComponentFeedback.getUploadContent();
        let res = {
            isSolve: type,
            explainInfo: uploadObj.explain,
            attachmentList: uploadObj.photos,
            id: currentPhysical.id   //创建 的时候默认值
        };
        console.log(res, 999999);
        this.props.callBack && this.props.callBack(res);
    }
    /**
     * 渲染
     */
    render() {
        let { type, isShowDialog, dialogData, dialogType, dialogTitle } = this.state;
        return (
            <div className="third-contact-container">
                <ChooseDialog isShow={isShowDialog} title={dialogTitle}
                    type={dialogType} data={dialogData}
                    cancelFn={() => this.onDialogCancelHandler()}
                    sureFn={(data, index) => this.onDialogSureHandler(data, index)}
                />
                {this.renderTypeSection()}
                {type == ZERO ? this.renderDispatchSection() : null}
                <UploadComponent ref="uploadComponentFeedback" type={ZERO} />
                <div className="physical-feedback-wrapper">
                    <div className="physical-feedback" onClick={(e) => this.onSaveHandler(e)}>
                        保存
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 加载完成
     */
    componentDidMount() {

    }

    /**
     * 卸载
     */
    componentWillUnmount() {
        this.cancelFocus();
    }

    cancelFocus() {
        let _facilityNumber = ReactDOM.findDOMNode(this.refs.facilityNumber);
        _facilityNumber && _facilityNumber.blur();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                type: FIRST,  // 就地解决， 0上报调度中心
                stationName: nextProps.stationName  //上报调度中心  电站名称
            });
        }
    }
}

PhysicalFeedback.PropTypes = {
    physicalList: PropTypes.array.isRequired,
    facilityList: PropTypes.array,
    stationName: PropTypes.string,
    callBack: PropTypes.func
}

PhysicalFeedback.defaultProps = {
    physicalList: [],
    facilityList: [   //测试设备名称数组
        {
            id: 1234561,
            facilityId: 1,
            name: '逆变器1'
        },
        {
            id: 1234562,
            facilityId: 2,
            name: '逆变器2'
        },
        {
            id: 1234563,
            facilityId: 3,
            name: '逆变器3'
        },
        {
            id: 1234564,
            facilityId: 4,
            name: '逆变器4'
        },
        {
            id: 1234565,
            facilityId: 5,
            name: '逆变器5'
        }
    ],
    stationName: '江苏省镇江市2.12MW分布式光伏电站'
}

export default PhysicalFeedback;