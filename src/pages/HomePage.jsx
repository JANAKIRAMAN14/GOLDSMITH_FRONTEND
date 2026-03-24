import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceCard from '../components/common/PriceCard';
import { getTodayGoldPrice, setTodayGoldPrice } from '../services/goldPriceService';

function HomePage() {
  const navigate = useNavigate();

  const [todayGoldPrice, setTodayGoldPriceState] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const price = await getTodayGoldPrice();
        setTodayGoldPriceState(price);
      } catch (err) {
        setError(err.message || 'Failed to load gold price');
      }
    };

    load();
  }, []);

  const openModal = () => {
    setError('');
    setPriceInput(todayGoldPrice > 0 ? String(todayGoldPrice) : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSavePrice = async (event) => {
    event.preventDefault();

    const parsed = Number(priceInput);
    if (!parsed || parsed <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    try {
      const updatedPrice = await setTodayGoldPrice(parsed);
      setTodayGoldPriceState(updatedPrice);
      closeModal();
    } catch (err) {
      setError(err.message || 'Unable to set price');
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Today&apos;s 24K Gold Rate</h2>
            <p className="mt-1 text-sm text-slate-600">Set once with popup and use directly in all records.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openModal}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Set Gold Price
            </button>
            <button
              type="button"
              onClick={() => navigate('/add-record')}
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Add Record
            </button>
          </div>
        </div>

        <div className="max-w-md">
          <PriceCard title="24K Gold" value={todayGoldPrice} unit="Per gram" />
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="w-full max-w-md rounded-2xl border border-brand-100 bg-white p-5 shadow-soft sm:p-6">
            <h3 className="text-lg font-bold text-slate-900">Set Today&apos;s Gold Price</h3>
            <p className="mt-1 text-sm text-slate-600">Enter 24K gold price per gram.</p>

            <form onSubmit={handleSavePrice} className="mt-4 space-y-3">
              <input
                type="number"
                value={priceInput}
                onChange={(event) => setPriceInput(event.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500"
              />

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="submit"
                  className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;
