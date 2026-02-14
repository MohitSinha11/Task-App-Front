import { useState } from "react";

export default function CreateTaskListForm({ onCreate, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="panel p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        New Task List
      </h3>
      <input
        placeholder="Task list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="field mb-3"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="field mb-4 min-h-28 resize-none"
      />

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary"
        >
          Create
        </button>
      </div>
    </div>
  );
}
