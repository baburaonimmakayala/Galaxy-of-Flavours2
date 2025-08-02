let scrollIndex = 0;
const cardWidth = 251 + 24; // 251 is card width + 24px estimated gap (adjust if needed)
const maxVisible = 3;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("popular_items");
  const totalCards = container?.querySelectorAll(".popular_card").length || 0;

  // Attach scroll buttons (ensure IDs are present in HTML)
  const leftBtn = document.getElementById("scrollLeftBtn");
  const rightBtn = document.getElementById("scrollRightBtn");

  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      if (scrollIndex > 0) {
        scrollIndex--;
        console.log("Scrolling left to index:", scrollIndex);
        updateScroll(container);
      } else {
        console.log("Left scroll blocked. Already at index 0.");
      }
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      if (scrollIndex < totalCards - maxVisible) {
        scrollIndex++;
        updateScroll(container);
      }
    });
  }

  // Resize handler
  window.addEventListener("resize", () => updateScroll(container));

  // Special card controls
  const cards = document.querySelectorAll('.special_card');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (
        e.target.closest('.card_controls') ||
        e.target.classList.contains('qty_btn') ||
        e.target.classList.contains('add_to_cart_btn')
      ) return;

      cards.forEach(c => c.classList.remove('show_controls'));
      card.classList.add('show_controls');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.special_card')) {
      cards.forEach(card => card.classList.remove('show_controls'));
    }
  });
});

function updateScroll(container) {
  const offset = scrollIndex * cardWidth;
  container.style.transition = "transform 0.3s ease";
  container.style.transform = `translateX(-${offset}px)`;
}
