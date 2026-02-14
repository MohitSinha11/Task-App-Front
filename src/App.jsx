import Header from "./components/Header/Header";
import Home from "./pages/Home";
import TaskListPage from "./pages/TaskListPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="mx-auto mt-6 w-full max-w-5xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/task-lists/:taskListId"
            element={<TaskListPage />}
          />
        </Routes>
      </main>
    </div>
  );
}
