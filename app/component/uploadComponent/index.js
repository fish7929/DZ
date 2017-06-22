import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import './index.scss'
import TestPhoto from '../../static/images/test.png'; 
class UploadComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            type: this.props.type,
            photoHint: this.props.photoHint,
            photos: this.props.photos,
            explainHint: this.props.explainHint,
            explain: this.props.explain
        }
    }

    componentDidMount() {
    }
    /**
     * 修改状态
     * @param {object} e 事件对象
     * @param {string} key 需要保存的key 
     */
    changeStateHandler(e, key) {
        e.preventDefault();
        e.stopPropagation();
        let obj = {};
        let val = e.target.value;
        obj[key] = val;
        this.setState(obj);
    }
    /**
     * 选择图片
     * @param {object} e 事件对象
     */
    choosePhotoHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        //test 
        let oldPhotos = this.state.photos;
        oldPhotos.push(TestPhoto);
        this.setState({photos: oldPhotos});
    }
    /**
     * 删除单张照片
     * @param {object} e 事件对象
     * @param {number} key 下标
     */
    deletePhotoHandler(e, key) {
        e.preventDefault();
        e.stopPropagation();
        //test 
        let oldPhotos = this.state.photos;
        let newPhotos =  oldPhotos.filter((item, index) => index != key);
        this.setState({photos: newPhotos});
    }
    getUploadContent() {
        this.cancelFocus();
        let obj = {
            explain: this.state.explain,
            photos: this.state.photos
        };
        return obj;
    }
    /**
     * 更新属性
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            type: nextProps.type,    //消息框类型
            photoHint: nextProps.photoHint,
            photos: nextProps.photos,
            explainHint: nextProps.explainHint,
            explain: nextProps.explain
        });
    }
    render() {
        let { type, photoHint, photos, explainHint, explain } = this.state
        let _disabled = type == 1 ? "upload-disabled" : ""; //0未处理，  1 已处理
        let _hint = type == 1 ? '附件' : photoHint;
        let photoBtn = photos.length == 0 ? 'no-border' : '';
        return (
            <div className={"upload-component-wrapper " + _disabled}>
                <div className="upload-explain-component">
                    <div className="upload-explain-hint">{explainHint}</div>
                    {_disabled ? <textarea type="text" maxLength={200} disabled value={explain}></textarea> :
                        <textarea type="text" maxLength={200} value={explain} ref='explain'
                            placeholder="请输入说明（可不填）" 
                            onChange={(e) => this.changeStateHandler(e, 'explain')}></textarea>}
                </div>
                <div className="upload-photo-component">
                    <div className="upload-photo-hint">{_hint}
                        {_disabled ? null : <span>视频拍摄长度需小于30秒</span>}
                    </div>
                    <ul className="upload-photo-content">
                        {photos.map((item, index) =>
                            <li key={index} className="upload-photo-item">
                                <img src={item}/>
                                {_disabled ? null : <span className="photo-close" 
                                onClick={(e) => this.deletePhotoHandler(e, index)}></span>}
                            </li>
                        )}
                        {_disabled ? null : <li key={photos.length} onClick={(e) => this.choosePhotoHandler(e)}
                            className={"upload-photo-item upload-photo-btn " + photoBtn}>
                        </li>}
                    </ul>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        this.cancelFocus();
    }
    cancelFocus() {
        let _explain = ReactDOM.findDOMNode(this.refs.explain);
        _explain && _explain.blur();
    }
}

UploadComponent.PropTypes = {
    type: PropTypes.number.isRequired,
    photoHint: PropTypes.string,
    photos: PropTypes.array,
    explainHint: PropTypes.string,
    explain: PropTypes.string
}

UploadComponent.defaultProps = {
    photos: [TestPhoto, TestPhoto, TestPhoto, TestPhoto, TestPhoto, TestPhoto],
    photoHint: '上传附件',
    explain: '检查结论检查结论检查结论检查结论检查结论检查结论检查结论',
    explainHint: '说明'
}

export default UploadComponent;