// External Module
import _ from 'lodash';

// Database Instance
import db from './dexie';

// In the event that the data doesn't exist, post will automatically add it
export const post = async entry => {
  try {
    await db.entries.put(_.cloneDeep(entry));
    return { err: null };
  } catch (err) {
    return { err };
  }
};

export const getAll = async () => {
  try {
    let entries = await db.entries.toArray();
    return { err: null, entries };
  } catch (err) {
    return { err };
  }
};

export const deleteByBatch = async batch => {
  try {
    await db.entries.where('batch').equals(batch);
    return { err: null };
  } catch (err) {
    return { err };
  }
};

export const deleteByEntry = async (batch, courseCode) => {
  try {
    await db.entries
      .where('batch')
      .equals(batch)
      .and('courseCode')
      .equals(courseCode);
    return { err: null };
  } catch (err) {
    return { err };
  }
};
