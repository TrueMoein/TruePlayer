import { PlayPromise } from './types/video';
import { subscribeEvents } from './types/events';
import { IState } from './Interface/IState';

class TruePlayer {
  private readonly palyer: HTMLVideoElement;

  constructor(id: string) {
    this.palyer = document.querySelector(`video#${id}`) as HTMLVideoElement;
    if (!this.palyer) {
      throw new Error(`There is no video element with id: ${id}`);
    }
  }

  public play(): PlayPromise {
    return this.palyer.play();
  }

  public seek(time: number): Promise<string> {
    return new Promise((resolve) => {
      this.palyer.currentTime = time;
      const unsubscribe = this.subscribe(['seeked'], () => {
        unsubscribe();
        resolve(`Video seeked to ${time} successfully.`);
      });
    });
  }

  public pause(): void {
    this.palyer.pause();
  }

  public stop(): void {
    this.pause();
    this.seek(0);
  }

  public togglePlay(): PlayPromise | undefined {
    if (this.palyer.paused) {
      return this.play();
    }
    this.pause();
    return undefined;
  }

  public volume(volume: number): void {
    this.palyer.volume = volume;
  }

  public mute(): void {
    this.volume(0);
  }

  public state(event: subscribeEvents): IState {
    return {
      eventType: event,
      currentTime: this.palyer.currentTime,
      volume: this.palyer.volume,
      duration: this.palyer.duration,
      paused: this.palyer.paused,
    };
  }

  public subscribe(
    events: subscribeEvents[],
    listener: (event: IState) => void,
  ): () => void {
    const listeners: any = {};
    events.forEach((event) => {
      listeners[event] = () => listener(this.state(event));
      this.palyer.addEventListener(event, listeners[event]);
    });

    return () => {
      events.forEach((event) => {
        this.palyer.removeEventListener(event, listeners[event]);
      });
    };
  }

  public fullScreen(): Promise<any> {
    return this.palyer.requestFullscreen();
  }
}

export default TruePlayer;
