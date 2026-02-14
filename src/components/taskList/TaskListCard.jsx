import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskListCard({ list, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/task-lists/${list.id}`)}
      className="panel cursor-pointer p-4 transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {editing ? (
            <input
              value={title}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
            />
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900">
                {list.title}
              </h3>
              {list.description && (
                <p className="mt-1 text-sm text-slate-600">
                  {list.description}
                </p>
              )}
            </>
          )}
        </div>

        <div
          className="flex gap-2 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {editing ? (
            <button
              onClick={() => {
                onEdit(list.id, title);
                setEditing(false);
              }}
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

          <button
            onClick={() => onDelete(list.id)}
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
