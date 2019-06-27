// External Modules
import dexie from 'dexie';

let db = new dexie("markopsDB");
db.version(1).stores({
  entries: "id++, batch, [batch+courseCode]"
});

export default db;