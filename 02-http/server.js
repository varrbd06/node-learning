import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createInterface } from "node:readline"; 

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsPath = join(__dirname, "../01-basic/log-parser/", "logs.txt");

async function readStats() {
  const rl = createInterface({ input: createReadStream(logsPath, "utf-8"), crlfDelay: Infinity });
  let total = 0, failed = 0;
  const byUser = {};
  for await (const line of rl) {
        if (!line.trim()) continue;
        const [date, user, action, status] = line.split(";");
        total++;
        if (status === "fail") failed++;
        byUser[user] = (byUser[user] || 0) + 1;
    }
  return { total, failed, byUser };
}

const server = createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    switch(req.url) {
        case "/":
            res.statusCode = 200
            res.end(JSON.stringify({message: "Главная"}));
            break;
        case "/api/logs":
            try {
                const stats = await readStats();
                res.statusCode = 200
                const jsonResponse = JSON.stringify(stats);
                res.end(jsonResponse);
            } catch (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: "Ошибка чтения логов" }));
                console.error("Ошибка JSON:", err); 
            }
            break;
        default:
            res.statusCode = 404
            res.end(JSON.stringify({error: "Страница не найдена"}));
    };
    
});

server.listen(3000, () => {
    console.log("Сервер запущен http://localhost:3000")
});