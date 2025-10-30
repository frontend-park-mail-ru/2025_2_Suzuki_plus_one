import './styles/player.scss'
import template from './ui/Player.hbs';
import { initPlayerControls } from './js/player-controls.js';
import video from '@assets/videos/trailer.mp4'
import poster from '@assets/images/poster.png'

class Player {
  #parent;
  #app;

  constructor(parent, appInstance) {
    this.#parent = parent;
    this.#app = appInstance;
  }

  render() {
    this.#parent.innerHTML = template({ video, poster });
    requestAnimationFrame(() => {
    initPlayerControls();
  });
  }
}

export default Player;
