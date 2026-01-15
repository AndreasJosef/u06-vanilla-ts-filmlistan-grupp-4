### 2. Användarens att-se-lista (`/watchlist`)

**Visa filmer du vill se:**

- Visa alla filmer i din watchlist (lagras via backend‑API:et)
- Varje film ska visa:
  - Poster, titel, releaseår, betyg
  - Datum när den lades till i watchlisten
  - "Markera som sedd"-knapp
- Visa tom‑state om watchlisten är tom
- Visa totalt antal filmer i watchlist

### Add Movie

**POST** `/api/movies`

Add a new movie to watchlist or watched list.

**Required Headers:**
```
Content-Type: application/json
x-user-id: team-1
```

**Required Fields:**
- `tmdb_id` (number): TMDB movie ID
- `title` (string): Movie title
- `status` (string): Either `"watchlist"` or `"watched"`

**Optional Fields:**
- `poster_path` (string): TMDB poster path
- `release_date` (string): Release date
- `vote_average` (number): TMDB rating
- `overview` (string): Movie description
- `personal_rating` (number): Your rating (1-5, only for watched movies)
- `review` (string): Your review text
- `is_favorite` (boolean): Mark as favorite
- `date_watched` (string): Date watched (for watched movies)

**Example:**
```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -H "x-user-id: team-1" \
  -d '{
    "tmdb_id": 550,
    "title": "Fight Club",
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "release_date": "1999-10-15",
    "vote_average": 8.4,
    "overview": "A ticking-time-bomb insomniac...",
    "status": "watchlist"
  }'
```

**JavaScript Example:**
```javascript
const response = await fetch('http://localhost:3000/api/movies', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-user-id': 'team-1'
  },
  body: JSON.stringify({
    tmdb_id: 550,
    title: 'Fight Club',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    release_date: '1999-10-15',
    vote_average: 8.4,
    overview: 'A ticking-time-bomb insomniac...',
    status: 'watchlist'
  })
});

const movie = await response.json();
```

**Response (201 Created):**
```json
{
  "id": 1,
  "user_id": "team-1",
  "tmdb_id": 550,
  "title": "Fight Club",
  "status": "watchlist",
  ...
}
```

**Error Response (409 Conflict - Duplicate):**
```json
{
  "error": "Movie already exists",
  "hint": "This movie is already in your watchlist or watched list. Try updating it instead."
}
```

---
