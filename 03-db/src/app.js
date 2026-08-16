import express from "express";

import logsRouter from "./routes/logs.js";
import usersRouter from "./routes/users.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { logger } from "./middleware/logger.js";

const app = express();

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.json({message: "Главная"});
});

app.use("/api/logs", logsRouter);
app.use("/api/users", usersRouter);

app.use(notFound);

app.use(errorHandler);

export default app;