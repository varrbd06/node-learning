const logs = [
  "2026-08-01;ivan;login;ok",
  "2026-08-01;petr;login;ok",
  "2026-08-01;ivan;upload;ok",
  "2026-08-02;anna;login;fail",
  "2026-08-02;anna;login;ok",
  "2026-08-02;petr;upload;ok",
  "2026-08-02;ivan;delete;ok",
  "2026-08-03;petr;login;ok",
  "2026-08-03;anna;upload;fail",
  "2026-08-03;ivan;login;ok",
  "2026-08-03;petr;delete;fail",
  "2026-08-04;anna;upload;ok",
  "2026-08-04;ivan;login;ok",
  "2026-08-04;petr;login;ok",
];

function parse(lines) {
    return lines.map(l => {
      const [date, user, action, status] = l.split(";");
      return {date, user, action, status};
    });
};

function countBy(records, key) {
  return records.reduce((acc, record) => {
      const groupKey = record[key];
      acc[groupKey] = (acc[groupKey] || 0) + 1;
      return acc;
  }, {});
};

function uniqueBy(records, key) {
  return records.reduce((acc, record) => {
    const value = record[key];
    if (!acc.includes(value)) acc.push(value);
    return acc; 
  }, []);
};

function countByUser(records) {
  return countBy(records, "user");
};

function uniqueDates(records) { 
  return uniqueBy(records, "date");
};

function userLine(records) {
  return uniqueBy(records, "user").join(', ');
};

function topAction(records) {
  const count = countBy(records, "action");

  return Object.keys(count).reduce((best, action) => {
    return count[action] > count[best] ? action : best;
  });
};

function countFailed(records) {
  return records.reduce((acc, record) => {
    return record.status === 'fail' ? acc + 1 : acc;
  }, 0);
  // records.filter(r => r.status === "fail").length
};

function rarestUser(records) { 
  const counts = countBy(records, "user");
  return Object.keys(counts).reduce((worst, user) => {
    return counts[user] < counts[worst] ? user : worst;
  });
};

function findFirst(records, predicate) {
  return records.find(predicate);
}

function hasAny(records, key, value) {
  return records.some(r => r[key] === value);
}

function allSameDate(records) {
  const firstDate = records[0].date;
  return records.every(r => r.date === firstDate);
}

function withId(records) {
  return records.map((r, i) => ({
    ...r,
    id: i
  }));
};

function usersByActivity(records) {
  const counts = countBy(records, "user");
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(u => u[0]);
  //return Object.keys(counts).sort((a,b) => counts[b] - counts[a])
};

const records = parse(logs);

console.log(records);
console.log("----------------------");
console.log(countByUser(records));
console.log("----------------------");
console.log(topAction(records));
console.log("----------------------");
console.log(uniqueDates(records));
console.log("----------------------");
console.log(countFailed(records));
console.log("----------------------");
console.log(userLine(records));
console.log("----------------------");
console.log(rarestUser(records));
console.log("----------------------");
console.log(findFirst(records, r => r.status === "fail"));
console.log("----------------------");
console.log(hasAny(records, "action", "delete"));
console.log("----------------------");
console.log(allSameDate(records));
console.log("----------------------");
console.log(withId(records)[0]);
console.log("----------------------");
console.log(usersByActivity(records))