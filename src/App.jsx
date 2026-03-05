import { useMemo, useState } from "react";

function Section({ title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Counter() {
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
            <span className="text-sm font-semibold text-slate-600">Counter Value:</span>
            <span className="text-2xl font-extrabold text-indigo-600">{count}</span>
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

function SearchFilter() {
  // You can change these records to whatever you want to filter
  const records = useMemo(
    () => [
      "Apple",
      "Apricot",
      "Banana",
      "Blueberry",
      "Cherry",
      "Coconut",
      "Grape",
      "Mango",
      "Orange",
      "Pineapple",
      "Strawberry",
    ],
    [],
  );

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter((r) => r.toLowerCase().includes(q));
  }, [query, records]);

  return (
    <Section title="Task 3: Build Search filter">
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-slate-600">No results</p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((item) => (
                <li key={item} className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const [name, setName] = useState("Mobzii");

  const [children, setChildren] = useState([0]);

  const [a, setA] = useState(10);
  const [b, setB] = useState(20);

  const records = useMemo(
    () => [
      { id: 1, title: "Display simple JSX" },
      { id: 2, title: "Display an array of records on screen" },
      { id: 3, title: "Show/Hide Element on Screen" },
      { id: 4, title: "Enable/Disable a button" },
      { id: 5, title: "2 way data binding using textbox" },
      { id: 6, title: "Dynamically add child components" },
      { id: 7, title: "Do Sum of Two Numbers" },
    ],
    [],
  );

  const sum = Number(a || 0) + Number(b || 0);

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
          <Section
            title="Task 1: Small Programming Learning Tasks"
            subtitle="JSX, lists, conditional rendering, disabled state, controlled inputs, dynamic children and basic calculations."
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-slate-800">
                Simple JSX example:{" "}
                <span className="font-semibold text-indigo-600">
                  Hello {name}!
                </span>
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {records.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="text-xs font-semibold text-slate-500">
                    Task #{r.id}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800">
                    {r.title}
                  </div>
                </div>
              ))}
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
                  <div className="mt-3 text-sm text-slate-500">
                    Element hidden.
                  </div>
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
                  Live preview: <span className="font-semibold text-indigo-600">{name}</span>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">+</div>
                <input
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                />
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                  <span className="font-semibold text-slate-600">Sum:</span>
                  <span className="text-lg font-extrabold text-indigo-600">{sum}</span>
                </div>
              </div>
            </div>
          </Section>

          <Counter />

          {/* ✅ Added Task 3 below without changing Task 1/2 */}
          <SearchFilter />
        </div>
      </div>
    </div>
  );
}
