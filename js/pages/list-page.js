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
    const allGenres = ["All", ...genres.map((genre) => genre.name), "Biography"];

    function draw() {
      const filtered = activeGenre === "All"
        ? books
        : books.filter((book) => book.genre === activeGenre);

      target.innerHTML = sortBooks(filtered, sortSelect.value)
        .map(App.BookCard.card)
        .join("");

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
