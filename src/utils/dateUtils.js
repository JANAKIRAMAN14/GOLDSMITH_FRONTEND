export function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function matchesFilterByDate(dateString, filterType, filterValue) {
  if (!dateString || !filterValue) return true;

  const date = new Date(dateString);

  if (filterType === 'Daily') {
    return date.toISOString().slice(0, 10) === filterValue;
  }

  if (filterType === 'Monthly') {
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    return month === filterValue;
  }

  if (filterType === 'Yearly') {
    return String(date.getFullYear()) === String(filterValue);
  }

  return true;
}

export function getFilterLabel(filterType, filterValue) {
  if (!filterValue) return 'All Dates';
  if (filterType === 'Daily') return `Date: ${filterValue}`;
  if (filterType === 'Monthly') return `Month: ${filterValue}`;
  return `Year: ${filterValue}`;
}
