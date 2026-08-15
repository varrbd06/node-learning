import express from "express";
import { createReadStream } from "node:fs";
import {dirname, join} from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url))
const logsPath = join(__dirname, "../01-basic/log-parser", "logs.txt")

async function readStats() {
    const rl = createInterface({input: createReadStream(logsPath, "utf-8"), crlfDelay: Infinity})
    let total = 0, failed = 0;
    const byUser = {};
    for await (const line of rl) {
        if (!line.trim()) continue;
        const [date, user, action, status] = line.split(";");
        total++;
        if (status === "fail") failed++;
        byUser[user] = (byUser[user] || 0) + 1;
    }
    return { total, failed, byUser }
}

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
    res.json({message: "Главная"});
});

app.get("/api/logs", async (req, res) => {
    const stats = await readStats();
    res.status(200).json(stats);
});

app.use((req, res) => {
    res.status(404).json({ error: "Страница не найдена" });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({error: "Внутренняя ошибка"})
});

app.listen(3000, () => {console.log("Сервер запущен на http://localhost:3000")})