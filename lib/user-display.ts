import type { User } from "@supabase/supabase-js";

function metaRecord(user: User) {
  return user.user_metadata as Record<string, unknown> | undefined;
}

export function userDisplayName(user: User) {
  const meta = metaRecord(user);
  const fromMeta =
    typeof meta?.full_name === "string"
      ? meta.full_name
      : typeof meta?.name === "string"
        ? meta.name
        : "";
  const trimmed = fromMeta.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function userAvatarUrl(user: User) {
  const meta = metaRecord(user);
  if (typeof meta?.avatar_url === "string" && meta.avatar_url) return meta.avatar_url;
  if (typeof meta?.picture === "string" && meta.picture) return meta.picture;
  return null;
}

export function userInitials(user: User) {
  const meta = metaRecord(user);
  const name =
    userDisplayName(user) ||
    (typeof meta?.email === "string" && meta.email) ||
    user.email ||
    "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
