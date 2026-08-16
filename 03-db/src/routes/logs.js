import { Router } from "express";
import { readStats, getById, create, remove } from "../services/logsService.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await readStats(req.query));
});

router.get("/:id", async (req, res) => {
  const record = await getById(Number(req.params.id));
  if (!record) return res.status(404).json({ error: "Запись не найдена" });
  res.json(record);
});

router.post("/", async (req, res) => {
  const { date, username, action, status } = req.body;

  if (!date || !username || !action || !status) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }
  if (status !== "ok" && status !== "fail") {
    return res.status(400).json({ error: "status должен быть ok или fail" });
  }

  res.status(201).json(await create({ date, username, action, status }));
});

router.delete("/:id", async (req, res) => {
  const deleted = await remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Запись не найдена" });
  res.status(204).end();
});

export default router;