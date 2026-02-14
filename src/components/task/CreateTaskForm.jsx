import { useState } from "react";

const toBackendDueDate = (value) => {
  if (!value) return null;
  return `${value}T00:00:00`;
};

export default function CreateTaskForm({
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [status, setStatus] = useState("OPEN");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      id: null,
      title,
      description,
      dueDate: toBackendDueDate(dueDate),
      priority,
      status,
    });


    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("LOW");
    setStatus("OPEN");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="panel mb-6 space-y-4 p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900">
        Create New Task
      </h3>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="field"
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="field min-h-24 resize-none"
      />

      {/* DUE DATE */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="field"
      />

      {/* PRIORITY + STATUS */}
      <div className="flex gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="field"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="field"
        >
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn-primary"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
