export default function Header() {
  return (
    <header className="sticky top-3 z-50">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            TU
          </div>
          <div>
            <p className="text-base font-semibold tracking-wide text-slate-900">
              TaskUp
            </p>
            <p className="text-xs text-slate-500">
              Plan with clarity
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
