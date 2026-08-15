import express from "express";
import { createReadStream, ReadStream, stat } from "node:fs";
import {dirname, join} from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { countBy } from "../01-basic/log-parser/log-utils.js"
import { error } from "node:console";

const __dirname = dirname(fileURLToPath(import.meta.url))
const logsPath = join(__dirname, "../01-basic/log-parser", "logs.txt")

let records = [];
let nextId = 1;

async function loadRecords() {
    const rl = createInterface({ input: createReadStream(logsPath, "utf-8"), crlfDelay: Infinity})
    for await (const line of rl) {
        if (!line.trim()) continue;
        const [date, user, action, status] = line.split(";");
        records.push({ id: records.length + 1, date, user, action, status })
    }
}

function readStats(filters = {}) {
  const { user: filterUser, status: filterStatus } = filters;

  const filtered = records.filter(r => {
    if (filterUser && r.user !== filterUser) return false;
    if (filterStatus && r.status !== filterStatus) return false;
    return true;
  });

  const total = filtered.length;
  const failed = filtered.filter(r => r.status === "fail").length;
  const byUser = countBy(filtered, "user");

  return {total, failed, byUser};
}
const app = express();

await loadRecords()

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
    res.json({message: "Главная"});
});

app.get("/api/logs", (req, res) => {
  const stats = readStats(req.query);
  res.status(200).json(stats);
});

app.get("/api/users/:user", (req, res) => {
    const { user } = req.params;
    const stats = readStats({ user });
    stats.total === 0 
        ? res.status(404).json({ error: "Юзер не найден" }) 
        : res.status(200).json(stats);
});

app.get("/api/logs/:id", (req, res) => {
    const id = req.params.id;
    const record = records.find(r => r.id === Number(id));
    if (!record) return res.status(404).json({ error: "Запись не найдена" });
    res.status(200).json(record);
});

app.post("/api/logs", (req, res) => {
    const { date, user, action, status } = req.body;

    if (!date || !user || !action || !status) {
    return res.status(400).json({ error: "Все поля обязательны: date, user, action, status" });
    }

    if (status !== "ok" && status !== "fail") {
    return res.status(400).json({ error: "status должен быть ok или fail" });
    }

    const newRecord = { id: nextId++, date, user, action, status };
    records.push(newRecord);
    res.status(201).json(newRecord);
});

app.delete("/api/logs/:id", (req, res) => {
    const { id } = req.params;
    const index = records.findIndex(r => r.id === Number(id));

    if (index === -1) {
        return res.status(404).json({error: "Запись не найдена"});
    }

    records.splice(index, 1);
    res.status(204).end();
});

app.use((req, res) => {
    res.status(404).json({ error: "Страница не найдена" });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({error: "Внутренняя ошибка"})
});

app.listen(3000, () => {console.log("Сервер запущен на http://localhost:3000")})