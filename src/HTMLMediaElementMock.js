Object.defineProperty(window.HTMLMediaElement.prototype, "duration", {
  value: 4,
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
window.HTMLMediaElement.prototype.advanceAudioPlayer = function() {
  const timeIncrement = 0.1;
  if (Math.floor(this.currentTime) === this.duration) {
    this.ended = true;
    return;
  }
  if (!this.paused && !this.ended) {
    this.currentTime += timeIncrement;
    this.dispatchEvent(new window.Event("timeupdate"));
    setTimeout(() => {
      this.advanceAudioPlayer();
    }, timeIncrement * 1000);
  }
};
window.HTMLMediaElement.prototype.fastSeek = function(time) {
  this.currentTime = time;
};
window.HTMLMediaElement.prototype.play = function() {
  this.paused = false;
  this.advanceAudioPlayer();
};
window.HTMLMediaElement.prototype.pause = function() {
  this.paused = true;
};
