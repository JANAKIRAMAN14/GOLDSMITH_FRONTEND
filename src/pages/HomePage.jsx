import FloatingAddButton from '../components/common/FloatingAddButton';
import PriceCard from '../components/common/PriceCard';
import { useRates } from '../hooks/useRates';

function HomePage() {
  const { rates, loading, refreshRates } = useRates();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-6 text-white shadow-soft">
        <h2 className="text-2xl font-bold sm:text-3xl">Real-Time Metal Rates Dashboard</h2>
        <p className="mt-2 text-sm text-brand-50 sm:text-base">
          Live updates every 5 minutes using mocked API data.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={refreshRates}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-700"
          >
            Refresh Now
          </button>
          {rates.updatedAt ? (
            <p className="text-sm text-brand-100">Last updated: {new Date(rates.updatedAt).toLocaleString('en-IN')}</p>
          ) : null}
        </div>
      </section>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">Loading live rates...</div>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PriceCard title="24K Gold" value={rates.gold24Rate} unit="Per gram" />
          <PriceCard title="22K Gold (91.6%)" value={rates.gold22Rate} unit="Per gram" />
          <PriceCard title="Silver" value={rates.silverRate} unit="Per gram" tone="silver" />
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h3 className="text-lg font-semibold text-slate-800">Today&apos;s Operations</h3>
        <p className="mt-2 text-sm text-slate-600">
          Use the Add Record button to enter customer job work details, then track progress in the Records section.
        </p>
      </section>

      <FloatingAddButton />
    </div>
  );
}

export default HomePage;
