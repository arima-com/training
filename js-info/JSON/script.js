"use strict";

{
  let room = {
    number: 23,
  };

  let meetup = {
    title: "conference",
    occupiedBy: [{ name: "John" }, { name: "Alice" }],
    place: room,
  };

  // 循環参照
  room.occupiedBy = meetup;
  meetup.self = meetup;

  console.log(
    JSON.stringify(meetup, function replacer(key, value) {
      return key != "" && value == meetup ? undefined : value;
    })
  );
}
