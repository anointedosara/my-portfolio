"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Mail, MailOpen, Trash2, Loader2, Reply } from "lucide-react";
import type { Message } from "@/types";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (m: Message) => {
    await fetch(`/api/messages/${m._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    setMessages((prev) => prev.map((x) => (x._id === m._id ? { ...x, read: !m.read } : x)));
  };

  const remove = async (m: Message) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${m._id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((x) => x._id !== m._id));
    toast.success("Message deleted.");
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Messages</h1>
        <p className="text-sm text-soft">
          {messages.length} total · {unread} unread
        </p>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20 text-soft">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="card text-center text-soft">
          No messages yet. Submissions from your contact form will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`card ${!m.read ? "border-l-4 border-l-brand-400" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{m.name}</span>
                    {!m.read && <span className="chip">New</span>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-sm text-brand-400 hover:underline">
                    {m.email}
                  </a>
                  {m.subject && <p className="mt-1 text-sm font-medium">Re: {m.subject}</p>}
                </div>
                <div className="flex shrink-0 gap-2">
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "Your message")}`}
                    className="grid h-9 w-9 place-items-center rounded-lg surface transition-colors hover:text-brand-400"
                    aria-label="Reply"
                  >
                    <Reply className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => toggleRead(m)}
                    className="grid h-9 w-9 place-items-center rounded-lg surface transition-colors hover:text-brand-400"
                    aria-label="Toggle read"
                  >
                    {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => remove(m)}
                    className="grid h-9 w-9 place-items-center rounded-lg surface transition-colors hover:text-red-500"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-soft">{m.message}</p>
              {m.createdAt && (
                <p className="mt-2 text-xs text-soft">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
