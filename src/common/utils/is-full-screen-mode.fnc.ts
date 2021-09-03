export const isFullScreenMode = () =>
    document.fullscreenElement || (<any>document).mozFullScreenElement || (<any>document).webkitFullscreenElement;
