import { PlayPromise } from './types/video';

class TruePlayer {
  private video: HTMLVideoElement;

  constructor(id: string) {
    this.video = document.getElementById(id) as HTMLVideoElement;
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
}

export default TruePlayer;
