import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import { createReadStream } from "node:fs";

import { countBy } from "../../../01-basic/log-parser/log-utils.js"

let records = [];
let nextId = 1;

const __dirname = dirname(fileURLToPath(import.meta.url))
const logsPath = join(__dirname, "../../../01-basic/log-parser", "logs.txt")

export async function loadRecords() {
    const rl = createInterface({ input: createReadStream(logsPath, "utf-8"), crlfDelay: Infinity})
    for await (const line of rl) {
        if (!line.trim()) continue;
        const [date, user, action, status] = line.split(";");
        records.push({ id: nextId++, date, user, action, status })
    }
}

export function readStats(filters = {}) {
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

export function getById(id) {
  return records.find(r => r.id === id);
}

export function create(data) {
  const record = { id: nextId++, ...data };
  records.push(record);
  return record;
}

export function remove(id) {
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return false;
  records.splice(index, 1);
  return true;
}