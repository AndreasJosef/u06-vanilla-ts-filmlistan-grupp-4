import type { TMDBMovie } from "../../types/movie";

// En enkel vy som visar en hårdkodad film med information om filmen.
// Använder typescript för att definiera filmens egenskaper.
// Använd Store klassen för att hantera state.


const demoMovie: TMDBMovie = {
  id: 566555,
  title: "Cats",
};


export default function about() {
  const about = document.createElement("div");
  about.classList.add("about");

  about.innerHTML = `
    <section class="about-movie">
      <h2>Om filmen</h2>
      <div class="about-movie__card">
        <div class="about-movie__poster">
          <img src="https://www.themoviedb.org/t/p/w1280/aCNch5FmzT2WaUcY44925owIZXY.jpg" alt="${demoMovie.title}" />
        </div>
        <div class="about-movie__content">
          <h3>${demoMovie.title} </h3>
        </div>
      </div>
    </section>
  `;


  return about;
}