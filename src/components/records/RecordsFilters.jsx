function RecordsFilters({
  filterType,
  setFilterType,
  filterValue,
  setFilterValue,
  searchTerm,
  setSearchTerm,
  onDownload
}) {
  const years = Array.from({ length: 10 }, (_, index) => String(new Date().getFullYear() - index));

  const getInput = () => {
    if (filterType === 'Daily') {
      return (
        <input
          type="date"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 sm:w-auto"
        />
      );
    }

    if (filterType === 'Monthly') {
      return (
        <input
          type="month"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 sm:w-auto"
        />
      );
    }

    return (
      <select
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 sm:w-auto"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <input
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 sm:max-w-xs"
          />

          <select
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 sm:w-auto"
          >
            <option value="Daily">Daily</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          {getInput()}
        </div>

        <button
          type="button"
          onClick={onDownload}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Download PDF
        </button>
      </div>
    </section>
  );
}

export default RecordsFilters;
