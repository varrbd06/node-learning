import { countBy, uniqueBy } from "./log-utils.js";

export function countByUser(records) {
  return countBy(records, "user");
};

export function uniqueDates(records) { 
  return uniqueBy(records, "date");
};

export function userLine(records) {
  return uniqueBy(records, "user").join(', ');
};

export function topAction(records) {
  const count = countBy(records, "action");

  return Object.keys(count).reduce((best, action) => {
    return count[action] > count[best] ? action : best;
  });
};

export function countFailed(records) {
  return records.reduce((acc, record) => {
    return record.status === 'fail' ? acc + 1 : acc;
  }, 0);
  // records.filter(r => r.status === "fail").length
};

export function rarestUser(records) { 
  const counts = countBy(records, "user");
  return Object.keys(counts).reduce((worst, user) => {
    return counts[user] < counts[worst] ? user : worst;
  });
};

export function findFirst(records, predicate) {
  return records.find(predicate);
}

export function hasAny(records, key, value) {
  return records.some(r => r[key] === value);
}

export function allSameDate(records) {
  const firstDate = records[0].date;
  return records.every(r => r.date === firstDate);
}

export function withId(records) {
  return records.map((r, i) => ({
    ...r,
    id: i
  }));
};

export function usersByActivity(records) {
  const counts = countBy(records, "user");
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(u => u[0]);
  //return Object.keys(counts).sort((a,b) => counts[b] - counts[a])
};