import app from "./src/app.js";
import { loadRecords } from "./src/services/stats.js";

await loadRecords();
app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));