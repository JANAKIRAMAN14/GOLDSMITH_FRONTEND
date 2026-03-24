function AuthLayoutCard({ title, subtitle, children }) {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center py-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft">
        <div className="bg-gradient-to-r from-brand-700 to-brand-500 p-6 text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-brand-50 sm:text-base">{subtitle}</p>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayoutCard;
