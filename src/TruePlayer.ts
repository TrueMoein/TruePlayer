class TruePlayer {
  private video: HTMLVideoElement;

  constructor(id: string) {
    this.video = document.getElementById(id) as HTMLVideoElement;
  }

  public play(): Promise<unknown> {
    return this.video.play();
  }

  public seek(time: number, andPlay = false): Promise<unknown> | void {
    this.video.currentTime = time;
    if (andPlay) return this.play();
    return undefined;
  }
}

export default TruePlayer;
