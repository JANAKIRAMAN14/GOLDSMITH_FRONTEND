import { useMemo, useState } from 'react';
import RecordForm from '../components/forms/RecordForm';
import RecordsFilters from '../components/records/RecordsFilters';
import RecordsTable from '../components/records/RecordsTable';
import { useRecords } from '../hooks/useRecords';
import { getFilterLabel } from '../utils/dateUtils';
import { downloadRecordsPdf } from '../utils/pdfUtils';

function RecordsPage() {
  const {
    loading,
    filteredRecords,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    editRecord,
    removeRecord,
    toggleStatus
  } = useRecords();

  const [editingRecord, setEditingRecord] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');

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

  const handleStatusToggle = async (record) => {
    try {
      await toggleStatus(record.id);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to toggle status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeRecord(id);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to delete record');
    }
  };

  const handleDownload = () => {
    downloadRecordsPdf({
      records: filteredRecords,
      dateRangeLabel: getFilterLabel(filterType, resolvedFilterValue)
    });
  };

  const handleDownloadRecord = (record) => {
    downloadRecordsPdf({
      records: [record],
      dateRangeLabel: `Single Record - ${record.customerName}`
    });
  };

  const handleOpenPreview = (src, title) => {
    setPreviewImage({ src, title: title || 'Record Image' });
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const handleEditSubmit = async (updatedRecord) => {
    try {
      await editRecord(updatedRecord);
      setEditingRecord(null);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to update record');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Customer Records</h2>

      {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p> : null}

      <RecordsFilters
        filterType={filterType}
        setFilterType={handleFilterTypeChange}
        filterValue={resolvedFilterValue}
        setFilterValue={setFilterValue}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onDownload={handleDownload}
      />

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading records...</div>
      ) : (
        <RecordsTable
          records={filteredRecords}
          onEdit={setEditingRecord}
          onDelete={handleDelete}
          onToggleStatus={handleStatusToggle}
          onDownloadRecord={handleDownloadRecord}
          onPreviewImage={handleOpenPreview}
        />
      )}

      {editingRecord ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-soft">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Edit Record</h3>
            <RecordForm
              initialValues={editingRecord}
              lockGoldRate
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingRecord(null)}
              submitLabel="Update Record"
            />
          </div>
        </div>
      ) : null}

      {previewImage ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 p-4"
          onClick={handleClosePreview}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900">{previewImage.title}</h3>
              <button
                type="button"
                onClick={handleClosePreview}
                className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
            <img
              src={previewImage.src}
              alt={previewImage.title}
              className="max-h-[75vh] w-full rounded-xl border border-slate-200 object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RecordsPage;
