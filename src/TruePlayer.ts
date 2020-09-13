import { PlayPromise } from './types/video';
import { subscribeEvents } from './types/events';
import { IState } from './Interface/IState';

class TruePlayer {
  private readonly video: HTMLVideoElement;

  constructor(id: string) {
    this.video = document.querySelector(`video#${id}`) as HTMLVideoElement;
    if (!this.video) {
      throw new Error(`There is no video element with id: ${id}`);
    }
  }

  public play(): PlayPromise {
    return this.video.play();
  }

  public seek(time: number, withPlay = false): PlayPromise | undefined {
    this.video.currentTime = time;
    if (withPlay) return this.play();
    return undefined;
  }

  public pause(): void {
    this.video.pause();
  }

  public stop(): void {
    this.pause();
    this.seek(0);
  }

  public togglePlay(): PlayPromise | undefined {
    if (this.video.paused) {
      return this.play();
    }
    this.pause();
    return undefined;
  }

  public volume(volume: number): void {
    this.video.volume = volume;
  }

  public mute(): void {
    this.volume(0);
  }

  public state(): IState {
    return {
      currentTime: this.video.currentTime,
      volume: this.video.volume,
    };
  }

  public subscribe(event: subscribeEvents, listener): void {
    this.video.addEventListener(event, () => {
      listener(this.state());
    });
  }
}

export default TruePlayer;
