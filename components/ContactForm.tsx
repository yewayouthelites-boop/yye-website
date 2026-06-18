"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import Portal from "@/components/ui/Portal";

const ROLE_OPTIONS = [
  { label: "Student", value: "student" },
  { label: "Mentor / Professional", value: "mentor" },
  { label: "Community Member", value: "community" },
  { label: "Potential Partner / Sponsor", value: "partner" },
  { label: "Other", value: "other" },
];

export default function ContactForm() {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      role:
        ROLE_OPTIONS.find((option) => option.value === role)?.label ||
        "Not specified",
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to send message.");
      }

      setRole("");
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send message.",
      );
    }
  };

  return (
    <div className="bg-white rounded-[20px] p-10 border border-yye-green/[0.1]">
      <h3 className="text-[1.15rem] font-extrabold mb-6 text-yye-dark">
        Send us a message
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            name="firstName"
            label="First Name"
            placeholder="e.g. Adebayo"
            required
          />
          <Input
            name="lastName"
            label="Last Name"
            placeholder="e.g. Okafor"
            required
          />
        </div>

        {/* Email */}
        <Input
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
        />

        {/* Custom Select for role */}
        <Select
          label="I am a…"
          options={ROLE_OPTIONS}
          placeholder="Choose your role"
          value={role}
          onChange={setRole}
        />

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-yye-gray uppercase tracking-[0.05em]">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Tell us how you'd like to get involved…"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-yye-green/[0.18] bg-white font-sans text-sm text-yye-dark placeholder:text-gray-400 outline-none transition-all resize-y min-h-[110px] focus:border-yye-green focus:ring-1 focus:ring-yye-green/[0.15]"
          />
        </div>

        <Button
          iconRight
          type="submit"
          fullWidth
          className="mt-1"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
      </form>

      {status === "error" && (
        <Toast
          message={errorMessage}
          onClose={() => {
            setStatus("idle");
            setErrorMessage("");
          }}
        />
      )}

      {status === "success" && (
        <Portal>
        <div
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-yye-light px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <div className="absolute inset-0 opacity-[0.05] yye-pattern" />
          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[760px] flex-col items-center justify-center text-center">
            <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-yye-green/[0.1] text-yye-green">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3
              id="contact-success-title"
              className="mb-3 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.05] text-yye-dark"
            >
              Message sent
            </h3>
            <p className="mb-8 max-w-[520px] text-base leading-[1.8] text-yye-gray">
              Thank you for reaching out. The YYE team will be in touch soon.
            </p>
            <Button type="button" onClick={() => setStatus("idle")}>
              Close
            </Button>
          </div>
        </div>
        </Portal>
      )}
    </div>
  );
}
