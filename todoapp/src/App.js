// App.js：Modelの初期化やHTML要素とModel間で発生するイベントを中継する役割

import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/todoListView.js";
import { render } from "./view/html-util.js";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  /**
   * todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{id: number, completed: boolean}}
   */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{id: number}}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.getElementById("js-form");
    const inputElement = document.getElementById("js-form-input");
    const containerElement = document.getElementById("js-todo-list");
    const todoItemCountElement = document.getElementById("js-todo-count");

    // todoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {
      const todoItems = this.#todoListModel.getTodoItems();

      // todoItemsに対応するTodoListViewを作成
      const todoListElement = this.#todoListView.createElement(todoItems, {
        // Todoアイテムが更新されたイベントを発生したときに呼ばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
      });

      render(todoListElement, containerElement);

      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      this.handleAdd(inputElement.value);

      inputElement.value = "";
    });
  }
}
