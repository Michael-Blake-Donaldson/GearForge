const SENSITIVE_KEYS = [
  "token",
  "password",
  "authorization",
  "emaillink",
  "refreshtoken",
  "idtoken",
  "identitytoken",
  "email",
  "uid",
];

function redact(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!meta) return undefined;

  return Object.fromEntries(
    Object.entries(meta).map(([key, value]) => {
      const isSensitive = SENSITIVE_KEYS.some((s) =>
        key.toLowerCase().includes(s),
      );
      return [key, isSensitive ? "[REDACTED]" : value];
    }),
  );
}

export function safeLog(message: string, meta?: Record<string, unknown>) {
  if (!__DEV__) return;
  console.log(`[GearForge] ${message}`, redact(meta));
}

export function safeWarn(message: string, meta?: Record<string, unknown>) {
  if (!__DEV__) return;
  console.warn(`[GearForge] ${message}`, redact(meta));
}
