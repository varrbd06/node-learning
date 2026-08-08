const table = ["User1", "User2", "User3", "User4", "User5"];

console.log(`Длинна таблицы: ${table.length}, Второй элемент: ${table[1]}`);

const line = "2026-08-01;ivan;login;ok";

const parsed_line = line.split(";");

const [date, name, action, status] = parsed_line;

console.log(date, name, action, status); 

const user = {date: new Date().toISOString() , name: "test", action: "auth", status: "ok"};

console.log(user.date);

const numbers = [3, 12, 7, 20, 5];
numbers.filter(x => x > 6)
numbers.reduce((acc, curr) => acc + curr, 0)
numbers.map(x => x * x)
