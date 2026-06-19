(function (App) {
  function sortBooks(items, value) {
    const sorted = [...items];
    if (value === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (value === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (value === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }

  function init() {
    const target = document.getElementById("bookList");
    const filterBar = document.getElementById("filterBar");
    const sortSelect = document.getElementById("sortSelect");
    if (!target || !filterBar || !sortSelect) return;

    const params = new URLSearchParams(window.location.search);
    let activeGenre = params.get("genre") || "All";
    const searchTerm = (params.get("search") || "").trim().toLowerCase();
    const allGenres = ["All", ...genres.map((genre) => genre.name), "Biography"];
    const collectionCount = document.getElementById("collectionCount");

    function draw() {
      const genreMatches = activeGenre === "All"
        ? books
        : books.filter((book) => book.genre === activeGenre);
      const filtered = searchTerm
        ? genreMatches.filter((book) => {
            const searchableText = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
            return searchableText.includes(searchTerm);
          })
        : genreMatches;

      const cards = sortBooks(filtered, sortSelect.value)
        .map(App.BookCard.card)
        .join("");
      target.innerHTML = cards || `
        <p class="empty-results">No books found. Try another title, author or genre.</p>
      `;

      if (collectionCount) {
        collectionCount.textContent = searchTerm
          ? `${filtered.length} results for "${params.get("search").trim()}"`
          : `${filtered.length} titles in the collection`;
      }

      filterBar.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("active", button.dataset.genre === activeGenre);
      });
    }

    filterBar.innerHTML = allGenres
      .map((genre) => `<button type="button" data-genre="${genre}" class="${genre === activeGenre ? "active" : ""}">${genre}</button>`)
      .join("");

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      activeGenre = button.dataset.genre;
      draw();
    });

    sortSelect.addEventListener("change", draw);
    draw();
  }

  App.ListPage = { init };
})(window.PagesApp = window.PagesApp || {});
