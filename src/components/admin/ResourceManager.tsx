"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Loader2, Save } from "lucide-react";

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "tags" | "select";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  placeholder?: string;
  full?: boolean;
}

interface Props {
  title: string;
  description?: string;
  endpoint: string; // e.g. /api/projects
  fields: FieldDef[];
  primary: string; // field used as the list title
  secondary?: string; // field shown as subtitle
  defaults: Record<string, unknown>;
}

type Row = Record<string, unknown> & { _id?: string };

export function ResourceManager({
  title,
  description,
  endpoint,
  fields,
  primary,
  secondary,
  defaults,
}: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(defaults);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(defaults);
    setOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    const f: Record<string, unknown> = {};
    fields.forEach((field) => {
      f[field.name] = row[field.name] ?? defaults[field.name];
    });
    setForm(f);
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing?._id ? `${endpoint}/${editing._id}` : endpoint;
      const method = editing?._id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success(editing ? "Updated successfully." : "Created successfully.");
      setOpen(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    if (!row._id || !confirm(`Delete "${String(row[primary])}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${endpoint}/${row._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      toast.success("Deleted.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const setField = (name: string, value: unknown) => setForm((f) => ({ ...f, [name]: value }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          {description && <p className="text-sm text-soft">{description}</p>}
        </div>
        <button onClick={openCreate} className="btn-primary px-5 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20 text-soft">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <div className="card text-center text-soft">
          No items yet. Click <strong>Add New</strong> to create one, or seed your data from the
          Dashboard.
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row._id || String(row[primary])}
              className="card flex items-center justify-between gap-4 !py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold">{String(row[primary])}</p>
                {secondary && (
                  <p className="truncate text-sm text-soft">{String(row[secondary] ?? "")}</p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEdit(row)}
                  className="grid h-9 w-9 place-items-center rounded-lg surface transition-colors hover:text-brand-400"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(row)}
                  className="grid h-9 w-9 place-items-center rounded-lg surface transition-colors hover:text-red-500"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">
                {editing ? "Edit" : "Add"} {title.replace(/s$/, "")}
              </h2>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg surface">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={save} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const value = form[field.name];
                const wrapClass = field.full || field.type === "textarea" ? "sm:col-span-2" : "";
                return (
                  <div key={field.name} className={wrapClass}>
                    <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        className="input-field resize-none"
                        placeholder={field.placeholder}
                        value={(value as string) || ""}
                        onChange={(e) => setField(field.name, e.target.value)}
                      />
                    ) : field.type === "checkbox" ? (
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-brand-400"
                          checked={Boolean(value)}
                          onChange={(e) => setField(field.name, e.target.checked)}
                        />
                        <span className="text-sm text-soft">Yes</span>
                      </label>
                    ) : field.type === "select" ? (
                      <select
                        className="input-field"
                        value={(value as string) || ""}
                        onChange={(e) => setField(field.name, e.target.value)}
                      >
                        {field.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "tags" ? (
                      <input
                        className="input-field"
                        placeholder={field.placeholder || "Comma-separated"}
                        value={Array.isArray(value) ? (value as string[]).join(", ") : (value as string) || ""}
                        onChange={(e) =>
                          setField(
                            field.name,
                            e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          )
                        }
                      />
                    ) : field.type === "number" ? (
                      <input
                        type="number"
                        className="input-field"
                        placeholder={field.placeholder}
                        value={(value as number) ?? 0}
                        onChange={(e) => setField(field.name, Number(e.target.value))}
                      />
                    ) : (
                      <input
                        className="input-field"
                        placeholder={field.placeholder}
                        value={(value as string) || ""}
                        onChange={(e) => setField(field.name, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="btn-ghost px-5 py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-70">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
