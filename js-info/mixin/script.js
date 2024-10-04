"use strict";

{
  let eventMixin = {
    /**
     * イベントの購読
     * menu.on('select', function(item) { ... })
     */
    on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};
      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }
      this._eventHandlers[eventName].push(handler);
    },

    /**
     * 購読のキャンセル
     * menu.off('select', handler)
     */
    off(eventName, handler) {
      let handlers = this._eventHandlers && this._eventHandlers[eventName];
      if (!handlers) return;
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] == handler) {
          handlers.splice(i--, 1);
        }
      }
    },

    /**
     * イベントを生成してデータをアタッチ
     * this.trigger('select', data1, data2)
     */
    trigger(eventName, ...args) {
      if (!this._eventHandlers || !this._eventHandlers[eventName]) {
        return;
      }

      // ハンドラ呼び出し
      this._eventHandlers[eventName].forEach((handler) => handler.apply(this, args));
    }
  };

  // 使い方
  class Menu {
    choose(value) {
      this.trigger("select", value);
    }
  }

  // mixinを追加
  Object.assign(Menu.prototype, eventMixin);

  let menu = new Menu();

  // 選択時にハンドラを呼び出し
  menu.on("select", (value) => alert("value selected" + value));
}
