export default function LoadingSpinner({ fullPage = false }) {
  const inner = (
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-700 rounded-full animate-spin" />
      <span className="text-sm text-slate-500 font-medium">Loading…</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {inner}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-16">
      {inner}
    </div>
  );
}
