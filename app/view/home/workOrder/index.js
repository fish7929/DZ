import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router';

import { ZERO, FIRST } from '../../../static/const/constants';
import WorkOrderItem from '../../../component/workOrderItem';
import ScrollList from '../../../component/scrollList';
import './index.scss';
import * as utils from '../../../utils'
import * as Api from '../../../static/const/apiConst';
import MonthRange from '../../../component/monthRange';
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

            isShow: false,  //测试
            isSelected: false,
            month: []
        }
        this.metaData = _list || [];
        this.defaultMonth = [];
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
    showMonthRange(e) {
        // e.preventDefault();
        e.stopPropagation();
        //todo 选择时间区间
        console.log('choose time');
        this.setState({isShow: true});
    }
    handleChangeMonth(month) {
        this.setState({ month: month });
    }

    closeMonthRange(month) {
        if ((month[0].year == month[1].year && month[0].month <= month[1].month)  || month[0].year < month[1].year) {
            this.defaultMonth = month;
            this.setState({
                month: month,
                isSelected: true,
                isShow: false,
            });
            this.filterListByMonth(month);
        } else {
            AppModal.toast('结束时间不能早于开始时间');
        }

    }

    cancelMonthRange() {
        this.setState({isShow: false, month: this.defaultMonth});
    }
    filterListByMonth(month) {
        let obj = {};
        let filter = this.state.list;
        if (this.metaData.length > 0) {
            let fromMonth = new Date(month[0].year, month[0].month);
            let toMonth = new Date(month[1].year, month[1].month);
            let _fromTime = fromMonth.getTime();
            let _toTime = toMonth.getTime();
            filter = this.metaData.filter((item, index) => (item.createTime >= _fromTime && item.createTime <= _toTime));
        } 
        obj['list'] = filter;
        this.setState(obj);
    }
    /**
     * 获取省市区显示位置
     */
    getMonthHint() {
        let hint = "选择时间";
        let { month } = this.state;
        console.log(month, 8999);
        if (this.state.isSelected && month && month.length > 0 ) {
            let names = month.map((item) => {
                return item.year + '.' + item.month
            });
            hint = names.join('-');
        }
        return hint;
    }
    render() {
        let { list, currentTab, fromMonth, toMonth } = this.state;
        let _class1 = currentTab == ZERO ? 'work-order-tab-selected' : '';
        let _class2 = currentTab == FIRST ? 'work-order-tab-selected' : '';
        // let count = list.length;
        let _date = new Date();
        let _year = _date.getFullYear();
        let _month = _date.getMonth() + 1;
        let hint = this.getMonthHint();
        // && this.metaData.length > 0
        return (
            <div className="work-order-container">
                <MonthRange
                    defaultValue={this.state.month} 
                    range={{ min: { year: (_year - 1), month: _month }, max: { year: _year, month: _month } }}
                    onCancel={this.cancelMonthRange.bind(this)}
                    onConfirm={this.closeMonthRange.bind(this)}
                    visible={this.state.isShow}
                    onChange={this.handleChangeMonth.bind(this)}>
                </MonthRange>
                {(currentTab == FIRST) ?   
                    <div className="work-order-filter" onClick={(e) => this.showMonthRange(e)}>{hint}</div> : null}
                {/* {(currentTab == ZERO && this.metaData.length > 0) ? <span className="work-order-count-bubble">{count > 99 ? '99+' : count}</span> : null} */}
                <div className="work-order-tabs">
                    <span className={"common-active " + _class1} onClick={(e) => this.changeTabHandler(e, ZERO)}>
                        未完成
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
            // this.defaultMonth = [];
            this.setState({
                list: _list,
                // month: [],
                isSelected: false,
                isShow: false  //测试
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
