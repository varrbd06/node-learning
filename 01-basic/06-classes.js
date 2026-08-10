class LogEntry {
    constructor (date, user, action, status) {
        this.date = date;
        this.user = user;
        this.action = action;
        this.status = status;
    }

    isFailed() {
        return this.status === 'fail';
    }

    toString() {
        return [this.date, this.user, this.action, this.status].join(";");
    }
    
    static fromLine(line) {
      const [date, user, action, status] = line.split(";");
      return new LogEntry(date, user, action, status);
    }
}

class LogCollection {
  constructor (lines) {
    this.entries = lines.map(line => LogEntry.fromLine(line));
  }

  count() {
    return this.entries.length;
  }

  failed() {
    return this.entries.filter(e => e.isFailed())
  }

  byUser(name) {
    return this.entries.filter(e => e.user === name)
  }
}

const e = LogEntry.fromLine("2026-08-10;ihor;login;ok");
console.log(e.toString());
console.log(e.isFailed());

const logs = new LogCollection([
  "2026-08-01;ivan;login;ok",
  "2026-08-02;anna;login;fail",
  "2026-08-02;ivan;delete;ok",
]);

console.log(logs.count());
console.log(logs.failed());
console.log(logs.byUser("ivan"));
