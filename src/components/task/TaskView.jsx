import TaskCard from "./TaskCard";

export default function TaskView({
  tasks,
  onUpdateTask,
  onDeleteTask,
}) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="panel mt-6 p-8 text-center">
        <p className="text-slate-600">
          No tasks yet. Add your first task to start tracking progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-6">
      {tasks.map((task) => (
        <TaskCard
          key={`${task.id}-${task.status}-${task.priority}-${task.dueDate ?? ""}`}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
