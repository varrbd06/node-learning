import { Router } from "express";

import { readStats } from "../services/logsService.js";

const router = Router();

router.get("/:username", async (req, res) => {
    const { username } = req.params;
    const stats = await readStats({ username });
    stats.total === 0 
        ? res.status(404).json({ error: "Юзер не найден" }) 
        : res.status(200).json(stats);
});

export default router;