import { useCallback, useEffect, useState } from "react";
import {
  getTaskLists,
  createTaskList,
  updateTaskList,
  deleteTaskList,
} from "../api/taskListApi";

export default function useTaskLists() {
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTaskLists = useCallback(async () => {
    setLoading(true);
    const data = await getTaskLists();
    setTaskLists(data);
    setLoading(false);
  }, []);

  const addTaskList = async (title, description = "") => {
    await createTaskList({ title, description });
    await loadTaskLists();
  };

  const editTaskList = async (id, newTitle) => {
    const existing = taskLists.find((t) => t.id === id);
    if (!existing) return;

    await updateTaskList({
      ...existing,
      title: newTitle,
    });

    await loadTaskLists();
  };

  const removeTaskList = async (id) => {
    await deleteTaskList(id);
    await loadTaskLists();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadTaskLists();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadTaskLists]);

  return {
    taskLists,
    loading,
    addTaskList,
    editTaskList,
    removeTaskList,
  };
}
