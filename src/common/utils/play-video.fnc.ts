import * as R from 'ramda';

export const playVideo = (video: HTMLMediaElement) => {
    const playPromise = video.play();
    if (!R.isNil(playPromise)) {
        playPromise
            .then(_ => {})
            .catch(_ => {});
    }
};
