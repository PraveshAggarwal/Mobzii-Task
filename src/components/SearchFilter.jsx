import { useMemo, useState } from "react";
import Section from "./Section";

export default function SearchFilter() {
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
