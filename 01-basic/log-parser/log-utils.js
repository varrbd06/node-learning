export function parse(lines) {
    return lines.map(l => {
      const [date, user, action, status] = l.split(";");
      return {date, user, action, status};
    });
};

export function countBy(records, key) {
  return records.reduce((acc, record) => {
      const groupKey = record[key];
      acc[groupKey] = (acc[groupKey] || 0) + 1;
      return acc;
  }, {});
};

export function uniqueBy(records, key) {
  return records.reduce((acc, record) => {
    const value = record[key];
    if (!acc.includes(value)) acc.push(value);
    return acc; 
  }, []);
};