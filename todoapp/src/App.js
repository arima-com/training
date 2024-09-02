import { element, render } from "./view/html-util.js";

export class App {
  constructor() {
    console.log("App initialized");
  }

  mount() {
    const formElement = document.getElementById("js-form");
    const inputElement = document.getElementById("js-form-input");
    const containerElement = document.getElementById("js-todo-list");
    const todoItemCountElement = document.getElementById("js-todo-count");
    const todoListElement = element`<ul></ul>`;
    let todoItemCount = 0;

    formElement.addEventListener("submit", (event) => {
      // フォームが持つデフォルト処理；フォームの内容を指定したURLに送信する動作をキャンセルする
      event.preventDefault();

      const todoItemElement = element`<li>${inputElement.value}</li>`;

      todoListElement.appendChild(todoItemElement);

      todoItemCount++;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

      inputElement.value = "";
    });
  }
}
