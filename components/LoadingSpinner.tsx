export function LoadingSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-neutral-600">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800"
        role="status"
        aria-label={label}
      />
      <p className="text-sm">{label}</p>
    </div>
  );
}
