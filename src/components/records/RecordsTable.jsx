import { formatDate } from '../../utils/dateUtils';

function RecordsTable({ records, onEdit, onDelete, onToggleStatus }) {
  if (!records.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No records found for selected filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-3 py-3">Customer</th>
            <th className="px-3 py-3">Item</th>
            <th className="px-3 py-3">Image</th>
            <th className="px-3 py-3">Gold Rate</th>
            <th className="px-3 py-3">Weight</th>
            <th className="px-3 py-3">Total</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Given Date</th>
            <th className="px-3 py-3">Delivery Date</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-t border-slate-100">
              <td className="px-3 py-3 font-medium text-slate-800">{record.customerName}</td>
              <td className="px-3 py-3">{record.itemName}</td>
              <td className="px-3 py-3">
                {record.itemImage ? (
                  <img
                    src={record.itemImage}
                    alt={record.itemName}
                    className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No Image</span>
                )}
              </td>
              <td className="px-3 py-3">Rs {Number(record.goldRate).toLocaleString('en-IN')}</td>
              <td className="px-3 py-3">{record.weight} g</td>
              <td className="px-3 py-3 font-semibold">Rs {Number(record.totalAmount).toLocaleString('en-IN')}</td>
              <td className="px-3 py-3">
                <button
                  type="button"
                  onClick={() => onToggleStatus(record)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    record.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {record.status}
                </button>
              </td>
              <td className="px-3 py-3">{formatDate(record.givenDate)}</td>
              <td className="px-3 py-3">{formatDate(record.deliveryDate)}</td>
              <td className="px-3 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(record)}
                    className="rounded-lg border border-brand-500 px-3 py-1 text-xs font-semibold text-brand-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(record.id)}
                    className="rounded-lg border border-red-300 px-3 py-1 text-xs font-semibold text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordsTable;
