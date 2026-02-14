import { useState } from "react";
import useTaskLists from "../hooks/useTaskLists";

import EmptyState from "../components/taskList/EmptyState";
import TaskListView from "../components/taskList/TaskListView";
import CreateTaskListForm from "../components/taskList/CreateTaskListForm";

export default function Home() {
  const {
    taskLists,
    loading,
    addTaskList,
    editTaskList,
    removeTaskList,
  } = useTaskLists();

  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (title, description = "") => {
    await addTaskList(title, description);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="panel mx-auto mt-10 max-w-xl p-6 text-center text-slate-600">
        Loading...
      </div>
    );
  }

  const isEmpty = taskLists.length === 0;

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {isEmpty ? (
        <div className="py-8">
          <div className="max-w-3xl mx-auto">
            {showForm ? (
              <div className="max-w-2xl mx-auto">
                <CreateTaskListForm
                  onCreate={handleCreate}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            ) : (
              <EmptyState onCreate={() => setShowForm(true)} />
            )}
          </div>
        </div>
      ) : (
        <TaskListView
          taskLists={taskLists}
          onCreate={handleCreate}
          onEdit={editTaskList}
          onDelete={removeTaskList}
        />
      )}
    </div>
  );
}
