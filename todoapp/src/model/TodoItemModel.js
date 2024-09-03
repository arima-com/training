// 各Todoアイテムに必要な情報を定義
// タイトル・完了状態・ユニークな識別子をアイテムに持たせる

// ユニークなIDを管理する変数
let todoIndex = 0;

export class TodoItemModel {
  /** @type {number} TodoアイテムのID */
  id;

  /** @type {string} Todoアイテムのタイトル */
  title;

  /** @type {boolean} Todoアイテムが完了済みならtrue,そうでない場合はfalse */
  completed;

  /** @param {{ title: string, completed: boolean}} */
  constructor({ title, completed }) {
    // idは連番となり、それぞれのインスタンスごとに異なる
    this.id = todoIndex++;
    this.title = title;
    this.completed = completed;
  }
}
