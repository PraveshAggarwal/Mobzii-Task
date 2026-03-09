import Task1 from "./components/Task1";
import Counter from "./components/Counter";
import SearchFilter from "./components/SearchFilter";
import DataGridTask from "./components/DataGridTask";
import TaskBoard from "./components/TaskBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white">
            Mobzii Task
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Small React Learning Tasks
          </h1>
        </header>

        <div className="space-y-6">
          <Task1 />
          <Counter />
          <SearchFilter />
          <DataGridTask />
          <TaskBoard />
        </div>
      </div>
    </div>
  );
}
