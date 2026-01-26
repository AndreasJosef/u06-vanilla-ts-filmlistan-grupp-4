Lets us fine tune the latest monitor version a bit. 

Currently Even for items that have produced documentation there are still todos rendered in the docs. That should not be the case.

Then for look at the example below the MovieStats code and the doc genereated are attached below. 

basically it generates the module manifesst again for the props. that looks pretty messy. The question is did I play the comments correct. Ie should they be just inside the definition or above. 

Also then lets make sure that the snippet of the functoin also includes the parameters and the return type. 

Here is the code: 


/**
 * @module MovieStats
 * @description
 * A static row of additional facts about the parent film
 * Features:
 *  - shows relaease date, average rating, revenue, budget
 *  - TODO: mobile first responsive
 **/

/**
 * Configuration for the MovieStats
 * @property ratingAvg - Average rating returned form TMDB
 * @property releaseDate - Date string with release data
 * @property revenue - The movies revenue returned from TMDB
 * @property revenue - The movies budget returned from TMDB
 *
 **/
interface MovieStatsProps {
  ratingAvg: number;
  releaseDate: string;
  revenue: number;
  budget: number;
}

/**
 * Article Element
 * @returns A `article` containing the movie stat elements.
 */
export function createMovieStats(props: MovieStatsProps): HTMLElement {
  const movieStatsContainer = document.createElement("article");

  console.log(props);

  return movieStatsContainer;
}

Here is the generated reference doc:

## 📂 `src/app/detail/components/MovieStats.ts`

> 
*@module MovieStats*

*@description*
A static row of additional facts about the parent film
Features:
- shows relaease date, average rating, revenue, budget
- TODO: mobile first responsive

### 🟢 **createMovieStats**

*@module MovieStats*

*@description*
A static row of additional facts about the parent film
Features:
- shows relaease date, average rating, revenue, budget
- TODO: mobile first responsive
/**
Configuration for the MovieStats

*@property ratingAvg - Average rating returned form TMDB*

*@property releaseDate - Date string with release data*

*@property revenue - The movies revenue returned from TMDB*

*@property revenue - The movies budget returned from TMDB*
*/
interface MovieStatsProps {
ratingAvg: number;
releaseDate: string;
revenue: number;
budget: number;
}
/**
Article Element

**Returns:** A `article` containing the movie stat elements.
/

```typescript
export function createMovieStats
```
