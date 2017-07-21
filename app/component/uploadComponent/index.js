import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as utils from '../../utils'
import * as Api from '../../static/const/apiConst';

import './index.scss'
import TestPhoto from '../../static/images/test.png';
class UploadComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            type: this.props.type,
            photoHint: this.props.photoHint,
            photos: this.props.photos ? [...this.props.photos] : [],
            explainHint: this.props.explainHint,
            explain: this.props.explain || ''
        }
    }

    componentDidMount() {
        this.setState({
            type: this.props.type,
            photoHint: this.props.photoHint,
            photos: this.props.photos ? [...this.props.photos] : [],
            explainHint: this.props.explainHint,
            explain: this.props.explain || ''
        }, ()=>console.log(this.state))
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
        let file = e.target.files[0];
        if (file) {
            let data = new FormData()
            data.append('fileDir', 'pvmtssys/' + this.props.uploadModule + '/')
            data.append('file', file)
            AppModal.loading();
            let url = Api.GetUploadApi();
            utils.fetchUtils(url, data, "POST", {}, "form").then((data) => {
                AppModal.hide()
                if (data && data.url) {
                    let oldPhotos = this.state.photos;
                    oldPhotos.push({ filepath: data.url, filename: file.name });
                    this.setState({ photos: oldPhotos });
                }

            }).catch((e) => AppModal.hide());
        }
        //test 

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
        let newPhotos = oldPhotos.filter((item, index) => index != key);
        this.setState({ photos: newPhotos });
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
            photos: nextProps.photos ? [...nextProps.photos] : [],
            explainHint: nextProps.explainHint,
            explain: nextProps.explain || ""
        });
    }
    render() {
        let { type, photoHint, photos, explainHint, explain } = this.state
        let _disabled = type == 1 ? "upload-disabled" : ""; //0未处理，  1 已处理
        let _hint = type == 1 ? '附件' : photoHint;
        let photoBtn = photos.length == 0 ? 'upload-photo-btn-init' : '';
        return (
            <div className={"upload-component-wrapper " + _disabled}>
                <div className="upload-explain-component">
                    <div className="upload-explain-hint">{explainHint}</div>
                    {_disabled ? <textarea type="text" maxLength={50} disabled value={explain}></textarea> :
                        <textarea type="text" maxLength={50} value={explain} ref='explain'
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
                                <img src={item.filepath} />
                                {_disabled ? null : <span className="photo-close"
                                    onClick={(e) => this.deletePhotoHandler(e, index)}></span>}
                            </li>
                        )}
                        {_disabled || photos.length >=5 ? null : <li key={photos.length}
                            className={"upload-photo-item upload-photo-btn " + photoBtn}>
                            <input name="file" className="upload-inpu-file" type="file" accept="video/*,image/*" onChange={(e) => this.choosePhotoHandler(e)} />
                            <span className="upload-photo-btn-span xy-center"></span>
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
    explain: PropTypes.string,
    uploadModule: PropTypes.string
}

UploadComponent.defaultProps = {
    photos: [],
    photoHint: '上传附件',
    explain: '',
    explainHint: '说明',
    uploadModule: 'physical'
}

export default UploadComponent;