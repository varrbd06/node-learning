import { createReadStream, createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const fileName = "logs.txt";
const __dirname = dirname(fileURLToPath(import.meta.url));

const logsPath = join(__dirname, 'log-parser', fileName);

const stream = createReadStream(logsPath, "utf-8");
const r1 = createInterface({input: createReadStream(logsPath, "utf-8")});

let total = 0;
let failed = 0;
const byUser = {};

for await (const line of r1) {
    const [date, user, action, status] = line.split(";");
    total++;
    if (status === "fail") failed++;
    byUser[user] = (byUser[user] || 0) + 1;
};

console.log(total);
console.log(failed);
console.log(byUser)

stream.on("data", chunk => {
    console.log('кусок', chunk.length, 'символов');
});

stream.on("end", () => {console.log('готово')});
stream.on("error", err => {console.log('ошибка', err.message)});

createReadStream(logsPath).pipe(createWriteStream(join(__dirname, "logs-copy.txt")));