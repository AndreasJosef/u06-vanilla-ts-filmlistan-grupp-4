/**
 * A standard container for an operation that might fail.
 * This is based on the Railway pattern.
 */

// Track A: Everything went well
export type Success<T> = {
  ok: true;
  value: T;
};

// Track B: Something broke
export type Failure = {
  ok: false;
  error: string;
};

// The Union: It must be one or the other
export type Result<T> = Success<T> | Failure;

// --- Helper Functions (Ergonomics) ---

export const ok = <T>(value: T): Success<T> => ({
  ok: true,
  value,
});

export const fail = (error: string): Failure => ({
  ok: false,
  error,
});
