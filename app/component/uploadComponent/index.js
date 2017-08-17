import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as utils from '../../utils'
import * as Api from '../../static/const/apiConst';
import VideoPlayer from '../videoPlayer';

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
            explain: this.props.explain || '',
            isShowPhotoSelect: false
        }
    }

    componentDidMount() {
        this.setState({
            type: this.props.type,
            photoHint: this.props.photoHint,
            photos: this.props.photos ? [...this.props.photos] : [],
            explainHint: this.props.explainHint,
            explain: this.props.explain || '',
            isShowPhotoSelect: false
        }, () => console.log(this.state))
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
            console.log(file.type);
            let fileType = file.type.indexOf("image") === 0 ? 0 : file.type.indexOf("video") === 0 ? 1 : 2;
            let state = {}
            let data = new FormData()
            data.append('fileDir', 'pvmtssys/' + this.props.uploadModule + '/')
            data.append('file', file)
            AppModal.loading();
            let url = Api.GetUploadApi();
            utils.fetchUtils(url, data, "POST", {}, "form").then((data) => {
                AppModal.hide()
                if (data && data.url) {
                    let oldPhotos = this.state.photos;
                    oldPhotos.push({ filepath: data.url, filename: file.name, documentType: fileType });
                    state.photos = oldPhotos;
                }
                state.isShowPhotoSelect = false;
                this.setState(state);

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
            photos: this.state.photos,
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

    photoSelectComponent() {
        return (
            <div className="photo-select-container">
                <div className="btns-div">
                    <div className="inputBtn"><input type="file" accept="image/*" capture="camera" onChange={(e) => this.choosePhotoHandler(e)} />拍照</div>
                    <div className="inputBtn"><input type="file" accept="video/mp4" capture="camcorder" onChange={(e) => this.choosePhotoHandler(e)} />摄像</div>
                    <div className="inputBtn"><input type="file" accept="video/mp4,image/*" onChange={(e) => this.choosePhotoHandler(e)} />相册</div>
                    <div className="inputBtn" onClick={() => this.setState({ isShowPhotoSelect: false })}>取消</div>
                </div>
            </div>
        )
    }

    render() {
        {/* <video src={item.filepath} controls="controls" x-webkit-airplay="true" webkit-playsinline="true" preload="auto">您的浏览器不支持 video 标签。</video> */ }
        let { type, photoHint, photos, explainHint, explain } = this.state
        let _disabled = type == 1 ? "upload-disabled" : ""; //0未处理，  1 已处理
        let _hint = type == 1 ? '附件' : photoHint;
        let photoBtn = photos.length == 0 ? 'upload-photo-btn-init' : '';
        let noExplain = type == 1 && !explain ? 'no-explain-style' : '';
        explain = type == 1 && !explain ? '无' : explain;
        let noPhotos = (type == 1 && photos.length === 0) ? 'no-photos-style' : '';
        return (
            <div className={"upload-component-wrapper " + _disabled}>
                <div className={"upload-explain-component " + noExplain}>
                    <div className="upload-explain-hint">{explainHint}</div>
                    {_disabled ? <textarea type="text" maxLength={50} disabled value={explain}></textarea> :
                        <textarea type="text" maxLength={50} value={explain} ref='explain'
                            placeholder="请输入说明（可不填）"
                            onChange={(e) => this.changeStateHandler(e, 'explain')}></textarea>}
                </div>
                <div className={"upload-photo-component " + noPhotos}>
                    <div className="upload-photo-hint">{_hint}
                        {_disabled ? null : <span>视频拍摄长度需小于30秒</span>}
                    </div>
                    <ul className={"upload-photo-content " + noPhotos}>
                        {photos.map((item, index) =>
                            <li key={index} className="upload-photo-item">
                                {item.documentType == 0 ? <img src={item.filepath} /> : item.documentType == 1 ?
                                    <VideoPlayer {...{
                                        preload: 'auto',
                                        sources: [{
                                            src: item.filepath,
                                            type: 'video/mp4'
                                        }]
                                    }} />
                                    : ""}
                                {_disabled ? null : <span className="photo-close"
                                    onClick={(e) => this.deletePhotoHandler(e, index)}></span>}
                            </li>
                        )}
                        {_disabled || photos.length >= 5 ? null : <li key={photos.length}
                            className={"upload-photo-item upload-photo-btn " + photoBtn}>
                            <span className="upload-photo-btn-span xy-center" onClick={() => this.setState({ isShowPhotoSelect: true })}></span>
                        </li>}
                        {_disabled && photos.length === 0 ? '无' : null}
                    </ul>
                </div>

                {this.state.isShowPhotoSelect ? this.photoSelectComponent() : ""}
            </div >
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