"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("agency");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Persist via Supabase in a follow-up; for scaffold, go to dashboard
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Set up your workspace</h1>
        <p className="mt-1 text-sm text-neutral-600">A few details so proposals feel on-brand.</p>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Your name</span>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Business name</span>
          <input
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Business type</span>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          >
            <option value="agency">Agency</option>
            <option value="freelance">Freelance</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-neutral-900 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
