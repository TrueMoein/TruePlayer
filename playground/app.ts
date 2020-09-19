import TruePlayer from '../src';

const player = new TruePlayer('my-video');

const toggleButton = document.getElementById('toggle') as HTMLButtonElement;
const muteButton = document.getElementById('mute') as HTMLButtonElement;
const seekInput = document.getElementById('seekInput') as HTMLInputElement;

toggleButton.addEventListener('click', () => {
  player.togglePlay();
});

seekInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    player.seek(+seekInput.value).then(console.log);
  }
});

muteButton.addEventListener('click', () => {
  player.fullScreen();
});
