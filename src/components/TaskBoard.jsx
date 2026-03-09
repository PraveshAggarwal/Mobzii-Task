import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import Section from "./Section";

const COLUMN_IDS = ["today", "tomorrow", "thisWeek", "nextWeek", "unplanned"];

const COLUMN_META = {
  today: { title: "Today" },
  tomorrow: { title: "Tomorrow" },
  thisWeek: { title: "This Week" },
  nextWeek: { title: "Next Week" },
  unplanned: { title: "Unplanned" },
};

function makeInitialTasks() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `task-${i + 1}`,
    title: `Test Task ${i + 1}`,
  }));
}

function TaskCard({ id, title }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm text-slate-900",
        "shadow-[0_1px_0_rgba(15,23,42,0.04)]",
        "cursor-grab active:cursor-grabbing",
        isDragging ? "opacity-70 ring-2 ring-indigo-300" : "",
      ].join(" ")}
      {...attributes}
      {...listeners}
    >
      {title}
    </div>
  );
}

function DroppableColumn({ columnId, title, taskIds, tasksById, minHeight }) {
  const droppableId = `col:${columnId}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  return (
    <div
      ref={setNodeRef}
      className={[
        "rounded-2xl border-2 border-dashed border-blue-200 bg-slate-50 p-4",
        isOver ? "bg-blue-50/70" : "",
      ].join(" ")}
    >
      <div className="text-base font-extrabold text-slate-900">{title}</div>

      <div className="mt-3" style={{ minHeight }}>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {taskIds.length === 0 ? (
            <div className="min-h-35 rounded-xl bg-transparent" />
          ) : (
            <div className="flex flex-col gap-3">
              {taskIds.map((taskId) => (
                <TaskCard
                  key={taskId}
                  id={taskId}
                  title={tasksById[taskId]?.title ?? taskId}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}

function findColumnForTask(columns, taskId) {
  return COLUMN_IDS.find((colId) => columns[colId].includes(taskId)) ?? null;
}

function removeFromArray(arr, item) {
  const idx = arr.indexOf(item);
  if (idx === -1) return arr;
  const next = arr.slice();
  next.splice(idx, 1);
  return next;
}

export default function TaskBoard() {
  const initialTasks = useMemo(() => makeInitialTasks(), []);

  const tasksById = useMemo(() => {
    const map = {};
    for (const t of initialTasks) map[t.id] = t;
    return map;
  }, [initialTasks]);

  // ✅ No localStorage: on refresh it resets automatically
  const [columns, setColumns] = useState(() => ({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    unplanned: initialTasks.map((t) => t.id),
  }));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) return;

    const fromCol = findColumnForTask(columns, activeId);
    if (!fromCol) return;

    let toCol = null;
    let toIndex = 0;

    if (overId.startsWith("col:")) {
      // dropped on a column container (empty area)
      toCol = overId.replace("col:", "");
      toIndex = columns[toCol]?.length ?? 0; // append
    } else {
      // dropped on another task
      toCol = findColumnForTask(columns, overId);
      if (!toCol) return;
      toIndex = columns[toCol].indexOf(overId);
      if (toIndex < 0) toIndex = columns[toCol].length;
    }

    if (!COLUMN_IDS.includes(toCol)) return;

    setColumns((prev) => {
      const next = { ...prev };

      // reorder inside same column when dropped on a task
      if (fromCol === toCol && !overId.startsWith("col:")) {
        const list = next[fromCol];
        const oldIndex = list.indexOf(activeId);
        const newIndex = list.indexOf(overId);
        if (oldIndex === -1 || newIndex === -1) return prev;
        next[fromCol] = arrayMove(list, oldIndex, newIndex);
        return next;
      }

      // move across columns or append within same column
      const fromList = removeFromArray(next[fromCol], activeId);
      const toList = [...next[toCol]];

      next[fromCol] = fromList;
      const insertAt = Math.min(Math.max(toIndex, 0), toList.length);
      toList.splice(insertAt, 0, activeId);
      next[toCol] = toList;

      return next;
    });
  };

  return (
    <Section title="Task 5: Drag & Drop Task List">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DroppableColumn
              columnId="today"
              title={COLUMN_META.today.title}
              taskIds={columns.today}
              tasksById={tasksById}
              minHeight={180}
            />
            <DroppableColumn
              columnId="tomorrow"
              title={COLUMN_META.tomorrow.title}
              taskIds={columns.tomorrow}
              tasksById={tasksById}
              minHeight={180}
            />
            <DroppableColumn
              columnId="thisWeek"
              title={COLUMN_META.thisWeek.title}
              taskIds={columns.thisWeek}
              tasksById={tasksById}
              minHeight={180}
            />
            <DroppableColumn
              columnId="nextWeek"
              title={COLUMN_META.nextWeek.title}
              taskIds={columns.nextWeek}
              tasksById={tasksById}
              minHeight={180}
            />
          </div>

          <div className="mt-4">
            <DroppableColumn
              columnId="unplanned"
              title={COLUMN_META.unplanned.title}
              taskIds={columns.unplanned}
              tasksById={tasksById}
              minHeight={220}
            />
          </div>
        </DndContext>
      </div>
    </Section>
  );
}
