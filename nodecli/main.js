// console.log(process.argv); // コマンドライン引数を取得できる

/**
 * CLIアプリケーションの目的
 * → コマンドライン引数として与えられたMarkdownファイルをHTMLに変換する
 */

/**
 * import
 */

// comanderモジュールからprogramオブジェクトをインポートする
import { program } from "commander";

// 非同期形式のAPI：fn/promisesモジュール全体を読み込む
import * as fs from "node:fs/promises";

// markedライブラリを使用。markedモジュールからmarkedオブジェクトをインポートする
// import { marked } from "marked";
import { md2html } from "./md2html.js";

/**
 * gfmオプションの設定
 */

// gfmオプションの定義
program.option("--gfm", "GFMを有効にする");

// コマンドライン引数をcommanderでパースする
// program.args配列に--key=valueのようなオプジョンや--flagのようなフラグを取り除いた残りのコマンドライン引数が順番に格納
program.parse(process.argv);

// ファイルパスをprocess.args配列から取り出す
const filePath = program.args[0];

/*
// コマンドライン引数のオプションを取得
const options = program.opts();

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書き
// → markedの挙動が変わった時に影響を受けにくくするため
const cliOptions = {
  gfm: options.gfm ?? false,
};
*/

const cliOptions = {
  gfm: false,
  ...program.opts(),
};

fs.readFile(filePath, { encoding: "utf8" })
  .then((file) => {
    // const html = marked.parse(file, {
    //   gfm: cliOptions.gfm,
    // });
    const html = md2html(file, cliOptions);

    console.log(html);
  })
  .catch((err) => {
    console.error(err.message);

    // 終了ステータス1（一般的なエラー）としてプロセスを終了する
    process.exit(1);
  });
