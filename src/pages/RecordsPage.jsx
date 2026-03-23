import { useMemo, useState } from 'react';
import RecordForm from '../components/forms/RecordForm';
import RecordsFilters from '../components/records/RecordsFilters';
import RecordsTable from '../components/records/RecordsTable';
import { useRecords } from '../hooks/useRecords';
import { getFilterLabel } from '../utils/dateUtils';
import { downloadRecordsPdf } from '../utils/pdfUtils';

function RecordsPage() {
  const {
    filteredRecords,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    editRecord,
    removeRecord
  } = useRecords();

  const [editingRecord, setEditingRecord] = useState(null);

  const resolvedFilterValue = useMemo(() => {
    if (filterType === 'Yearly' && (!filterValue || filterValue.includes('-'))) {
      return String(new Date().getFullYear());
    }
    if (filterType === 'Monthly' && filterValue.length === 4) {
      return `${filterValue}-01`;
    }
    if (filterType === 'Monthly' && !filterValue) {
      return new Date().toISOString().slice(0, 7);
    }
    if (filterType === 'Daily' && filterValue.length === 7) {
      return `${filterValue}-01`;
    }
    return filterValue;
  }, [filterType, filterValue]);

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    if (type === 'Daily') setFilterValue(new Date().toISOString().slice(0, 10));
    if (type === 'Monthly') setFilterValue(new Date().toISOString().slice(0, 7));
    if (type === 'Yearly') setFilterValue(String(new Date().getFullYear()));
  };

  const handleStatusToggle = (record) => {
    editRecord({
      ...record,
      status: record.status === 'Pending' ? 'Completed' : 'Pending'
    });
  };

  const handleDownload = () => {
    downloadRecordsPdf({
      records: filteredRecords,
      dateRangeLabel: getFilterLabel(filterType, resolvedFilterValue)
    });
  };

  const handleEditSubmit = (updatedRecord) => {
    editRecord(updatedRecord);
    setEditingRecord(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Customer Records</h2>

      <RecordsFilters
        filterType={filterType}
        setFilterType={handleFilterTypeChange}
        filterValue={resolvedFilterValue}
        setFilterValue={setFilterValue}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onDownload={handleDownload}
      />

      <RecordsTable
        records={filteredRecords}
        onEdit={setEditingRecord}
        onDelete={removeRecord}
        onToggleStatus={handleStatusToggle}
      />

      {editingRecord ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-soft">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Edit Record</h3>
            <RecordForm
              initialValues={editingRecord}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingRecord(null)}
              submitLabel="Update Record"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RecordsPage;
