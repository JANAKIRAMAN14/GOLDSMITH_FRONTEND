import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  toggleRecordStatus,
  updateRecord
} from '../services/recordService';
import { matchesFilterByDate } from '../utils/dateUtils';

export function useRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Daily');
  const [filterValue, setFilterValue] = useState(new Date().toISOString().slice(0, 10));

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getAllRecords();
      setRecords(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const addRecord = async (record) => {
    const created = await createRecord(record);
    setRecords((prev) => [created, ...prev]);
    return created;
  };

  const editRecord = async (record) => {
    const updated = await updateRecord(record);
    setRecords((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    return updated;
  };

  const removeRecord = async (id) => {
    await deleteRecord(id);
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const toggleStatus = async (id) => {
    const updated = await toggleRecordStatus(id);
    setRecords((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const filteredRecords = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return records.filter((record) => {
      const matchesSearch = record.customerName.toLowerCase().includes(query);
      const matchesDate = matchesFilterByDate(record.givenDate, filterType, filterValue);
      return matchesSearch && matchesDate;
    });
  }, [records, searchTerm, filterType, filterValue]);

  return {
    records,
    loading,
    filteredRecords,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    addRecord,
    editRecord,
    removeRecord,
    toggleStatus,
    reload: loadRecords
  };
}
