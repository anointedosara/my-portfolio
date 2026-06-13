"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      toast.success("Message sent! I'll get back to you soon. 🎉");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name</label>
          <input
            className="input-field"
            placeholder="Your name"
            {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input
            className="input-field"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
            })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Subject</label>
        <input className="input-field" placeholder="What's this about?" {...register("subject")} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea
          rows={5}
          className="input-field resize-none"
          placeholder="Tell me about your project or opportunity..."
          {...register("message", {
            required: "Message is required",
            minLength: { value: 10, message: "Please write a little more" },
          })}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-70">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
