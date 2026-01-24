# 006-detail-view-watchlist-controls

I need to add at least two buttons to the detail view. one that toggles the watchlist status and if the movie is in watchlist I should also be able to mark it as seen or not. 

lets begin with the add to watchlist toggle

For the watched feature I will need to implement a put api call and update the moview in the db

Questions
Does the DB schema have isSeen or so on it? otherwise I cant save that.
```json
  {
    "id": 1,
    "user_id": "team-1",
    "tmdb_id": 550,
    "title": "Fight Club",
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "release_date": "1999-10-15",
    "vote_average": 8.4,
    "overview": "A ticking-time-bomb insomniac...",
    "status": "watchlist",
    "personal_rating": null,
    "review": null,
    "is_favorite": 0,
    "date_added": "2025-01-15 10:30:00",
    "date_watched": null
  }
```
