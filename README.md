# Filmkollen – Projektrapport

## Sammanfattning

Filmkollen är en Single Page Application (SPA) för att utforska filmer och hantera en personlig "Watchlist". Applikationen låter användare söka filmer, spara dem, och betygsätta sedda titlar. Arkitekturen är byggd för att vara skalbar och strikt typsäker, med fokus på en tydlig enkelriktad dataflödeskedja.

## Arkitektur & Designval

### Feature Sliced Design

Vi omstrukturerade projektet från en lager-baserad struktur till en **Feature Sliced** arkitektur. Varje huvudfunktion (`catalog`, `detail`, `watchlist`) lever i sin egen mapp under `src/app` och innehåller alla sina beståndsdelar: *actions, api, model* och *view*.

* **Fördel:** Detta eliminerade cirkulära beroenden och gör koden modulär. Vi kan i teorin radera mappen `watchlist` utan att `catalog` slutar fungera.
* **Shared Kernel:** Gemensamma typer och komponenter (som knappar och stjärnor) lever i `src/shared` och kan importeras av alla features.

### State Management & Router

Vi valde att förenkla vår `Store` drastiskt genom att flytta alla `setState`-operationer till **Actions**. Våra vyer får aldrig modifiera state direkt, vilket gör felsökning enklare.

Applikationen drivs helt av URL:en. Vi implementerade en `handleRoute` i `main.ts` som lyssnar på URL-förändringar och omvandlar dem till state-events. Detta innebär att URL:en alltid är "Single Source of Truth" för vilken vy som visas, vilket garanterar att bakåt- och framåtknapparna i webbläsaren fungerar korrekt.

### Core: Type-Safe API Engine

För att hantera kommunikation med TMDB och vår backend skrev vi en generisk och typsäker wrapper runt `fetch`-API:et i `core/api-engine.ts`.

* Den hanterar nätverksfel och JSON-parsning centralt.
* Den returnerar ett `Result<T>`-objekt, vilket tvingar oss att hantera både lyckade anrop och fel i UI-lagret.

## Arbetsmetodik

### Compiler Driven Development (CDD)

Vi använde TypeScript-kompilatorn som ett aktivt utvecklingsverktyg snarare än bara en kontrollant. Vårt flöde för att lägga till ny funktionalitet var:

1. **Modellera:** Lägg till en ny typ eller fält i en *View Model* (t.ex. `userRating`).
2. **Lyssna:** Låt kompilatorn visa alla ställen där koden nu "går sönder" (röda varningar).
3. **Implementera:** Fixa felen systematiskt tills kompilatorn är nöjd.
Detta gjorde refactoring tryggt och effektivt.

### Dokumentation som Verktyg

I takt med att projektet växte insåg vi svårigheten i att kommunicera kodbasens struktur till varandra och utomstående. Eftersom vi inte hade skrivit dokumentation löpande från start, utvecklade vi ett eget verktyg (scripts/docs.js) för att snabbt komma ikapp.

Vi designade scriptet för att vara "brutalt ärligt": det genererar inte bara en manual över det som finns, utan listar explicit alla funktioner och filer som saknar dokumentation (markerade med röda varningssymboler). Detta synliggjorde våra "knowledge gaps" och förvandlade dokumentationsarbetet från en abstrakt uppgift till en konkret att-göra-lista där vi systematiskt kunde beta av de röda prickarna.

En exempel på den dokumentationen som scriptet genererar finns under `./REFERENCE.md`

## Styrkor och Brister

### Styrkor

* **Data Isolation:** Varje feature använder sina egna *View Models* för att slå ihop (merge) data från `shared/types`. Det gör att vi undviker enorma, svårhanterliga objekt som skickas runt i appen.
* **Utbyggbarhet:** Arkitekturen gör det trivialt att lägga till nya funktioner. Att lägga till en ny vy kräver bara en ny mapp i `app` och en rad i routern.
* **Robusthet:** Kombinationen av strikta typer och en centraliserad felhantering i API-motorn gör applikationen mycket stabil.

## Brister och Lärdomar

Manuell DOM-hantering (Boilerplate): Applikationen är fullt reaktiv – UI uppdateras automatiskt när state ändras – men eftersom vi bygger DOM-elementen manuellt (utan JSX) krävs mycket repetitiv kod för att koppla ihop element med data. Detta gör komponentfilerna onödigt långa. I framtida projekt skulle vi använda ett bibliotek för att minska denna "boilerplate".

Funktionskompletthet: På grund av tidsramen är inte alla features från uppgiftsbeskrivningen (t.ex. avancerad filtrering) helt implementerade i gränssnittet. Däremot är arkitekturen färdigställd för detta. Alla byggstenar (Action-hantering, Router-stöd och API-anrop) finns på plats, vilket gör det trivialt att koppla in den saknade funktionaliteten utan att behöva skriva om kärnkoden.
