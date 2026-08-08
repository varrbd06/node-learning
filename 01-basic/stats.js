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

function countByUser(records) {
  return records.reduce((acc, record) => {
      const key = record.user;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
  }, {});
};

function topAction(records) {
  const count = records.reduce((acc, record) => {
      const key = record.action;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
  }, {});

  return Object.keys(count).reduce((best, action) => {
    if (count[action] > count[best]);
    return best; 
  });
};

console.log(parse(logs));
console.log("----------------------")
console.log(countByUser(parse(logs)))
console.log("----------------------")
console.log(topAction(parse(logs)))