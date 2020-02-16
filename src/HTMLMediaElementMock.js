Object.defineProperty(window.HTMLMediaElement.prototype, "duration", {
  value: 0,
  writable: true
});
Object.defineProperty(window.HTMLMediaElement.prototype, "currentTime", {
  value: 0,
  writable: true
});
Object.defineProperty(window.HTMLMediaElement.prototype, "paused", {
  value: true,
  writable: true
});
Object.defineProperty(window.HTMLMediaElement.prototype, "ended", {
  value: false,
  writable: true
});
window.HTMLMediaElement.prototype.defaultMockTimeIncrement = 1;
window.HTMLMediaElement.prototype.advanceAudioPlayer = function() {
  console.log(`In advanceAudioPlayer`);
  if (!this.mockTimeIncrement) {
    this.mockTimeIncrement = this.defaultMockTimeIncrement;
  }
  if (Math.floor(this.currentTime) === this.duration) {
    this.ended = true;
    return;
  }
  if (!this.paused && !this.ended) {
    console.log(`setting timeout in audio player`);
    setTimeout(() => {
      console.log(`executing timeout in audio player`);
      this.currentTime += this.mockTimeIncrement;
      this.dispatchEvent(new window.Event("timeupdate"));
      this.advanceAudioPlayer();
    }, this.mockTimeIncrement * 1000);
  }
};
window.HTMLMediaElement.prototype.play = function() {
  this.paused = false;
  this.advanceAudioPlayer();
};
window.HTMLMediaElement.prototype.pause = function() {
  this.paused = true;
};
