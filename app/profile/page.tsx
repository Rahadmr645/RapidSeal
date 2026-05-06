import Link from "next/link";
import { BackToDashboardLink } from "@/app/profile/back-to-dashboard-link";
import { APP_PATHS } from "@/lib/routes";
import { DeleteAccountButton } from "@/app/profile/delete-account-button";
import { SignOutButton } from "@/app/profile/sign-out-button";
import { requireAuth } from "@/lib/require-auth";
import { userAvatarUrl, userDisplayName, userInitials } from "@/lib/user-display";

function formatDate(iso: string | undefined) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function ProfilePage() {
  const { user } = await requireAuth();
  const name = userDisplayName(user);
  const email = user.email ?? "—";
  const avatarUrl = userAvatarUrl(user);
  const initials = userInitials(user);

  const appMeta = user.app_metadata as Record<string, unknown> | undefined;
  const provider =
    typeof appMeta?.provider === "string"
      ? appMeta.provider
      : Array.isArray(appMeta?.providers) && appMeta.providers.length
        ? String(appMeta.providers[0])
        : "—";

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-12">
      <div>
        <BackToDashboardLink />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Profile
        </h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Your account and workspace shortcuts.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
        <div className="border-b border-neutral-100 bg-gradient-to-br from-neutral-50 to-white px-6 py-8 dark:border-neutral-800 dark:from-neutral-900/80 dark:to-neutral-950">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white bg-neutral-200 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- OAuth avatar hosts vary
                <img
                  src={avatarUrl}
                  alt=""
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-neutral-700 dark:text-neutral-200">
                  {initials}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {name ?? "Your account"}
              </p>
              <p className="mt-1 break-all text-sm text-neutral-600 dark:text-neutral-400">{email}</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <div className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:items-center">
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Sign-in provider
            </dt>
            <dd className="text-sm capitalize text-neutral-900 dark:text-neutral-100">{provider}</dd>
          </div>
          <div className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:items-center">
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Email status
            </dt>
            <dd className="text-sm text-neutral-900 dark:text-neutral-100">
              {user.email_confirmed_at ? "Verified" : "Not verified"}
            </dd>
          </div>
          <div className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:items-center">
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              User ID
            </dt>
            <dd className="break-all font-mono text-xs text-neutral-700 dark:text-neutral-300">{user.id}</dd>
          </div>
          <div className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:items-center">
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Last sign in
            </dt>
            <dd className="text-sm text-neutral-900 dark:text-neutral-100">
              {formatDate(user.last_sign_in_at ?? undefined)}
            </dd>
          </div>
          <div className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:items-center">
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Member since
            </dt>
            <dd className="text-sm text-neutral-900 dark:text-neutral-100">
              {formatDate(user.created_at)}
            </dd>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">Shortcuts</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <Link
              href="/dashboard"
              className="inline-flex rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={APP_PATHS.createProposal}
              className="inline-flex rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              New proposal
            </Link>
          </li>
          <li>
            <Link
              href="/onboarding"
              className="inline-flex rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Workspace setup
            </Link>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">Session</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Sign out on this device. You can sign in again anytime with Google.
        </p>
        <div className="mt-4">
          <SignOutButton />
        </div>
      </section>

      <section className="rounded-2xl border border-red-200/80 bg-white p-6 shadow-sm dark:border-red-900/50 dark:bg-neutral-950">
        <h2 className="text-sm font-semibold text-red-800 dark:text-red-400">Danger zone</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Delete your account and auth profile from RapidSeal. This cannot be undone from the app.
        </p>
        <div className="mt-4">
          <DeleteAccountButton />
        </div>
      </section>
    </div>
  );
}
