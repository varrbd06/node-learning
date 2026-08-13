import { EventEmitter } from "node:events";

const EVENTS = Object.freeze({
    ENTRY: 'entry',
    ERROR: 'error'
});

class LogWatcher extends EventEmitter {
    add(line) {
        const [date, user, action, status] = line.split(";");
        const record = {date, user, action, status};

        this.emit(EVENTS.ENTRY, record);

        if (record.status === 'fail') {
            this.emit(EVENTS.ERROR, record)
        };
    }
}

const watcher = new LogWatcher();

watcher.on(EVENTS.ENTRY, r => console.log("запись:", r.user, r.action));
watcher.on(EVENTS.ERROR, r => console.log("СБОЙ у", r.user));

watcher.add("2026-08-02;ivan;delete;ok")
watcher.add("2026-08-02;anna;login;fail");