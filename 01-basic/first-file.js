const table = ["User1", "User2", "User3", "User4", "User5"];

//console.log(`Длинна таблицы: ${table.length}, Второй элемент: ${table[1]}`);

const line = "2026-08-01;ivan;login;ok";

const parsed_line = line.split(";");

const [date, name, action, status] = parsed_line;

//console.log(date, name, action, status); 

const user = {date: new Date().toISOString() , name: "test", action: "auth", status: "ok"};

//console.log(user.date);

const numbers = [3, 12, 7, 20, 5];
numbers.filter(x => x > 6)
numbers.reduce((acc, curr) => acc + curr, 0)
numbers.map(x => x * x)

//console.log([3, 6, 2, 10, 566].find(n => n < 4));

//console.log([3, 6, 2, 10, 566].findIndex(n => n > 10));

//console.log([3, 5, 10].every(n => n >= 3 ));
//console.log([3, 4, 1].some(n => n > 4));

// const arr1 = [1,2]
// const arr2 = [3,4]
// const comb = [...arr1, ...arr2];

// console.log(comb)

//console.log(numbers.sort((a,b) => b - a))
// const sorted = [...numbers].sort((a,b) => a - b)
// console.log(sorted)

// const test = [[2,3], [1]]

// console.log(test.flat())

