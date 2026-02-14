import { useState } from "react";
import TaskListCard from "./TaskListCard";
import CreateTaskListForm from "../taskList/CreateTaskListForm";

export default function TaskListView({
  taskLists,
  onCreate,
  onEdit,
  onDelete,
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Your Task Lists
          </h2>
          <p className="text-sm text-slate-600">
            Manage lists and open one to work on tasks.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          New List
        </button>
      </div>

      {/* CREATE TASK LIST FORM */}
      {showForm && (
        <div className="mb-4">
          <CreateTaskListForm
            onCreate={(title, description) => {
              onCreate(title, description);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* TASK LISTS */}
      <div className="space-y-3">
        {taskLists.map((list) => (
          <TaskListCard
            key={list.id}
            list={list}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
