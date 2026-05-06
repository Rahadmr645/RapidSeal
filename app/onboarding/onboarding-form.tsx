"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function OnboardingForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("agency");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Set up your workspace</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          A few details so proposals feel on-brand.
        </p>
      </div>
      <form
        onSubmit={submit}
        className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-950"
      >
        <label className="block space-y-1">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">Your name</span>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">Business name</span>
          <input
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">Business type</span>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="agency">Agency</option>
            <option value="freelance">Freelance</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-neutral-900 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
