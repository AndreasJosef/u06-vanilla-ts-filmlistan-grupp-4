# 001-safe-catalog

## GOAL
Implement a type-safe data pipeline for TMDb catalog items using the "Sanctuary" pattern (Parser + Result Type).

## CORE
- **Architecture:** Store calls API -> API uses `safeFetch` -> Store updates state.
- **Contract:** `safeFetch` must be Generic: `safeFetch<T>(url, schema) -> Result<T>`.
- **Pattern:** Errors are data. The function returns `{ ok: true, data: T }` or `{ ok: false, error: string }`. NO throwing.
- **Type:** Define `CatalogItem` invariant (Title, ID, Poster).
- **Parser:** Zod (or manual validation) to ensure `unknown` API data matches `CatalogItem`.

## BOUNDARY
- No UI/View implementation yet (Data layer only).
- No complex caching logic (Simple assignment to Store).
- No implementation of other features (Search/Filtering).
