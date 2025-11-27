export function initPlayerControls() {
    const videoPlayer = document.getElementById('video-player');
    const progressBar = document.getElementById('video-hud__progress-bar');
    const currTime = document.getElementById('video-hud__curr-time');
    const durationTime = document.getElementById('video-hud__duration');
    const actionButton = document.getElementById('video-hud__action');
    const muteButton = document.getElementById('video-hud__mute');
    const volumeScale = document.getElementById('video-hud__volume');
    const speedSelect = document.getElementById('video-hud__speed');
    const fullscreenButton = document.getElementById('video-hud__fullscreen');
    const videoContainer = document.querySelector('.video-container');

    const rewindBackBtn = document.getElementById('video-hud__rewind-back');
    const rewindForwardBtn = document.getElementById('video-hud__rewind-forward');
    const prevEpisodeBtn = document.getElementById('video-hud__prev-episode');
    const nextEpisodeBtn = document.getElementById('video-hud__next-episode');
    const backButton = document.getElementById('video-hud__back');

    if (!videoPlayer) return;

    actionButton.className = 'video-hud__action video-hud__action-play';

    let hideTimeout;
    const hud = document.querySelector('.video-hud');
    const container = videoContainer;

    function showControls() {
        clearTimeout(hideTimeout);
        container.classList.add('controls-visible');
        hud.classList.add('visible');
        hud.style.opacity = '1';
        hud.style.pointerEvents = 'all';
        if (backButton) backButton.style.opacity = '1';
        if (document.fullscreenElement) {
            hideTimeout = setTimeout(hideControls, 3000);
        }
    }

    function hideControls() {
        if (document.fullscreenElement) {
            container.classList.remove('controls-visible');
            hud.classList.remove('visible');
            container.classList.add('hide-controls');
            hud.style.opacity = '0';
            hud.style.pointerEvents = 'none';
            if (backButton) backButton.style.opacity = '0';
        }
    }

    container.addEventListener('mousemove', showControls);

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            showControls(); 
        } else {
            clearTimeout(hideTimeout);
            container.classList.remove('hide-controls');
            container.classList.add('controls-visible');
            hud.style.opacity = '1';
            hud.style.pointerEvents = 'all';
        }
    });

    showControls();

    function videoTime(time) {
        if (isNaN(time)) return '00:00';
        time = Math.floor(time);
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    let isToggling = false;

    async function togglePlayPause() {
        if (isToggling) return;
        isToggling = true;

        try {
            if (videoPlayer.paused) {
                await videoPlayer.play();
                actionButton.className = 'video-hud__action video-hud__action-pause';
            } else {
                videoPlayer.pause();
                actionButton.className = 'video-hud__action video-hud__action-play';
            }

            if (durationTime.innerHTML === '00:00' && videoPlayer.duration) {
                durationTime.innerHTML = videoTime(videoPlayer.duration);
            }
        } catch (err) {
            console.warn('Play interrupted:', err);
        } finally {
            setTimeout(() => { isToggling = false; }, 100);
        }
    }

    function videoProgress() {
        if (!videoPlayer.duration) return;
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = progress;
        currTime.innerHTML = videoTime(videoPlayer.currentTime);
    }

    function videoChangeTime(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoPlayer.currentTime = pos * videoPlayer.duration;
    }

    function videoChangeVolume() {
        const volume = volumeScale.value / 100;
        videoPlayer.volume = volume;

        muteButton.className = volume === 0
            ? 'video-hud__mute video-hud__mute-true'
            : 'video-hud__mute video-hud__mute-false';
    }

    function videoMute() {
        if (videoPlayer.volume === 0) {
            const lastVolume = volumeScale.value / 100 || 0.8;
            videoPlayer.volume = lastVolume;
            volumeScale.value = lastVolume * 100;
            muteButton.className = 'video-hud__mute video-hud__mute-false';
        } else {
            videoPlayer.volume = 0;
            muteButton.className = 'video-hud__mute video-hud__mute-true';
        }
    }

    function videoChangeSpeed() {
        videoPlayer.playbackRate = speedSelect.value / 100;
    }

    function rewind(seconds) {
        videoPlayer.currentTime = Math.max(0, Math.min(videoPlayer.duration, videoPlayer.currentTime + seconds));
    }

    function toggleFullscreen() {
        const isMobile = window.innerWidth <= 768;

        if (!document.fullscreenElement) {
            const elementToFullscreen = isMobile ? document.documentElement : videoContainer;

            elementToFullscreen.requestFullscreen({ navigationUI: "hide" }).then(() => {
                fullscreenButton.className = 'video-hud__action video-hud__fullscreen-true';

                if (isMobile) {
                    setTimeout(() => {
                        videoContainer.classList.add('mobile-fs-rotated');
                    }, 100);

                    if (screen.orientation?.lock) {
                        screen.orientation.lock('landscape-primary').catch(() => {});
                    }
                }
            }).catch(err => {
                console.warn('Fullscreen denied:', err);
            });

        } else {
            document.exitFullscreen().then(() => {
                fullscreenButton.className = 'video-hud__action video-hud__fullscreen-false';

                if (isMobile) {
                    videoContainer.classList.remove('mobile-fs-rotated');
                    if (screen.orientation?.unlock) screen.orientation.unlock();
                }
            });
        }
    }


    function goBack() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        window.history.back();
    }

    actionButton.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
    });
    videoPlayer.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
    });
    videoPlayer.addEventListener('dblclick', toggleFullscreen);

    videoPlayer.addEventListener('timeupdate', videoProgress);
    videoPlayer.addEventListener('loadedmetadata', () => {
        durationTime.innerHTML = videoTime(videoPlayer.duration);
    });

    progressBar.addEventListener('click', videoChangeTime);

    volumeScale.addEventListener('input', videoChangeVolume);
    volumeScale.addEventListener('change', videoChangeVolume);

    muteButton.addEventListener('click', videoMute);
    speedSelect.addEventListener('change', videoChangeSpeed);
    fullscreenButton.addEventListener('click', toggleFullscreen);

    if (rewindBackBtn) rewindBackBtn.addEventListener('click', () => rewind(-10));
    if (rewindForwardBtn) rewindForwardBtn.addEventListener('click', () => rewind(10));

    if (prevEpisodeBtn) prevEpisodeBtn.disabled = true;
    if (nextEpisodeBtn) nextEpisodeBtn.disabled = true;

    if (backButton) backButton.addEventListener('click', goBack);

    document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
    }

    switch (e.key) {
        case 'Escape':
            goBack();
            break;

        case 'ArrowLeft':
            e.preventDefault();
            rewind(-10);
            break;

        case 'ArrowRight':
            e.preventDefault();
            rewind(10);
            break;
    }

    });

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenButton.className = 'video-hud__action video-hud__fullscreen-true';
        } else {
            fullscreenButton.className = 'video-hud__action video-hud__fullscreen-false';
        }
    });
}