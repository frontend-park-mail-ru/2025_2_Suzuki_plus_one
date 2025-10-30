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

  if (!videoPlayer) return;

  actionButton.setAttribute('class', 'video-hud__action video-hud__action-play');

  function videoAct() {
    if (videoPlayer.paused) {
      videoPlayer.play();
      actionButton.className = 'video-hud__action video-hud__action-pause';
    } else {
      videoPlayer.pause();
      actionButton.className = 'video-hud__action video-hud__action-play';
    }
    if (durationTime.innerHTML === '00:00') {
      durationTime.innerHTML = videoTime(videoPlayer.duration);
    }
  }

  function videoTime(time) {
    time = Math.floor(time);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  function videoProgress() {
    const progress =
      Math.floor(videoPlayer.currentTime) /
      (Math.floor(videoPlayer.duration) / 100);
    progressBar.value = progress;
    currTime.innerHTML = videoTime(videoPlayer.currentTime);
  }

  function videoChangeTime(e) {
    const mouseX = e.pageX - progressBar.offsetLeft;
    const progress = mouseX / (progressBar.offsetWidth / 100);
    videoPlayer.currentTime = videoPlayer.duration * (progress / 100);
  }

  function videoChangeVolume() {
    const volume = volumeScale.value / 100;
    videoPlayer.volume = volume;
    muteButton.className =
      volume === 0
        ? 'video-hud__mute video-hud__mute-true'
        : 'video-hud__mute video-hud__mute-false';
  }

  function videoMute() {
    if (videoPlayer.volume === 0) {
      videoPlayer.volume = volumeScale.value / 100;
      muteButton.className = 'video-hud__mute video-hud__mute-false';
    } else {
      videoPlayer.volume = 0;
      muteButton.className = 'video-hud__mute video-hud__mute-true';
    }
  }

  function videoChangeSpeed() {
    const speed = speedSelect.value / 100;
    videoPlayer.playbackRate = speed;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
      fullscreenButton.className =
        'video-hud__fullscreen video-hud__fullscreen-true';
    } else {
      document.exitFullscreen();
      fullscreenButton.className =
        'video-hud__fullscreen video-hud__fullscreen-false';
    }
  }

  actionButton.addEventListener('click', videoAct);
  videoPlayer.addEventListener('click', videoAct);
  videoPlayer.addEventListener('timeupdate', videoProgress);
  progressBar.addEventListener('click', videoChangeTime);
  muteButton.addEventListener('click', videoMute);
  volumeScale.addEventListener('change', videoChangeVolume);
  speedSelect.addEventListener('change', videoChangeSpeed);
  fullscreenButton.addEventListener('click', toggleFullscreen);
  videoPlayer.addEventListener('dblclick', toggleFullscreen);
}

