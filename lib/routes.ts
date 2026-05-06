/**
 * App paths that should not be trivially guessable (e.g. avoid a top-level `/new`).
 * Use these constants for links; do not hard-code the string elsewhere.
 */
export const APP_PATHS = {
  /** Authenticated: create a proposal from a client brief (replaces legacy `/new`). */
  createProposal: "/workspace/proposals/compose",
} as const;
