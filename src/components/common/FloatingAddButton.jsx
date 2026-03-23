import { useNavigate } from 'react-router-dom';

function FloatingAddButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/add-record')}
      className="fixed bottom-6 left-4 z-50 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
    >
      Add Record
    </button>
  );
}

export default FloatingAddButton;
