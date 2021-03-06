import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {
    componentDidMount() {
        // instantiate video.js
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            this.children_[0].setAttribute('x5-video-player-type','h5');
            this.children_[0].setAttribute('x5-video-player-fullscreen', true);
            this.children_[0].setAttribute('playsinline', true);
            this.children_[0].setAttribute('webkit-playsinline', true);
            // playsinline="true" webkit-playsinline="true"
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
            this.player = null;
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <div>
                <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered my-dz-video"></video>
            </div>
        )
    }
}