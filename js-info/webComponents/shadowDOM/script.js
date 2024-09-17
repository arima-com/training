"use strict";

customElements.define(
  "show-hello",
  class extends HTMLElement {
    connectedCallback() {
      // shadow DOMを作成
      // mode="open"のため、elem.shadowRootプロパティでアクセス可能
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `
      <p> Hello, ${this.getAttribute("name")}</p>
      `;
    }
  }
);
