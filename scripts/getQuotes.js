const URL =
  "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru";
const IMG_URL = "https://unsplash.it/300/200/?random";

const fs = require("fs");
const async = require("async");
const fetch = require("node-fetch");
let quotes = [];

let intervalId = setInterval(() => {
  fetch(
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru"
  )
    .then(res => res.json())
    .then(res => {
      quotes.push({
        text: res.quoteText,
        author: res.quoteAuthor
      });
      if (quotes.length > 9) {
        clearInterval(intervalId);
        fs.writeFile(
          "data/quotes.json",
          JSON.stringify(quotes, null, 2),
          "utf8",
          err => {
            if (err) {
              console.log(err);
            }
            console.log("done");
          }
        );
      }
    });
}, 3000);

// async.times(
//   10,
//   (n, cb) => {
//     setTimeout(() => {
//       fetch(
//         "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru"
//       )
//         .then(res => res.json())
//         .then(res => {
//           quotes.push({
//             text: res.quoteText,
//             author: res.quoteAuthor
//           });
//           cb();
//         });
//     }, 1000);
//   },
//   () => {
//     fs.writeFile(
//       "data/quotes.json",
//       JSON.stringify(quotes, null, 2),
//       "utf8",
//       err => {
//         if (err) {
//           console.log(err);
//         }
//         console.log("done");
//       }
//     );
//   }
// );
