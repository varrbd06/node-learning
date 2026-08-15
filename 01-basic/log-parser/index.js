import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { createReadStream  } from "node:fs";

import { parse } from "./log-utils.js";
import { countByUser, countFailed, topAction, uniqueDates } from "./stats.js";

const args = process.argv.slice(2);

const flags = args.filter(a => a.startsWith("--"));
const positional = args.filter(a => !a.startsWith("--"));

const fileName = positional[0] || "logs.txt";
const userFilter = positional[1];
const save = flags.includes("--save");

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsPath = join(__dirname, fileName);

const stream = createReadStream(logsPath, "utf-8")

stream.on("data", chunk => {
    console.log('кусок', chunk.length, 'символов');
});

stream.on("end", () => {console.log('готово')});
stream.on("error", err => {console.log('сбой', err.message)});

/* function printReport(records) {
    console.log("Статистика:", {
        Records: records.length,
        Dates: uniqueDates(records),
        Activity: countByUser(records),
        TopAction: topAction(records),
        Failed: countFailed(records)
    });
}; */

function buildReport(records) {
  return `
    Всего записей: ${records.length}
    Уникальных дат: ${uniqueDates(records).length}
    Частое действие: ${topAction(records)}
  `;
};

let text;
try {
    text = await readFile(logsPath, "utf-8")
} catch (err) {
    console.error(`Ошибка: не удалось прочитать файл - ${fileName}`)
    process.exit(1)
};

const logs = text
    .split(/\r?\n/)
    .filter(l => l.trim() !== '');

const records = parse(logs);

const filtered = userFilter
    ? records.filter(r => r.user.toLowerCase().includes(userFilter.toLowerCase()))
    : records;

if (filtered.length === 0) {
  console.log(`Записей по запросу "${userFilter}" не найдено`);
  process.exit(0);
}

if (userFilter) {
    console.log(`=== Статистика по запросу: "${userFilter}" ===`);
} else {
    console.log("=== Общая статистика ===");
};

const report = buildReport(filtered);

console.log(report);

if (save) {
  await writeFile(join(__dirname, "report.txt"), report, "utf-8");
  console.log("Отчёт сохранён в report.txt");
}