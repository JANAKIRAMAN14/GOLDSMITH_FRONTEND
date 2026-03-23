import { useMemo, useState } from 'react';
import { createRecord, deleteRecord, getAllRecords, updateRecord } from '../services/recordService';
import { matchesFilterByDate } from '../utils/dateUtils';

export function useRecords() {
  const [records, setRecords] = useState(() => getAllRecords());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Daily');
  const [filterValue, setFilterValue] = useState(new Date().toISOString().slice(0, 10));

  const addRecord = (record) => {
    setRecords(createRecord(record));
  };

  const editRecord = (record) => {
    setRecords(updateRecord(record));
  };

  const removeRecord = (id) => {
    setRecords(deleteRecord(id));
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
    filteredRecords,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    addRecord,
    editRecord,
    removeRecord
  };
}
