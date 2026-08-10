const p = new Promise((resolve) => {
    setTimeout(() => {
        resolve(42);
    }, 1000);
});

function getDataPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(41);
        }, 100);
    });
};

function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({id, name: "ihor"});
        }, 300)
    });
};

function getOrders(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["burger", "coffee"]);
            reject(new Error("Заказов нет"))
        }, 300);
    });
};

function getTotal(orders) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(150);
        }, 300);
    });
};

//p.then(value => console.log("получил", value));

//getDataPromise().then(v => console.log("получил", v));

/* getUser(1)
    .then(user => getOrders(user))
    .then(orders => getTotal(orders))
    .then(total => console.log("сумма: ", total))
    .catch(err => console.log("ERROR: ", err)); */

function getWeather() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("солнечная");
        }, 1000);
    });
};

function getNews() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("в праге отменили концерт моргенштерна");
        }, 1000);
    });
};

function getRates() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(42.5);
        }, 1000);
    })
};

console.time("последовательно");
getWeather()
  .then(weather => { console.log(weather); return getNews(); })
  .then(news => { console.log(news); return getRates(); })
  .then(rates => { console.log(rates); console.timeEnd("последовательно"); });

console.time("параллельно");
Promise.all([getWeather(), getNews(), getRates()])
  .then(([w, n, r]) => { console.log(w, n, r); console.timeEnd("параллельно"); });