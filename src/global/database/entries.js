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
    await db.entries
      .where("batch").equals(batch)
      .delete();
    return { err: null };
  } catch (err) {
    return { err };
  }
};

export const deleteByEntry = async (batch, courseCode) => {
  try {
    await db.entries
      .where("[batch+courseCode]")
      .equals([batch, courseCode])
      .delete();
    return { err: null };
  } catch (err) {
    return { err };
  }
};

export const updateBatch = async (oldBatchName, batch) => {
  try {
    await db.entries
      .where("batch").equals(oldBatchName)
      .modify({ batch });
    return { err: null };
  } catch (err) {
    return { err };
  }
};

export const updateEntry = async (batch, courseCode, entry) => {
  try {
    await db.entries
      .where("[batch+courseCode]")
      .equals([batch, courseCode])
      .modify(_.cloneDeep(entry));
    return { err: null };
  } catch (err) {
    console.log(err);
    return { err };
  }
};
