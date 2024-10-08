import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  #items;

  /**
   * TodoItemModelの配列をも辞し、新しいTodoアイテムを追加する際は、配列に追加する
   * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor(items = []) {
    super();
    this.#items = items;
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.#items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.#items;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /**
   * `onChange`で登録したリスナー関数を解除する
   * @param {Function} listener
   */
  offChange(listener) {
    this.removeEventListener("change", listener);
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す。
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * todoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    if (todoItem.isEmptyTitle()) {
      return;
    }
    this.#items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {id: number, completed: boolean}
   */
  updateTodo({ id, completed }) {
    // `id`が一致するTodoItemを見つけ、あるなら完了状態の値を更新する
    const todoItem = this.#items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのtodoItemを削除する
   * @param {id: number}
   */
  deleteTodo({ id }) {
    // `id`に一致しないTodoItemだけ残すことで `id`に一致するtodoItemを削除する
    this.#items = this.#items.filter((todo) => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
