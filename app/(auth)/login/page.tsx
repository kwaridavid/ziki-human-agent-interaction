import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { isGoogleOAuthConfigured } from "@/lib/google-oauth";
import { safeCallbackUrl } from "@/lib/safe-callback-url";
import { AuthLegalNote, AuthSplitFrame } from "./auth-split-frame";

/* Distinct browser-tab title; the root layout appends "· Ziki". */
export const metadata = { title: "Sign in" };

/**
 * Authenticated users are redirected to /bugs by middleware (`auth` wrapper).
 * Errors show fixed copy per `?error=` code only; any other query text (such
 * as the old `?reason=`) is never rendered (#118). Details are in server logs.
 * Google OAuth is the only sign-in mechanism for Ziki.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    callbackUrl?: string;
    expired?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl);
  const googleConfigured = isGoogleOAuthConfigured();

  return (
    <main>
      <AuthSplitFrame
        title="Sign in to Ziki"
        description="Use your Google account to report, vote on and track issues."
        showAgentDocs
      >
        {params.expired && !params.error ? (
          <p
            className="rounded-xl bg-zk-warn-bg p-3 text-sm text-zk-warn-fg"
            role="status"
          >
            Your session ended. Sign in again to continue.
          </p>
        ) : null}

        {params.error ? (
          <div
            className="rounded-xl bg-zk-bad-bg p-3 text-sm text-zk-bad-fg"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <p className="font-medium">
              {params.error === "TwoFactor"
                ? "This account has an existing Ziki two-factor setting. Contact an administrator to update the account before signing in with Google."
                : params.error === "OAuthCallbackError" || params.error === "Configuration"
                  ? "Unable to complete Google sign-in. Please try again."
                  : "Authentication failed. Please try again."}
            </p>
          </div>
        ) : null}

        <GoogleSignInButton callbackUrl={callbackUrl} disabled={!googleConfigured} />
        {!googleConfigured ? (
          <p className="text-center text-xs text-zk-muted" role="status">
            Google sign-in is shown for this design preview, but isn’t configured in this local environment.
          </p>
        ) : null}

        <AuthLegalNote />
      </AuthSplitFrame>
    </main>
  );
}
