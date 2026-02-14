const API_BASE = "https://task-app-1-lel9.onrender.com";


export const getTasks = async (taskListId) => {
  const res = await fetch(
    `${API_BASE}/task-lists/${taskListId}/tasks`
  );
  return res.json();
};


export const createTask = async (taskListId, task) => {
  const res = await fetch(
    `${API_BASE}/task-lists/${taskListId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );

  return res.json();
};


export const updateTask = async (
  taskListId,
  taskId,
  task
) => {
  const res = await fetch(
    `${API_BASE}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );

  return res.json();
};


export const deleteTask = async (
  taskListId,
  taskId
) => {
  await fetch(
    `${API_BASE}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );
};
