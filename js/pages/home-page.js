(function (App) {
  function renderGenres() {
    const target = document.getElementById("genreGrid");
    if (!target || !Array.isArray(genres)) return;

    target.innerHTML = genres
      .map((genre, index) => {
        const count = books.filter((book) => book.genre === genre.name).length;
        const color = App.Utils.genreColors[index % App.Utils.genreColors.length];

        return `
          <a class="genre-card" href="./lists.html?genre=${encodeURIComponent(genre.name)}" style="--genre-color:${color}">
            <span>${genre.name}</span>
            <small>${count} titles</small>
          </a>
        `;
      })
      .join("");
  }

  function init() {
    if (!document.getElementById("genreGrid")) return;

    renderGenres();
    App.BookCard.renderCards("featuredBooks", books.slice(0, 5));
    App.BookCard.renderCards(
      "bestsellerBooks",
      books.filter((book) => book.badge === "Bestseller").slice(0, 4)
    );
    App.BookCard.renderCards(
      "newBooks",
      books.filter((book) => book.badge === "New").concat(books.slice(11, 12)).slice(0, 4)
    );
  }

  App.HomePage = { init };
})(window.PagesApp = window.PagesApp || {});
