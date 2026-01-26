# Field Logic Reference

![Coverage](https://img.shields.io/badge/Coverage-12%25-red)

**Total Exports:** 74 | **Documented:** 9 | **Undocumented:** 65

⚠️ **28 files are missing a Macro Description.**

---

## 📂 `src/app/catalog/actions.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **clearResult**
_No documentation provided._

```typescript
export function clearResult()
```

### 🔴 **searchMovies**
_No documentation provided._

```typescript
export function searchMovies(searchText: string)
```

### 🔴 **loadPopularMovies**
_No documentation provided._

```typescript
export function loadPopularMovies()
```

### 🔴 **showCatalog**
_No documentation provided._

```typescript
export function showCatalog()
```

---

## 📂 `src/app/catalog/api.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **TMDB**
_No documentation provided._

```typescript
export const TMDB=
```

---

## 📂 `src/app/catalog/components/SearchBar.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **createSearchBar**
_No documentation provided._

```typescript
export function createSearchBar(props: SearchBarProps)
```

### 🔴 **SearchBarProps**
_No documentation provided._

```typescript
export interface SearchBarProps
```

---

## 📂 `src/app/catalog/components/search.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **createInput**
_No documentation provided._

```typescript
export function createInput(props: InputProps)
```

### 🔴 **InputProps**
_No documentation provided._

```typescript
export interface InputProps
```

---

## 📂 `src/app/catalog/model.ts`

The brain of the movie browsing and search experience.
Transforms raw movie lists into GalleryCard props and handles
the logic for the "Search vs Popular" state.
@architectural-role Model
@input  {AppState}
@output {CatalogViewModel}

### 🔴 **getCatalogViewModel**
_No documentation provided._

```typescript
export function getCatalogViewModel(state: AppState): CatalogViewModel
```

---

## 📂 `src/app/catalog/parser.ts`

> 🔴 **FILE MISSING DESCRIPTION**

###  **parseTmdbMovie**
Parses a generic movie result from TMDB (Search or Popular list).
Returns the 'CatalogItemBase' shape, which satisfies the CatalogItem union.

```typescript
export function parseTmdbMovie(input: unknown): Result<Movie>
```

###  **parseTMDBDetail**
Parses a the detail movie result from TMDB.
Returns the 'MovieDetail' shape.

```typescript
export function parseTMDBDetail(input: unknown): Result<MovieDetail>
```

---

## 📂 `src/app/catalog/types.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **CatalogViewModel**
_No documentation provided._

```typescript
export interface CatalogViewModel
```

### 🔴 **GalleryItemViewModel**
_No documentation provided._

```typescript
export interface GalleryItemViewModel
```

---

## 📂 `src/app/catalog/view.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **browseView**
_No documentation provided._

```typescript
export function browseView(state: AppState)
```

---

## 📂 `src/app/detail/actions.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **showDetail**
_No documentation provided._

```typescript
export function showDetail(id: string)
```

---

## 📂 `src/app/detail/components/MovieStats.ts`

A static row of additional facts about the parent film
Features:
- shows relaease date, average rating, revenue, budget
- TODO mobile first responsive

###  **MovieStatsProps**
Configuration for the MovieStats

**Properties:**
* `ratingAvg` - Average rating returned form TMDB
* `releaseDate` - Date string with release data
* `revenue` - The movies revenue returned from TMDB
* `revenue` - The movies budget returned from TMDB

```typescript
export interface MovieStatsProps
```

###  **createMovieStats**
Factory function for the MovieStats component

**Properties:**
* `MovieStatsProps` - 

**Returns:** - An `article` element containing the movie stat elements.

```typescript
export function createMovieStats(props: MovieStatsProps): HTMLElement
```

---

## 📂 `src/app/detail/components/StarRating.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **createStarRating**
_No documentation provided._

```typescript
export function createStarRating(props: StarRatingProps): HTMLElement
```

---

## 📂 `src/app/detail/model.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **getDetailViewModel**
_No documentation provided._

```typescript
export function getDetailViewModel(state: AppState): DetailViewModel | null
```

---

## 📂 `src/app/detail/parser.ts`

> 🔴 **FILE MISSING DESCRIPTION**

###  **parseTMDBDetail**
Parses a the detail movie result from TMDB.
Returns the 'MovieDetail' shape.

```typescript
export function parseTMDBDetail(input: unknown): Result<MovieDetail>
```

---

## 📂 `src/app/detail/types.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **DetailViewModel**
_No documentation provided._

```typescript
export interface DetailViewModel
```

---

## 📂 `src/app/detail/view.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **detailView**
_No documentation provided._

```typescript
export function detailView(state: AppState): ViewElement
```

---

## 📂 `src/app/root/model.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **getRootViewModel**
_No documentation provided._

```typescript
export function getRootViewModel(state: AppState): RootViewModel
```

### 🔴 **RootViewModel**
_No documentation provided._

```typescript
export interface RootViewModel
```

---

## 📂 `src/app/root/view.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **createRootView**
_No documentation provided._

```typescript
export function createRootView(state: AppState): ViewElement
```

---

## 📂 `src/app/watchlist/actions.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **saveMovieRating**
_No documentation provided._

```typescript
export function saveMovieRating(id: string | null, rating: number)
```

### 🔴 **removeFromWatchlist**
_No documentation provided._

```typescript
export function removeFromWatchlist(movieId: string)
```

### 🔴 **addToWatchlist**
_No documentation provided._

```typescript
export function addToWatchlist(item: Movie)
```

### 🔴 **toggleWatchlist**
_No documentation provided._

```typescript
export function toggleWatchlist(item: Movie, dbId: string | null)
```

### 🔴 **loadWatchlist**
_No documentation provided._

```typescript
export function loadWatchlist()
```

### 🔴 **showWatchlist**
_No documentation provided._

```typescript
export function showWatchlist()
```

###  **toggleSeenStatus**
Toggles the watched status of a movie in the users watchlist

**Parameters:**
* `dbId`: The database id of the movie to updated
* `status`: The current isSeen status of the movie

```typescript
export function toggleSeenStatus( dbId: string | null, currentStatus: "watchlist" | "watched", )
```

---

## 📂 `src/app/watchlist/api.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **updateWatchlistItemStatus**
_No documentation provided._

```typescript
export function updateWatchlistItemStatus( movieId: string, movie: WatchlistItem, )
```

### 🔴 **deleteWatchlistItem**
_No documentation provided._

```typescript
export function deleteWatchlistItem(movieId: string)
```

### 🔴 **saveWatchlistItem**
_No documentation provided._

```typescript
export function saveWatchlistItem(item: WatchlistItem)
```

### 🔴 **getWatchlist**
_No documentation provided._

```typescript
export function getWatchlist()
```

---

## 📂 `src/app/watchlist/model.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **getWatchListViewModel**
_No documentation provided._

```typescript
export function getWatchListViewModel( state: AppState, ): WatchlistCardViewModel[]
```

### 🔴 **createDraftFromCatalog**
_No documentation provided._

```typescript
export function createDraftFromCatalog(item: Movie): WatchlistItemNotSeen
```

---

## 📂 `src/app/watchlist/parser.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **parseWatchlistItem**
_No documentation provided._

```typescript
export function parseWatchlistItem(input: unknown): Result<WatchlistItem>
```

---

## 📂 `src/app/watchlist/types.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **WatchlistCardViewModel**
_No documentation provided._

```typescript
export type WatchlistCardViewModel=
```

### 🔴 **WatchlistItem**
_No documentation provided._

```typescript
export type WatchlistItem= WatchlistItemSeen | WatchlistItemNotSeen
```

### 🔴 **WatchlistItemSeen**
_No documentation provided._

```typescript
export type WatchlistItemSeen= WatchlistItemBase &
```

### 🔴 **WatchlistItemNotSeen**
_No documentation provided._

```typescript
export type WatchlistItemNotSeen= WatchlistItemBase &
```

### 🔴 **WatchlistItemBase**
_No documentation provided._

```typescript
export type WatchlistItemBase=
```

---

## 📂 `src/app/watchlist/view.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **watchlistView**
_No documentation provided._

```typescript
export function watchlistView(state: AppState): ViewElement
```

---

## 📂 `src/core/api-engine.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **updateSafe**
_No documentation provided._

```typescript
export function updateSafe<T>( url: string, payload: T, config: RequestInit =
```

### 🔴 **safeDelete**
_No documentation provided._

```typescript
export function safeDelete<T>( url: string, config: RequestInit =
```

###  **fetchSafeList**
A reusable fetcher that handles the network, JSON parsing,
and data cleaning for a LIST of items.
* @param url - The endpoint to hit

**Parameters:**
* `parser`: A function that converts 'unknown' input into 'Result<T>'

```typescript
export function fetchSafeList<T>( url: string, parser: (input: unknown) => Result<T>, config: RequestInit =
```

###  **fetchSafeItem**
A reusable fetcher for a SINGLE item.

```typescript
export function fetchSafeItem<T>( url: string, parser: (input: unknown) => Result<T>, config: RequestInit, ): Promise<Result<T>>
```

###  **safePost**
A reusable poster for sending data.

```typescript
export function safePost<T>( url: string, payload: T, config: RequestInit =
```

---

## 📂 `src/core/result.ts`

A standard container for an operation that might fail.
This is based on the Railway pattern.

### 🔴 **fail**
_No documentation provided._

```typescript
export const fail= (error: string): Failure => (
```

### 🔴 **ok**
_No documentation provided._

```typescript
export const ok= <T>(value: T): Success<T> => (
```

### 🔴 **Result**
_No documentation provided._

```typescript
export type Result<T> = Success<T> | Failure
```

### 🔴 **Failure**
_No documentation provided._

```typescript
export type Failure=
```

### 🔴 **Success**
_No documentation provided._

```typescript
export type Success<T> =
```

---

## 📂 `src/core/router.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **getCurrentPath**
_No documentation provided._

```typescript
export function getCurrentPath()
```

### 🔴 **navigateTo**
_No documentation provided._

```typescript
export function navigateTo(path: string)
```

---

## 📂 `src/core/toast/toast.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **toast**
_No documentation provided._

```typescript
export const toast=
```

### 🔴 **showToast**
_No documentation provided._

```typescript
export function showToast(options: ToastOptions)
```

### 🔴 **ToastOptions**
_No documentation provided._

```typescript
export type ToastOptions=
```

### 🔴 **ToastVariant**
_No documentation provided._

```typescript
export type ToastVariant= "success" | "error" | "info"
```

---

## 📂 `src/shared/components/Button.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **createButton**
_No documentation provided._

```typescript
export function createButton(props: ButtonProps)
```

---

## 📂 `src/shared/components/GalleryCard.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **createGalleryCard**
_No documentation provided._

```typescript
export function createGalleryCard(props: GalleryCardProps)
```

### 🔴 **GalleryCardProps**
_No documentation provided._

```typescript
export interface GalleryCardProps
```

---

## 📂 `src/shared/types/movies.ts`

The Data Definition of a "Movie" in Filmkollen.
This type represents a movie as it exists
in our domain, regardless of whether it is being viewed in the
Catalog the Detail view.

### 🔴 **MovieDetail**
_No documentation provided._

```typescript
export interface MovieDetailextends Movie
```

### 🔴 **Movie**
_No documentation provided._

```typescript
export interface Movie
```

---

## 📂 `src/store.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **setRenderCallback**
_No documentation provided._

```typescript
export const setRenderCallback= store.setRenderCallback.bind(store)
```

### 🔴 **getState**
_No documentation provided._

```typescript
export const getState= store.getState.bind(store)
```

### 🔴 **setState**
_No documentation provided._

```typescript
export const setState= store.setState.bind(store)
```

---

## 📂 `src/types.ts`

> 🔴 **FILE MISSING DESCRIPTION**

### 🔴 **ViewComponent**
_No documentation provided._

```typescript
export type ViewComponent= (state?: AppState) => ViewElement | string
```

### 🔴 **ViewElement**
_No documentation provided._

```typescript
export interface ViewElementextends HTMLElement
```

### 🔴 **ViewCleanup**
_No documentation provided._

```typescript
export type ViewCleanup= () => void
```

### 🔴 **AppState**
_No documentation provided._

```typescript
export interface AppState
```

---

