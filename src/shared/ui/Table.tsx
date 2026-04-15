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
  caption?: string;
  captionClassName?: string;
  className?: string;
  headClassName?: string;
  rowClassName?: string;
};

const DEFAULT_WRAPPER_CLASSNAME =
  "overflow-hidden rounded-lg border bg-slate-800/10 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]";

const DEFAULT_HEAD_CLASSNAME = "bg-slate-800/80";
const DEFAULT_ROW_CLASSNAME = "border-t border-white/10 hover:bg-slate-800/30";

export function Table<T>({
  columns,
  rows,
  getRowKey,
  renderRow,
  caption,
  captionClassName,
  className,
  headClassName = DEFAULT_HEAD_CLASSNAME,
  rowClassName = DEFAULT_ROW_CLASSNAME,
}: TableProps<T>) {
  return (
    <section className={className ?? DEFAULT_WRAPPER_CLASSNAME}>
      <table className="w-full table-fixed border-collapse">
        {caption ? (
          <caption className={captionClassName ?? "sr-only"}>{caption}</caption>
        ) : null}
        <thead className={headClassName}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
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
