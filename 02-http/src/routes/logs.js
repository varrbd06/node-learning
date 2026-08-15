import { Router } from "express";
import { readStats, getById, create, remove } from "../services/stats.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(readStats(req.query));
});

router.get("/:id", (req, res) => {
  const record = getById(Number(req.params.id));
  if (!record) return res.status(404).json({ error: "Запись не найдена" });
  res.json(record);
});

router.post("/", (req, res) => {
  const { date, user, action, status } = req.body;

  if (!date || !user || !action || !status) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }
  if (status !== "ok" && status !== "fail") {
    return res.status(400).json({ error: "status должен быть ok или fail" });
  }

  res.status(201).json(create({ date, user, action, status }));
});

router.delete("/:id", (req, res) => {
  if (!remove(Number(req.params.id))) {
    return res.status(404).json({ error: "Запись не найдена" });
  }
  res.status(204).end();
});

export default router;