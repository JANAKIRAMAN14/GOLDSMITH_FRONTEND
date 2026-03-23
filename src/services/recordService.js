import { STORAGE_KEYS } from '../constants/storageKeys';

function parseRecords(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function getAllRecords() {
  return parseRecords(localStorage.getItem(STORAGE_KEYS.RECORDS));
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
}

export function createRecord(record) {
  const all = getAllRecords();
  const next = [...all, record];
  saveRecords(next);
  return next;
}

export function updateRecord(updatedRecord) {
  const all = getAllRecords();
  const next = all.map((record) => (record.id === updatedRecord.id ? updatedRecord : record));
  saveRecords(next);
  return next;
}

export function deleteRecord(recordId) {
  const all = getAllRecords();
  const next = all.filter((record) => record.id !== recordId);
  saveRecords(next);
  return next;
}
