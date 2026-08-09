const LogLevel = Object.freeze({
    ERROR: "ERROR",
    INFO: "INFO",
    WARN: "WARN",
});

function makeMultiplier(n) { 
    return function (value) {
        value = value * n
        return value;
    };
};

function makeCounter(start) {
    return function() {
        start = start + 1;
        return start;
    };
}

function makeLogger(prefix) {
    return function (msg) {
        console.log(`[${prefix}] ${msg}`);
    };
};

function once(fn) {
    let called = false;
    let result;
    return function () {
        if (!called) {
            result = fn();
            called = true;
        }
        return result;
    };
};

const double = makeMultiplier(2);
const counter = makeCounter(10);

const err = makeLogger(LogLevel.ERROR);
err("файл не найден")

const init = once(() => {
  console.log("инициализация");
  return 42;
});

console.log(init());
console.log(init());

console.log(counter());

console.log(double(5))