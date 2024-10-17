import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

// ページコンポーネント関数にpropsを受け取る引数を追加
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // useStateを使用して、imageUrl / loadingの状態を定義する
  /**
   * imageUrl: 画像のURL
   * loading: APIが呼び出し中かどうか
   */
  const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
  const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく

  // マウント時（コンポーネントがユーザーの画面に表示された時）に画像を読み込み宣言
  // useEffectには非同期関数直接渡すことができない
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url); // 画像URLの状態を更新する
  //     setLoading(false); // ローディング状態を更新する
  //   });
  // }, []); // []はコンポーネントがマウントされたときのみ実行

  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読込中フラグを更新
  };

  // ローディング中でなければ画像を表示する
  // JSXの{}で囲ったブブにはJavaScriptの式だけがかける（文は書けない）
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        ほかのにゃんこもみる
      </button>
      <div className={styles.frame}>{loading || <img src={imageUrl} className={styles.img} />}</div>;
    </div>
  );
};
export default IndexPage;

/*
// 関数宣言に書き換えると
export default function IndexPage(): ReactElement<any, any> | null {
  return <div>猫画像予定地</div>
}
*/

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url
    }
  };
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

// 上記のコードはクライアントサイドが期待するデータ構造をサーバーサイドが必ず返すことを前提としたコード
// より防衛的にするならクライアントサイドではサーバーのレスポンスをチェックするほうが望ましい

/*
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  IndexPage;

  // 配列として表現されているか
  if (!Array.isArray(images)) {
    throw new Error("猫の画像が取得できませんでした");
  }
  const image: unknown = images[0];

  // Imageの構造をなしているか
  if (!isImage(image)) {
    throw new Error("猫の画像が取得できませんでした");
  }
  return image;
};

// 型ガードの関数
const isImage = (value: unknown): value is Image => {
  // 値がオブジェクトなのか
  if (!value || typeof value !== "object") {
    return false;
  }

  // urlプロパティが存在し、かつ、それが文字列なのか？
  return "url" in value && typeof value.url === "string";
};
 */
