import { useMemo, useState } from "react";
import customers from "./data/customer.json";

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

function SearchFilter() {
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
                <li
                  key={item}
                  className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700"
                >
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

function DataGridTask() {
  const rows = useMemo(() => customers, []);

  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("All");
  const [newsOnly, setNewsOnly] = useState(false);

  const [sortBy, setSortBy] = useState({ key: "customer", dir: "asc" });

  const segments = useMemo(() => {
    const s = new Set(rows.map((r) => r.segments).filter(Boolean));
    return ["All", ...Array.from(s)];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((r) => {
      const matchesSearch =
        !q ||
        String(r.customer ?? "")
          .toLowerCase()
          .includes(q) ||
        String(r.last_seen ?? "")
          .toLowerCase()
          .includes(q) ||
        String(r.orders ?? "")
          .toLowerCase()
          .includes(q) ||
        String(r.total_spent ?? "")
          .toLowerCase()
          .includes(q) ||
        String(r.latest_purchase ?? "")
          .toLowerCase()
          .includes(q) ||
        String(r.segments ?? "")
          .toLowerCase()
          .includes(q);

      const matchesSegment = segment === "All" || r.segments === segment;
      const matchesNews = !newsOnly || r.news === true;

      return matchesSearch && matchesSegment && matchesNews;
    });
  }, [rows, search, segment, newsOnly]);

  const sortedRows = useMemo(() => {
    const { key, dir } = sortBy;
    const factor = dir === "asc" ? 1 : -1;

    const toComparable = (val) => {
      if (val === null || val === undefined) return "";
      return val;
    };

    return [...filteredRows].sort((a, b) => {
      const av = toComparable(a[key]);
      const bv = toComparable(b[key]);

      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * factor;
      }
      return String(av).localeCompare(String(bv)) * factor;
    });
  }, [filteredRows, sortBy]);

  const toggleSort = (key) => {
    setSortBy((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  const SortIcon = ({ colKey }) => {
    if (sortBy.key !== colKey) return <span className="text-slate-400">↕</span>;
    return sortBy.dir === "asc" ? (
      <span className="text-slate-700">↑</span>
    ) : (
      <span className="text-slate-700">↓</span>
    );
  };

  const fmtMoney = (n) =>
    typeof n === "number"
      ? n.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        })
      : "";

  return (
    <Section
      title="Task 4: Create a Datagrid"
      subtitle="Static JSON (file) + datagrid/tabular view + sort/filter/search."
    >
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-600">
                Search
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Search customer, date, segment, etc..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="sm:w-52">
              <label className="text-xs font-semibold text-slate-600">
                Segment
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
              >
                {segments.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 pt-5 text-sm text-slate-700 sm:pt-0">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-200"
                checked={newsOnly}
                onChange={(e) => setNewsOnly(e.target.checked)}
              />
              News only
            </label>
          </div>

          <div className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {sortedRows.length}
            </span>{" "}
            / {rows.length}
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-auto rounded-xl border border-slate-200">
          <table className="min-w-full border-separate border-spacing-0">
            <thead className="sticky top-0 bg-slate-50">
              <tr className="text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                <th className="px-4 py-3">#</th>

                <th
                  className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                  onClick={() => toggleSort("customer")}
                >
                  <div className="flex items-center gap-2">
                    Customer <SortIcon colKey="customer" />
                  </div>
                </th>

                <th
                  className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                  onClick={() => toggleSort("last_seen")}
                >
                  <div className="flex items-center gap-2">
                    Last seen <SortIcon colKey="last_seen" />
                  </div>
                </th>

                <th
                  className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                  onClick={() => toggleSort("orders")}
                >
                  <div className="flex items-center gap-2">
                    Orders <SortIcon colKey="orders" />
                  </div>
                </th>

                <th
                  className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                  onClick={() => toggleSort("total_spent")}
                >
                  <div className="flex items-center gap-2">
                    Total spent <SortIcon colKey="total_spent" />
                  </div>
                </th>

                <th
                  className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                  onClick={() => toggleSort("latest_purchase")}
                >
                  <div className="flex items-center gap-2">
                    Latest purchase <SortIcon colKey="latest_purchase" />
                  </div>
                </th>

                <th
                  className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                  onClick={() => toggleSort("news")}
                >
                  <div className="flex items-center gap-2">
                    News <SortIcon colKey="news" />
                  </div>
                </th>

                <th
                  className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                  onClick={() => toggleSort("segments")}
                >
                  <div className="flex items-center gap-2">
                    Segments <SortIcon colKey="segments" />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {sortedRows.map((r, idx) => (
                <tr
                  key={r.id}
                  className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-indigo-700">
                    {r.customer}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {r.last_seen}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {r.orders}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                    {fmtMoney(r.total_spent)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {r.latest_purchase || (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {r.news ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
                        ✕
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {r.segments}
                    </span>
                  </td>
                </tr>
              ))}

              {sortedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    No results found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
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

  // ✅ Array of records like your screenshot
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

            {/* ✅ Display an array of records (like screenshot) */}
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

          <Counter />
          <SearchFilter />

          {/* ✅ Task 4 added without removing Task 1–3 */}
          <DataGridTask />
        </div>
      </div>
    </div>
  );
}
