export default function EmptyState({ onCreate }) {
  return (
    <div className="panel mx-auto mt-10 max-w-2xl p-10 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-700 text-2xl text-white shadow-lg shadow-teal-700/30">
        +
      </div>
      <h2 className="text-3xl font-bold text-slate-900">
        Build your first task list
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-slate-600">
        Capture what matters today and keep execution visible from one clean board.
      </p>
      <button
        onClick={onCreate}
        className="btn-primary mt-8 px-7 py-3"
      >
        Create Task List
      </button>
    </div>
  );
}
