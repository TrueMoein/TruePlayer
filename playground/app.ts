import { TruePlayer } from '../index';

const player = new TruePlayer('my-video');

const toggleButton = document.getElementById('toggle') as HTMLButtonElement;
const muteButton = document.getElementById('mute') as HTMLButtonElement;
const seekInput = document.getElementById('seekInput') as HTMLInputElement;

toggleButton.addEventListener('click', () => {
  player.togglePlay();
});

seekInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    player.seek(+seekInput.value, true);
  }
});

muteButton.addEventListener('click', () => {
  player.mute();
});

player.subscribe(['timeupdate'], console.log);
