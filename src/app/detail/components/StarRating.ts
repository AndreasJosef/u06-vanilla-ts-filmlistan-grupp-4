interface StarRatingProps {
  initialRating: number; // 0 to 5
  onRate: (rating: number) => void;
  interactive?: boolean;
}

export function createStarRating(props: StarRatingProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "flex gap-1 items-center";

  // Local State: We track this in a variable (closure), not the global store
  let currentRating = props.initialRating;

  // Helper to render stars based on a score
  const renderStars = (score: number) => {
    container.innerHTML = ""; // Clear current

    [1, 2, 3, 4, 5].forEach((starValue) => {
      const star = document.createElement("button");
      star.className =
        "text-2xl transition-colors duration-150 focus:outline-none";

      // Determine Color: Gold if active, Gray if inactive
      const isFilled = starValue <= score;
      star.style.color = isFilled ? "#fbbf24" : "#52525b"; // amber-400 vs zinc-600
      star.innerHTML = "★"; // Simple Unicode Star (or use SVG)

      if (props.interactive) {
        // 1. Hover Effect (Local UI State)
        star.onmouseenter = () => renderStars(starValue);

        // 2. Click (Commit Action)
        star.onclick = () => {
          currentRating = starValue;
          props.onRate(starValue);
        };
      }

      container.appendChild(star);
    });

    // Reset on mouse leave (if we didn't click)
    if (props.interactive) {
      container.onmouseleave = () => renderStars(currentRating);
    }
  };

  // Initial Render
  renderStars(currentRating);

  return container;
}
