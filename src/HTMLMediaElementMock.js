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
Object.defineProperty(window.HTMLMediaElement.prototype, "advanceAudioPlayer", {
  writable: true,
  value: function() {
    if (Math.floor(this.currentTime) === this.duration) {
      this.ended = true;
      return;
    }
    if (!this.paused && !this.ended) {
      setTimeout(() => {
        this.currentTime += this.mockTimeIncrement;
        this.dispatchEvent(new window.Event("timeupdate"));
        this.advanceAudioPlayer();
      }, this.mockTimeIncrement * 1000);
    }
  }
});
Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
  writable: true,
  value: jest.fn(function() {
    this.paused = false;
    this.advanceAudioPlayer();
  })
});
Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
  writable: true,
  value: jest.fn(function() {
    this.paused = true;
  })
});
