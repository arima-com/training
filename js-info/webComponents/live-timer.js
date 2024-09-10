// Autonomous custom elements
/**
 * 内部的に <time-formatted> を使用し、その機能を重複しないようにする
 * 毎秒ごとに更新（ティック）
 * 各ティックごとに、現在の日時を event.detail に含めたカスタムイベント（イベント名: tick）が生成
 */
class LiveTimer extends HTMLElement {
  render() {
    this.innerHTML = `
    <time-formatted hour="numeric" minute="numeric" second="numeric"></time-formatted>
    `;
    this.timerElem = this.firstElementChild;
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
    this.timer = setInterval(() => this.update(), 1000);
  }

  update() {
    this.date = new Date();
    this.timerElem.setAttribute('datetime', this.date);
    this.dispatchEvent(new CustomEvent('tick', { detail: this.date }));
  }

  disconnectedCallback() {
    clearInterval(this.time);
  }
}

customElements.define('live-timer', LiveTimer);
