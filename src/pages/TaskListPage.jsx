import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getTaskLists } from "../api/taskListApi";
import { createTask, updateTask, deleteTask } from "../api/taskApi";

import TaskView from "../components/task/TaskView";
import CreateTaskForm from "../components/task/CreateTaskForm";

export default function TaskListPage() {
  const { taskListId } = useParams();

  const [taskList, setTaskList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  /* =========================
     LOAD TASK LIST
  ========================= */
  const loadTaskList = useCallback(async () => {
    setLoading(true);
    const lists = await getTaskLists();
    const current = lists.find((l) => l.id === taskListId);
    setTaskList(current);
    setLoading(false);
  }, [taskListId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadTaskList();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadTaskList]);

  /* =========================
     CREATE TASK
  ========================= */
  const handleCreateTask = async (task) => {
    await createTask(taskListId, task);
    setShowForm(false);
    await loadTaskList();
  };

  /* =========================
     UPDATE TASK
  ========================= */
  const handleUpdateTask = async (taskId, updatedTask) => {
    await updateTask(taskListId, taskId, updatedTask);
    await loadTaskList();
  };

  /* =========================
     DELETE TASK
  ========================= */

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskListId, taskId);
    await loadTaskList();
  };

  if (loading) {
    return (
      <div className="panel mx-auto mt-10 max-w-xl p-6 text-center text-slate-600">
        Loading task list...
      </div>
    );
  }

  if (!taskList)
    return (
      <div className="panel mx-auto mt-10 max-w-xl p-6 text-center text-slate-600">
        Task list not found
      </div>
    );

  /* ✅ FIX NaN progress safely */
  const rawProgress = Number(taskList.progress);

  const progress = Number.isFinite(rawProgress)
    ? Math.round(rawProgress * 100)
    : 0;

  return (
    <div className="mx-auto mt-8 max-w-3xl text-black">
      {/* HEADER */}
      <div className="panel mb-5 p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {taskList.title}
            </h1>
            {taskList.description && (
              <p className="mt-1 text-sm text-slate-600">
                {taskList.description}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Add Task
          </button>
        </div>

        {/* PROGRESS */}
        <div>
          <div className="mb-1.5 flex justify-between text-sm text-slate-700">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-2.5 rounded-full bg-teal-700 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* CREATE TASK FORM */}
      {showForm && (
        <CreateTaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* TASKS */}
      <TaskView
        tasks={taskList.tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
