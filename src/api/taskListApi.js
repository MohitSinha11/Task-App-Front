const API_BASE = "https://task-app-1-le19.onrender.com";

export const getTaskLists = async () => {
  const res = await fetch(`${API_BASE}/task-lists`);
  return res.json();
};

export const createTaskList = async ({ title, description }) => {
  const res = await fetch(`${API_BASE}/task-lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create task list");
  }

  return res.json();
};


export const updateTaskList = async (taskList) => {
  const res = await fetch(
    `${API_BASE}/task-lists/${taskList.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskList),
    }
  );
  return res.json();
};

export const deleteTaskList = async (id) => {
  await fetch(`${API_BASE}/task-lists/${id}`, {
    method: "DELETE",
  });
};
