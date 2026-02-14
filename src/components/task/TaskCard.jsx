import { useState } from "react";

const PRIORITIES = ["HIGH", "MEDIUM", "LOW"];
const STATUSES = ["OPEN", "CLOSED"];
const toBackendDueDate = (value) => {
  if (!value) return null;
  return `${value}T00:00:00`;
};
const toDateInputValue = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const formatDueDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(
    toDateInputValue(task.dueDate)
  );
  const [priority, setPriority] = useState(task.priority || "LOW");
  const [status, setStatus] = useState(task.status || "OPEN");

  const isClosed = task.status === "CLOSED";

  const handleSave = () => {
    onUpdate(task.id, {
    id: task.id,
    title,
    description,
    dueDate: toBackendDueDate(dueDate),
    priority,
    status,
    });
    setEditing(false);
  };

  return (
    <div className="panel p-4">
      {/* HEADER */}
      <div className="mb-2 flex items-center justify-between gap-3">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="field"
          />
        ) : (
          <h3
            className={`font-medium ${
              isClosed ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </h3>
        )}

        {!editing && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {priority}
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      {editing ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 rounded mb-2 text-sm"
        />
      ) : (
        task.description && (
          <p className="text-sm text-gray-600 mb-2">
            {task.description}
          </p>
        )
      )}

      {/* DUE DATE */}
      {editing ? (
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="field mb-2"
        />
      ) : (
        formatDueDate(task.dueDate) && (
          <p className="mb-2 text-xs font-medium text-teal-700">
            Due: {formatDueDate(task.dueDate)}
          </p>
        )
      )}

      {/* EDIT CONTROLS */}
      {editing && (
        <div className="flex gap-3 mb-3">
          {/* PRIORITY */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="field"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="field"
          >
            {STATUSES.map((currentStatus) => (
              <option key={currentStatus} value={currentStatus}>
                {currentStatus}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex gap-2 text-sm">
        {editing ? (
          <button
            onClick={handleSave}
            className="btn-primary px-3 py-1.5 text-xs"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="btn-secondary px-3 py-1.5 text-xs"
          >
            Edit
          </button>
        )}

        {!editing && !isClosed && (
          <button
            onClick={() =>
              onUpdate(task.id, {
                id: task.id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                status: "CLOSED",
              })
            }
            className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 transition hover:bg-teal-100"
          >
            Mark Done
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
