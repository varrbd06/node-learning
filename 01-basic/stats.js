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

function countByUser(records) {
  return countBy(records, "user");
};

function topAction(records) {
  const count = countBy(records, "action");

  return Object.keys(count).reduce((best, action) => {
    return count[action] > count[best] ? action : best;
  });
};

function uniqueDates(records) { 
  return records.reduce((acc, record) => {
    const key = record.date;
    if (!acc.includes(key)) acc.push(key);
    return acc; 
  }, []);
};

function countFailed(records) {
  return records.reduce((acc, record) => {
    return record.status === 'fail' ? acc + 1 : acc;
  }, 0);
  // records.filter(r => r.status === "fail").length
};

function userLine(records) {
  return records.reduce((acc, record) => {
    const key = record.user;
    if (!acc.includes(key)) acc.push(key);
    return acc;
  }, []).join(', ');
};

function rarestUser(records) { 
  const counts = countBy(records, "user");
  return Object.keys(counts).reduce((worst, user) => {
    return counts[user] < counts[worst] ? user : worst;
  });
};

const records = parse(logs);

console.log(records);
console.log("----------------------")
console.log(countByUser(records))
console.log("----------------------")
console.log(topAction(records))
console.log("----------------------")
console.log(uniqueDates(records))
console.log("----------------------")
console.log(countFailed(records))
console.log("----------------------")
console.log(userLine(records))
console.log("----------------------")
console.log(rarestUser(records))