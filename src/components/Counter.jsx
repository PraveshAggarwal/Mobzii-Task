import { useState } from "react";
import Section from "./Section";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Section title="Task 2: Create a counter">
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            onClick={() => setCount((c) => c - 1)}
            type="button"
          >
            Decrease
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3">
            <span className="text-sm font-semibold text-slate-600">
              Counter Value:
            </span>
            <span className="text-2xl font-extrabold text-indigo-600">
              {count}
            </span>
          </div>

          <button
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            onClick={() => setCount((c) => c + 1)}
            type="button"
          >
            Increase
          </button>
        </div>
      </div>
    </Section>
  );
}
