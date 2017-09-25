/**
 * @component Sparepart.js
 * @description 备件界面
 * @time 2017-06-20 22:40
 * @author fishYu
 **/

'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Page from '../../component/page';
import Header from '../../component/header';
import NoMessage from '../../component/noMessage';

import { fetchData } from './reducer/action';

import './index.scss'

import { FIRST, SECOND, THREE } from '../../static/const/constants';

class Sparepart extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.order = this.props.params && this.props.params.order;  //工单号
        // this.order = parseInt(order);
    }
    /**
     * 开关显示备品详情
     * @param {object} e  事件对象
     */
    toggleSparepartItemHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        // let target = e.target;
        // let _parent = target.parentNode;
        let _parent = e.target;
        let _className = _parent.className;
        if(_className.indexOf('off') > -1){
            _className = _className.replace(/off/g, 'on');
            _parent.className = _className;
        }else {
            _className = _className.replace(/on/g, 'off');
            _parent.className = _className;
        }
    }
    /**
     * 根据路由不同获取不同对象
     */
    getContent() {
        let { list } = this.props;
        let component = null;
        component = list.map((item, index) => {
            return (<li key={index} className="sparepart-item">
                <div className="sparepart-divide divide-off" onClick={(e) => this.toggleSparepartItemHandler(e)}>
                    {"备件" + (index + 1)}
                    <span ></span>
                </div>
                <div className="sparepart-detail-wrapper">
                    <div className="common-order-item-hint">
                        名称
                        <span className="no-wrap">{item.sparepartName}</span>
                    </div>
                    <div className="common-order-item-hint">
                        规格型号
                        <span className="no-wrap">{item.specificationName}</span>
                    </div>
                    <div className="common-order-item-hint">
                        领用数量
                        <span className="no-wrap">{item.receivenum + "块"}</span>
                    </div>
                    <div className="common-order-item-hint">
                        领用形式
                        <span className="no-wrap">{item.receivetype == FIRST ? "投资方保管" : ""}</span>
                    </div>
                    <div className="common-order-item-hint">
                        领用人
                        <span className="no-wrap">{item.receiveuserName}</span>
                    </div>
                    <div className="common-order-item-hint">
                        备注
                        <span className="no-wrap">{item.comments}</span>
                    </div>
                </div>
            </li>)
        });
        return (
            <div>
                <div className="sparepart-title">备品备件分配计划</div>
                <ul>
                    {component}
                </ul>
            </div>
        );
    }
    /**
     * 渲染
     */
    render() {
        let { isFetching, list } = this.props;
        let _content = this.getContent();
        return (
            <Page className="sparepart-container">
                <Header title="备品备件" isShowBack={true} />
                <div className="main-content">
                    {list.length < 1 ?
                        <NoMessage msg="暂无信息" /> : _content}
                </div>
            </Page>
        )
    }

    /**
     * 加载完成
     */
    componentDidMount() {
        this.props.fetchData(this.order);
    }

}

let mapStateToProps = state => {
    return ({
        isFetching: state.sparepartData.isFetching,
        list: state.sparepartData.list
    });
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sparepart)