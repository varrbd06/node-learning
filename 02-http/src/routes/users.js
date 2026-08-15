import { Router } from "express";

import { readStats } from "../services/stats.js";

const router = Router();

router.get("/:user", (req, res) => {
    const { user } = req.params;
    const stats = readStats({ user });
    stats.total === 0 
        ? res.status(404).json({ error: "Юзер не найден" }) 
        : res.status(200).json(stats);
});

export default router;