import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  // TodoListModelの初期化
  #todoListModel = new TodoListModel(); // Privateクラスフィールド

  mount() {
    const formElement = document.getElementById("js-form");
    const inputElement = document.getElementById("js-form-input");
    const containerElement = document.getElementById("js-todo-list");
    const todoItemCountElement = document.getElementById("js-todo-count");

    // todoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {
      // todoリストをまとめるList要素
      const todoListElement = element`<ul></ul>`;

      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems();

      todoItems.forEach((item) => {
        // 追加するTodoアイテムの要素（li要素）を作成
        // 完了済みであればchecked属性をつけ、未完了ならchecked属性を外す
        // input要素にはcheckboxクラスを付ける
        const todoItemElement = item.completed ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>` : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;

        // クラス名にcheckboxを持つ要素を取得
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");

        // `<input type="checkbox">のチェックが変更されたときに呼ばれるイベントリスナーを登録
        inputCheckboxElement.addEventListener("change", () => {
          // チェックボックスの表示が変わったタイミングで呼び出される処理
          this.#todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });

        // TodoアイテムをtodoListElementに追加
        todoListElement.appendChild(todoItemElement);
      });

      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);

      // Todoアイテム数を+1して、表示されているテキストを更新する
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });

    // フォームを送信したら新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      // フォームが持つデフォルト処理；フォームの内容を指定したURLに送信する動作をキャンセルする
      event.preventDefault();

      // 新しいtodoItemをtodoListへ追加する
      this.#todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false
        })
      );

      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";
    });
  }
}
