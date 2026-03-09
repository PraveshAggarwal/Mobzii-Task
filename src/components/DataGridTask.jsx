import { useMemo, useState } from "react";
import Section from "./Section";
import customers from "../data/customer.json";

export default function DataGridTask() {
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
