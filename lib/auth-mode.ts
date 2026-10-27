/** Shown when a password-based action is called while password auth is off. */
export const PASSWORD_AUTH_DISABLED_MESSAGE =
  "Password sign-in is disabled. Continue with Google instead.";

type AuthModeEnv = {
  AUTH_PASSWORD_LOGIN?: string;
  NODE_ENV?: string;
};

/**
 * Ziki uses Google as its only sign-in provider in every environment.
 * Keep the compatibility function because password-reset and legacy auth
 * actions use it to refuse direct calls as well as hide their UI.
 */
export function isPasswordAuthEnabled(_env?: AuthModeEnv): boolean {
  void _env;
  return false;
}
