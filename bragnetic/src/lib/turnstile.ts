const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstile(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set - skipping verification");
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data: TurnstileResponse = await response.json();
    return data.success;
  } catch (err) {
    console.error("[turnstile] Verification failed:", err);
    return false;
  }
}
