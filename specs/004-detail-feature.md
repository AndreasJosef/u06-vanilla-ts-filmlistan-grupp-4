# 004-detail-feature

When clicking on a movie in either watchlist or catalog we open the detail page. this page loads in information for that movie from tmdb and displays in view.

1. fetchMovieDetails(id, parseTMDBDetail): DetailItem
2. getDetailViewModel()


### Tasks

- move TMDB to shared folder
- update AppSate:
    movieDetails: Record<string, DetailItem>
    focusedMovie: string | null
- fetchMovieDetail()j


### 4. Movie Details‑vy (modal eller formulär)
Visa grundläggande information och ge möjlighet att lägga till/markera som sedd samt redigera ditt betyg och din recension för en vald film:**

- Enkel vy som kan vara:
  - En modal ovanpå nuvarande sida **eller**
  - En egen sida med ett formulär
- Visa minst:
  - Poster
  - Titel
  - TMDB‑betyg (från API:t)
- Tillgängliga åtgärder (knappar/formulärfält):
  - Lägg till i Watchlist
  - Markera som sedd
- Om filmen är sedd:
  - Visa/ändra ditt personliga betyg (1–5)
  - Visa/ändra din recension/anteckning



