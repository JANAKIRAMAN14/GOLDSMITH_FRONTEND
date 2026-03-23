function PriceCard({ title, value, unit, tone = 'gold' }) {
  const cardTone =
    tone === 'silver'
      ? 'border-silver-500/30 bg-gradient-to-br from-silver-100 to-white'
      : 'border-brand-500/30 bg-gradient-to-br from-brand-100 to-white';

  return (
    <article className={`rounded-2xl border p-5 shadow-soft ${cardTone}`}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Rs {value.toLocaleString('en-IN')}</p>
      <p className="mt-1 text-sm text-slate-600">{unit}</p>
    </article>
  );
}

export default PriceCard;
