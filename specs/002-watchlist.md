# 002-watchlist

Now I need to safel connect to the server and create a watchlist from the catalog items. They are almost the same but not quite. I have no control over the server and they have certain requirements. So probably should refactor the Catalog item to at least use the same names for the keys. That makes it    ff


### Authentication
Send your team ID via the `x-user-id` header with every request:

```javascript
headers: {
  'x-user-id': 'team-1'
}
```

### Server Response Objects
**Response:**
```json
[
  {
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
]
