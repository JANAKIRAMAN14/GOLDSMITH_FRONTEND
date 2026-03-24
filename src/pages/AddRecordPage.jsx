import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecordForm from '../components/forms/RecordForm';
import { getTodayGoldPrice } from '../services/goldPriceService';
import { createRecord } from '../services/recordService';

function AddRecordPage() {
  const navigate = useNavigate();
  const [todayGoldPrice, setTodayGoldPrice] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const price = await getTodayGoldPrice();
        setTodayGoldPrice(price);
      } catch (err) {
        setError(err.message || 'Failed to load today gold price');
      }
    };

    load();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      await createRecord(payload);
      navigate('/records');
    } catch (err) {
      setError(err.message || 'Failed to create record');
    }
  };

  if (!todayGoldPrice || todayGoldPrice <= 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Add Customer Work Record</h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-600">
          Please set today&apos;s gold price first from Home page. Daily gold price starts at 0.
        </p>
        {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
        <Link
          to="/"
          className="mt-4 inline-flex rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Go To Home
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Add Customer Work Record</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back
        </button>
      </div>

      {/* <p className="mt-1 text-sm text-slate-600">
        Gold rate is auto applied from your today&apos;s 24K price and cannot be changed.
      </p> */}

      {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}

      <div className="mt-5">
        <RecordForm defaultGoldRate={todayGoldPrice} lockGoldRate onSubmit={handleSubmit} />
      </div>
    </section>
  );
}

export default AddRecordPage;
