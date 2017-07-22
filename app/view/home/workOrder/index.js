import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router';

import { ZERO, FIRST } from '../../../static/const/constants';
import WorkOrderItem from '../../../component/workOrderItem';
import ScrollList from '../../../component/scrollList';
import './index.scss';
import * as utils from '../../../utils'
import * as Api from '../../../static/const/apiConst';
import { Datepicker, SELECTMODE } from 'datepicker-react';
class WorkOrder extends React.Component {
    constructor(props, context) {
        super(props, context)
        let _list = this.props.data;
        //按照创建时间排序  默认是未完成的
        _list.sort(function (a, b) {
            return b.createTime - a.createTime;
        });
        this.state = {
            currentTab: 0,   //当前标签
            list: _list,
            currentPage: 1,
            fromMonth: undefined,
            toMonth: undefined
        }
        this.metaData = _list || [];
    }
    /**
     * 加载完成
     */
    componentDidMount() {
        //加载默认数据
    }
    /**
     * 切换标签事件
     * @param {object} e 事件对象
     * @param {number} tab 标签栏的值
     */
    changeTabHandler(e, tab) {
        e.preventDefault();
        e.stopPropagation();
        let _currentPage = 1;
        this.setState({ currentTab: tab, currentPage: _currentPage });
        this.props.onChange && this.props.onChange(tab, _currentPage);
    }
    onScrollHandler(page) {
        //todo 可能存在隐患
        this.setState({ currentPage: page });
        this.props.onChange && this.props.onChange(this.state.currentTab, page);
    }
    onSubmitHandler(orderId, orderNumber) {
        let url = Api.SubmitWorkOrdrByIdAndNumber(orderId, orderNumber);
        utils.fetchUtils(url, { 'orderId': orderId, 'orderNumber': orderNumber }, "POST").then((res) => {
            AppModal.hide()
            if (res.data) {
                AppModal.toast('提交成功');
                let old = this.state.list;
                let current = old.filter((item, index) => item.orderNumber != orderNumber);
                this.setState({ list: current });
            } else {
                AppModal.toast('提交失败');
            }

        }).catch((e) => AppModal.hide());
    }
    /**
     * 选择时间区间
     * @param {object} e 事件对象
     */
    chooseTimeRange(e) {
        // e.preventDefault();
        e.stopPropagation();
        //todo 选择时间区间
        console.log('choose time');
    }
    handleSelectMonth(month, key) {
        let obj = {};
        obj[key] = month;
        let _time = month._d.getTime();  //获取时间戳
        let filter = this.state.list;
        if (key === 'toMonth' && this.metaData.length > 0) {
            //todo toMonth > fromMonth
            let _fromMonth = this.state.fromMonth;
            if (_fromMonth && month - _fromMonth > 0) {
                let _fromTime = _fromMonth._d.getTime();
                filter = this.metaData.filter((item, index) => (item.createTime >= _fromTime && item.createTime <= _time));
            }
        } else if (key === 'fromMonth' && this.metaData.length > 0) {
            let _toMonth = this.state.toMonth;
            console.log(_toMonth - month, 877777);
            if (_toMonth && _toMonth - month > 0) {
                let _toTime = _toMonth._d.getTime();
                filter = this.metaData.filter((item, index) => (item.createTime >= _time && item.createTime <= _toTime));
            }
        }
        obj['list'] = filter;
        this.setState(obj);
    }
    render() {
        let { list, currentTab, fromMonth, toMonth } = this.state;
        let _class1 = currentTab == ZERO ? 'work-order-tab-selected' : '';
        let _class2 = currentTab == FIRST ? 'work-order-tab-selected' : '';
        let count = list.length;
        return (
            <div className="work-order-container">
                {(currentTab == FIRST && this.metaData.length > 0) ? <div className="work-order-filter">
                    <Datepicker
                        placeholder="选择月"
                        theme={{
                            Calendar: {
                                right: '0.2rem',
                                left: 'inherit',
                                position: 'absolute'
                            }
                        }}
                        value={fromMonth}
                        selectMode={SELECTMODE.MONTH}
                        onChange={(month) => this.handleSelectMonth(month, 'fromMonth')} />
                    ~
                    <Datepicker
                        placeholder="选择月"
                        theme={{
                            Calendar: {
                                right: '5rem',
                                left: 'inherit',
                                position: 'absolute'
                            }
                        }}
                        value={toMonth}
                        selectMode={SELECTMODE.MONTH}
                        onChange={(month) => this.handleSelectMonth(month, 'toMonth')} />
                </div> : null}
                <div className="work-order-tabs">
                    <span className={"common-active " + _class1} onClick={(e) => this.changeTabHandler(e, ZERO)}>
                        未完成
                       {currentTab == ZERO ? <i className="work-order-count-bubble">{count > 99 ? '99+' : count}</i> : null}
                    </span>
                    <span className={"common-active " + _class2} onClick={(e) => this.changeTabHandler(e, FIRST)}>已完成</span>
                </div>
                {/*<ul className="work-order-content">*/}
                <ScrollList className="work-order-content" onScroll={page => this.onScrollHandler(page)} currentPage={this.state.currentPage} pageTotal={this.props.total}>
                    {list.map((item, index) => <WorkOrderItem data={item} key={index} onSubmit={(orderId, orderNumber) => this.onSubmitHandler(orderId, orderNumber)} />)}
                    {/*</ul>*/}
                </ScrollList>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            let _list = nextProps.data;
            if (this.state.currentTab == FIRST) {
                //按照分配时间降序排序  已完成的
                _list.sort(function (a, b) {
                    return b.allocateTime - a.allocateTime;
                });
            } else {
                //按照创建时间降序排序  默认是未完成的
                _list.sort(function (a, b) {
                    return b.createTime - a.createTime;
                });
            }
            this.metaData = _list;
            this.setState({
                list: _list
            });
        }
    }
}

WorkOrder.PropTypes = {
    total: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default WorkOrder;
