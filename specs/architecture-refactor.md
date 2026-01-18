# Architecture Refactor

Update to folder structure and architecture to a feature based layout


## Checklist


1. Core First: Copy/Paste result.ts and api-engine.ts into src/core. (Get the machinery working).

2. Types Second: Create src/app/library/types.ts. Define your Invariant/Variant/Union. (Define the reality).

3. Parsers Third: Create src/app/library/parser.ts. Write the function to clean the DB data. (Build the firewall).

4. API Fourth: Connect api-engine + parser in src/app/library/api.ts. (Open the gate).

5. Store Fifth: Create src/store.ts and wire up the loadLibrary action.

6. UI Last: Open views/watchlist-page.ts, subscribe to the store, and render the HTML.

7. You have totally reframed the messy assignment into a professional, scalable architecture. Go build it.
