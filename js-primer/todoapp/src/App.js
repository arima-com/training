// App.js：Modelの初期化やHTML要素とModel間で発生するイベントを中継する役割

import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/todoListView.js";
import { render } from "./view/html-util.js";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  formElement;
  formInputElement;
  todoCountElement;
  todoListContainerElement;

  // 紐づけるHTML要素を引数として受け取る
  constructor({ formElement, formInputElement, todoCountElement, todoListContainerElement }) {
    this.formElement = formElement;
    this.formInputElement = formInputElement;
    this.todoCountElement = todoCountElement;
    this.todoListContainerElement = todoListContainerElement;
  }

  /**
   * todoを追加するときに呼ばれるリスナー関数
   * リスナー関数をPrivate Fields + Arrow Functionで定義することで、`this`は常にクラスのインスタンスを示すようになる
   * @param {string} title
   */
  #handleAdd = (title) => {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  };

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{id: number, completed: boolean}}
   */
  #handleUpdate = ({ id, completed }) => {
    this.#todoListModel.updateTodo({ id, completed });
  };

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{id: number}}
   */
  #handleDelete = ({ id }) => {
    this.#todoListModel.deleteTodo({ id });
  };

  /**
   * フォームを送信時に呼ばれるリスナー関数
   * @param [Event] event
   */
  #handleSubmit = (event) => {
    event.preventDefault();
    const inputElement = this.formInputElement;
    this.#handleAdd(inputElement.value);
    inputElement.value = "";
  };

  #handleChange = () => {
    const todoCountElement = this.todoCountElement;
    const todoListContainerElement = this.todoListContainerElement;
    const todoItems = this.#todoListModel.getTodoItems();
    const todoListElement = this.#todoListView.createElement(todoItems, {
      // Todoアイテムが更新されたイベントを発生したときに呼ばれるリスナー関数
      onUpdateTodo: ({ id, completed }) => {
        this.#handleUpdate({ id, completed });
      },
      // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
      onDeleteTodo: ({ id }) => {
        this.#handleDelete({ id });
      }
    });

    render(todoListElement, todoListContainerElement);

    todoCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
  };

  /**
   * アプリとDOMの紐づけを登録する関数
   */
  mount() {
    this.#todoListModel.onChange(this.#handleChange);
    this.formElement.addEventListener("submit", this.#handleSubmit);
  }

  /**
   * アプリとDOMの紐づけを解除する関数
   */
  unmount() {
    this.#todoListModel.offChange(this.#handleChange);
    this.formElement.removeEventListener("submit", this.#handleSubmit);
  }
}
