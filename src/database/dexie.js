import dexie from 'dexie';

let db = new dexie("local");
db.version(1).stores({states: "&_id"});

export default db;