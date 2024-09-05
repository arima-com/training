import { App } from "./src/App.js";

const formElement = document.getElementById("js-form");
const formInputElement = document.getElementById("js-form-input");
const todoCountElement = document.getElementById("js-todo-count");
const todoListContainerElement = document.getElementById("js-todo-list");

const app = new App({
  formElement,
  formInputElement,
  todoCountElement,
  todoListContainerElement
});

// Webページのライフサイクルに合わせて、mountメソッド/unmountメソッドを実装する
window.addEventListener("load", () => {
  app.mount();
});

window.addEventListener("unload", () => {
  app.unmount();
});
