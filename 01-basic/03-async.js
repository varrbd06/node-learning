function getData(callback) {
  setTimeout(() => {
    callback(42);
  }, 100);
  return callback;
}

console.log("до");
getData(value => console.log("получил", value));
console.log("после");