"use strict";

{
  // n日前の日付
  function getDateAgo(date, days) {
    let dateCopy = new Date(date);

    dateCopy.setDate(date.getDate() - days);
    return dateCopy.getDate();
  }

  let date = new Date(2015, 0, 2);

  //   alert(getDateAgo(date, 1)); // 1, (1 Jan 2015)
  //   alert(getDateAgo(date, 2)); // 31, (31 Dec 2014)
  //   alert(getDateAgo(date, 365)); // 2, (2 Jan 2014)
}

{
  // 月の最終日
  function getLastDayOfMonth(year, month) {
    // 日に0を渡すことで自動補正によって、前の月の最終日になる
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }

  //   alert(getLastDayOfMonth(2012, 0)); // 31
  //   alert(getLastDayOfMonth(2012, 1)); // 29
  //   alert(getLastDayOfMonth(2013, 1)); // 28
}

{
  // 何秒経過したか
  function getSecondsToday() {
    let now = new Date();

    // 現在の 日・月・年を使ってオブジェクトを作成
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let diff = now - today;
    return Math.round(diff / 1000);
  }

  //   alert(getSecondsToday());
}

{
  // 相対日付をフォーマット
  function formatDate(date) {
    let diff = new Date() - date;

    if (diff < 1000) {
      return "right now";
    }

    let sec = Math.floor(diff / 1000);

    if (sec < 60) {
      return sec + " sec. age";
    }

    let min = Math.floor((diff / 60) * 1000);

    if (min < 60) {
      return min + " min. age";
    }

    // 日付のフォーマット
    // 1桁の月・日・時間・分の先頭にゼロを追加
    let d = date;
    d = [`0${d.getDate()}`, `0${d.getMonth() + 1}`, `${d.getFullYear()}`, `0${d.getHours()}`, `0${d.getMinutes()}`].map((component) => component.slice(-2));
    return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
  }

  alert(formatDate(new Date(new Date() - 1))); // "right now"
  alert(formatDate(new Date(new Date() - 30 * 1000))); // "30 sec. ago"
  alert(formatDate(new Date(new Date() - 5 * 60 * 1000))); // "5 min. ago"
  // yesterday's date like 31.12.2016, 20:00
  alert(formatDate(new Date(new Date() - 86400 * 1000)));
}
