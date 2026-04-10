import type { ReactNode } from "react";

export type TableColumn = {
  key: string;
  label: string;
  className?: string;
};

type TableProps<T> = {
  columns: readonly TableColumn[];
  rows: readonly T[];
  getRowKey: (row: T) => string;
  renderRow: (row: T) => ReactNode;
  className?: string;
  headClassName?: string;
  rowClassName?: string;
};

const DEFAULT_WRAPPER_CLASSNAME =
  "overflow-hidden rounded-lg border border-white/10 bg-slate-900/55 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm";

const DEFAULT_HEAD_CLASSNAME = "bg-slate-800/70";
const DEFAULT_ROW_CLASSNAME = "border-t border-white/10 hover:bg-slate-800/45";

export function Table<T>({
  columns,
  rows,
  getRowKey,
  renderRow,
  className,
  headClassName = DEFAULT_HEAD_CLASSNAME,
  rowClassName = DEFAULT_ROW_CLASSNAME,
}: TableProps<T>) {
  return (
    <section className={className ?? DEFAULT_WRAPPER_CLASSNAME}>
      <table className="w-full table-fixed border-collapse">
        <thead className={headClassName}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`p-4 text-xs font-semibold uppercase tracking-wide text-white/90 ${column.className ?? ""}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className={rowClassName}>
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
