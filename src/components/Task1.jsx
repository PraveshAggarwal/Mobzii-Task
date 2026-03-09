import { useMemo, useState } from "react";
import Section from "./Section";

export default function Task1() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("Mobzii");
  const [children, setChildren] = useState([0]);
  const [a, setA] = useState(10);
  const [b, setB] = useState(20);

  const peopleRecords = useMemo(
    () => [
      { id: 1, name: "Aarav", tech: "React" },
      { id: 2, name: "Diya", tech: "JavaScript" },
      { id: 3, name: "Neel", tech: "CSS" },
      { id: 4, name: "Tara", tech: "HTML" },
    ],
    [],
  );

  const sum = Number(a || 0) + Number(b || 0);

  return (
    <Section
      title="Task 1: Small Programming Learning Tasks"
      subtitle="JSX, lists, conditional rendering, disabled state, controlled inputs, dynamic children and basic calculations."
    >
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-slate-800">
          Simple JSX example:{" "}
          <span className="font-semibold text-indigo-600">Hello {name}!</span>
        </p>
      </div>

      {/* ✅ Display an array of records */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-lg font-bold text-slate-900">
          Display an array of records
        </h3>

        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-800">
          {peopleRecords.map((item) => (
            <li key={item.id}>
              {item.name} - {item.tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-800">
              Show / Hide element
            </div>
            <button
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-700"
              type="button"
              onClick={() => setIsVisible((v) => !v)}
            >
              {isVisible ? "Hide" : "Show"}
            </button>
          </div>

          {isVisible ? (
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              I am visible now.
            </div>
          ) : (
            <div className="mt-3 text-sm text-slate-500">Element hidden.</div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-800">
              Enable / Disable button
            </div>
            <button
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-700"
              type="button"
              onClick={() => setIsDisabled((d) => !d)}
            >
              {isDisabled ? "Enable" : "Disable"}
            </button>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={isDisabled}
              onClick={() => alert("Button clicked!")}
            >
              Click Me
            </button>
            <span className="text-sm text-slate-600">
              Status:{" "}
              <span className="font-semibold">
                {isDisabled ? "Disabled" : "Enabled"}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-sm font-semibold text-slate-800">
            2-way data binding
          </div>

          <div className="mt-2 flex items-center gap-3">
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name..."
            />
          </div>

          <p className="mt-2 text-sm text-slate-600">
            Live preview:{" "}
            <span className="font-semibold text-indigo-600">{name}</span>
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-800">
              Dynamically add child components
            </div>
            <button
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
              type="button"
              onClick={() => setChildren((arr) => [...arr, arr.length])}
            >
              Add Child
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {children.map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="text-sm font-semibold text-slate-800">
                  Child Component #{idx + 1}
                </div>
                <button
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-700"
                  type="button"
                  onClick={() =>
                    setChildren((arr) => arr.filter((__, i) => i !== idx))
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-semibold text-slate-800">
          Sum of two numbers
        </div>

        <div className="mt-3 flex items-center gap-3">
          <input
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            +
          </div>
          <input
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
            <span className="font-semibold text-slate-600">Sum:</span>
            <span className="text-lg font-extrabold text-indigo-600">
              {sum}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
