import { useNavigate } from 'react-router-dom';
import RecordForm from '../components/forms/RecordForm';
import { useRates } from '../hooks/useRates';
import { createRecord } from '../services/recordService';

function AddRecordPage() {
  const navigate = useNavigate();
  const { rates } = useRates();

  const handleSubmit = (payload) => {
    createRecord({
      ...payload,
      id: crypto.randomUUID()
    });
    navigate('/records');
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Add Customer Work Record</h2>
      <p className="mt-1 text-sm text-slate-600">Gold rate is auto-filled from live dashboard and remains editable.</p>

      <div className="mt-5">
        <RecordForm defaultGoldRate={rates.gold22Rate || ''} onSubmit={handleSubmit} />
      </div>
    </section>
  );
}

export default AddRecordPage;
