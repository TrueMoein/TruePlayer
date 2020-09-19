import { PlayPromise } from './types/video';
import { subscribeEvents } from './types/events';
import { IState } from './Interface/IState';

class TruePlayer {
  private readonly player: HTMLVideoElement;

  constructor(id: string) {
    this.player = document.querySelector(`video#${id}`) as HTMLVideoElement;
    if (!this.player) {
      throw new Error(`There is no video element with id: ${id}`);
    }
  }

  public play(): PlayPromise {
    return this.player.play();
  }

  public seek(time: number): Promise<string> {
    return new Promise((resolve) => {
      this.player.currentTime = time;
      const unsubscribe = this.subscribe(['seeked'], () => {
        unsubscribe();
        resolve(`Video seeked to ${time} successfully.`);
      });
    });
  }

  public pause(): void {
    this.player.pause();
  }

  public stop(): void {
    this.pause();
    this.seek(0);
  }

  public togglePlay(): PlayPromise | undefined {
    if (this.player.paused) {
      return this.play();
    }
    this.pause();
    return undefined;
  }

  public setVolume(volume: number): void {
    this.player.volume = volume;
  }

  public mute(): void {
    this.player.muted = true;
  }

  public state(event: subscribeEvents): IState {
    return {
      eventType: event,
      currentTime: this.player.currentTime,
      volume: this.player.volume,
      duration: this.player.duration,
      paused: this.player.paused,
    };
  }

  public subscribe(
    events: subscribeEvents[],
    listener: (event: IState) => void,
  ): () => void {
    const listeners: any = {};
    events.forEach((event) => {
      listeners[event] = () => listener(this.state(event));
      this.player.addEventListener(event, listeners[event]);
    });

    return () => {
      events.forEach((event) => {
        this.player.removeEventListener(event, listeners[event]);
      });
    };
  }

  public fullScreen(): Promise<any> {
    return this.player.requestFullscreen();
  }
}

export default TruePlayer;
