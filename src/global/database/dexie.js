// External Modules
import dexie from 'dexie';

let db = dexie("markopsDB");
db.version(1).stores({
  entries: "id++, batch, courseCode"
});

export default db;