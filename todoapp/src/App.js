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
    // Todoアイテムをまとめるリスト
    const todoListElement = element`<ul></ul>`;
    // 表示されているTodoアイテム数
    let todoItemCount = 0;

    formElement.addEventListener("submit", (event) => {
      // フォームが持つデフォルト処理；フォームの内容を指定したURLに送信する動作をキャンセルする
      event.preventDefault();

      // 追加するTodoアイテムの要素（li要素）を作成
      const todoItemElement = element`<li>${inputElement.value}</li>`;

      // TodoアイテムをtodoListElementに追加
      todoListElement.appendChild(todoItemElement);

      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);

      // Todoアイテム数を+1して、表示されているテキストを更新する
      todoItemCount++;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";
    });
  }
}
