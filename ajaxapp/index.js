/*
function main() {
  fetchUserInfo("js-primer-example")
  .then(userInfo => createView(userInfo)) // HTMLの組み立て
  .then(view => displayView(view)) // HTMLの挿入
  .catch((error) => {
    console.error(`エラーが発生しました ${error}`);
  });
}
*/

async function main() {
  try {
    const userId = getUserId();
    const userInfo = await fetchUserInfo(userId);
    const view = createView(userInfo);
    displayView(view);
  } catch {
    console.error(`エラーが発生しました ${error}`);
  }
}

function getUserId() {
  return document.getElementById("userId").value;
}

function fetchUserInfo(userId) {
  return fetch(
    `https://api.github.com/users/${encodeURIComponent(userId)}`
  ).then((response) => {
    /*
    // HTTPレスポンスのステータスコードを取得
    console.log(response.status);
    */
    // エラーレスポンドが返されたことを検知
    // HTTPステータスが200番台であれば、trueを返す
    if (!response.ok) {
      return Promise.reject(
        new Error(`${response.status}: ${response.statusText}`)
      );
    } else {
      return response.json();
    }
  });
  /*
    // rejectされたPromiseの場合
    .catch((error) => {
      console.error(error);
    });
    */
}

function createView(userInfo) {
  return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url} alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
