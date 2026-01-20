import { type Result, ok, fail } from "./result";

/**
 * A reusable fetcher that handles the network, JSON parsing,
 * and data cleaning for a LIST of items.
 * * @param url - The endpoint to hit
 * @param parser - A function that converts 'unknown' input into 'Result<T>'
 */

export async function safeFetchList<T>(
  url: string,
  parser: (input: unknown) => Result<T>,
  config: RequestInit = {},
): Promise<Result<T[]>> {
  try {
    // Prepare the headers
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    // merge user headers
    if (config.headers) {
      const userHeaders = new Headers(config.headers);
      userHeaders.forEach((value, key) => headers.set(key, value));
    }

    // then spread the whole config and add the fixed headers.
    const response = await fetch(url, {
      ...config,
      headers,
    });

    if (!response.ok) {
      return fail(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // Unknown: We don't know what this is yet.
    const rawData: unknown = await response.json();
    let list: unknown[] = [];

    // Extraction: Handle common API patterns ({ results: [] } vs [])
    if (Array.isArray(rawData)) {
      list = rawData;
    } else if (rawData && typeof rawData === "object") {
      // Safely check if it has a .results property
      const wrapper = rawData as Record<string, unknown>;
      if (Array.isArray(wrapper.results)) {
        list = wrapper.results;
      }
    }

    // If we still don't have an array, the API shape is wrong for a List fetch.
    if (
      list.length === 0 &&
      !Array.isArray(rawData) &&
      (!rawData || typeof rawData !== "object")
    ) {
      // Note: Empty lists are fine, but "not a list" is an error.
      // We are lenient here: if we couldn't find a list, we just return empty
      // to prevent crashes, but logging it is wise.
      console.warn(
        `safeFetchList expected an array at ${url} but got`,
        rawData,
      );
      return ok([]);
    }

    // 3. The Railway Logic (Map & Filter)
    // Run the parser on every single item.
    const results = list.map((item) => parser(item));

    // Keep the good ones
    // The is here is called Type Predicate
    const successes = results
      // If r.ok is true we predicate it as success type
      .filter((r): r is { ok: true; value: T } => r.ok)
      // then we create an array of just the values: T
      .map((r) => r.value);

    // (Optional) Log the failures so you know if your parser is too strict
    const failures = results.filter((r) => !r.ok);
    if (failures.length > 0) {
      console.warn(
        `Dropped ${failures.length} bad items from ${url}:`,
        failures,
      );
    }

    return ok(successes);
  } catch (e) {
    // Network failures (offline, DNS issues)
    return fail(e instanceof Error ? e.message : "Unknown Network Error");
  }
}

/**
 * A reusable fetcher for a SINGLE item.
 */
export async function safeFetchOne<T>(
  url: string,
  parser: (input: unknown) => Result<T>,
  config: RequestInit,
): Promise<Result<T>> {
  try {
    const response = await fetch(url, config);
    if (!response.ok) return fail(`HTTP ${response.status}`);

    const rawData: unknown = await response.json();

    // Direct pipe to parser
    return parser(rawData);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Network Error");
  }
}

/**
 * A reusable poster for sending data.
 */
export async function safePost<T>(
  url: string,
  payload: T,
  config: RequestInit = {},
  parser?: (input: unknown) => Result<T>, // Optional: Parse the response
): Promise<Result<T | null>> {
  try {
    config.method = "POST";

    // Prepare the headers
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    // merge user headers
    if (config.headers) {
      const userHeaders = new Headers(config.headers);
      userHeaders.forEach((value, key) => headers.set(key, value));
    }

    const response = await fetch(url, {
      ...config,
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) return fail(`HTTP ${response.status}`);

    // If we don't care about the response data (fire and forget)
    if (!parser) return ok(null);

    const rawData: unknown = await response.json();
    return parser(rawData);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Network Error");
  }
}
