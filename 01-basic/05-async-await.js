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
            //reject(new Error("заказов нет"))
        }, 300);
    });
};

function getTotal(orders) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(150);
        }, 300);
    });
};

async function load() {
    try {
        const user = await getUser(1);
        const orders = await getOrders(user);
        const total = await getTotal(orders);
        console.log("сумма: ", total);
    } catch (err) {
        console.log("упало: ", err.message);
    };
}

//load()

function getWeather() {
  return new Promise(resolve => setTimeout(() => resolve("солнечно"), 1000));
};

function getNews() {
  return new Promise(resolve => setTimeout(() => resolve("там куда-то, где-то, что-то"), 1000));
};

async function compare() {
    console.time("подряд");
    const weather = await getWeather();
    const news = await getNews();
    console.log(`Погода: ${weather}, Новости: ${news}`)
    console.timeEnd("подряд");

    console.time("параллельно");
    await Promise.all([getWeather(), getNews()]);
    console.timeEnd("параллельно");
};

compare();