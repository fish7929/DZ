import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router';

import { ZERO, FIRST } from '../../../static/const/constants';
import WorkOrderItem from '../../../component/workOrderItem';
import ScrollList from '../../../component/scrollList';
import './index.scss';

class WorkOrder extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            currentTab: 0,   //当前标签
            list: this.props.data,
            currentPage: 1

        }
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
        this.setState({currentPage: page});
        this.props.onChange && this.props.onChange(this.state.currentTab, page);
    }
    render() {
        let { list, currentTab } = this.state;
        console.log(list, 9999);
        let _class1 = currentTab == ZERO ? 'work-order-tab-selected' : '';
        let _class2 = currentTab == FIRST ? 'work-order-tab-selected' : '';
        return (
            <div className="work-order-container">
                <div className="work-order-tabs">
                    <span className={"common-active " + _class1} onClick={(e) => this.changeTabHandler(e, ZERO)}>未完成</span>
                    <span className={"common-active " + _class2} onClick={(e) => this.changeTabHandler(e, FIRST)}>已完成</span>
                </div>
                {/*<ul className="work-order-content">*/}
                <ScrollList className="work-order-content" onScroll={ page=>this.onScrollHandler(page) } currentPage={ this.state.currentPage } pageTotal={ this.props.total }>
                    {list.map( (item, index) => <WorkOrderItem data={item} key={index} />)}
                {/*</ul>*/}
                </ScrollList>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                list: nextProps.data
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
