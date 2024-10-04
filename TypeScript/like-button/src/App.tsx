// import React from "react";
import logo from "./logo.svg";
import "./App.css"; // cssをimportしているので、App.cssにLikeButtonのスタイルを追加すると反映される
import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LikeButton />
      </header>
    </div>
  );
}

// 関数コンポーネント：JSXを戻り値にする関数
function LikeButton() {
  /**
   * count: 999
   * setCount: countの値を変更する関数が代入されている
   */
  const [count, setCount] = useState(999);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <span className="likeButton" onClick={handleClick}>
      ♥ {count}
    </span>
  );
}

export default App;
