(function (App) {
  function cover(book, extraClass = "", showBadge = true) {
    const badge = showBadge && book.badge
      ? `<span class="book-badge ${book.badge.toLowerCase() === "new" ? "is-new" : ""}">${book.badge}</span>`
      : "";

    return `
      <div class="book-cover ${extraClass}" style="--cover:${book.coverColor}">
        ${badge}
        <span class="book-cover-title">${book.title}</span>
        <span class="book-cover-author">${book.author}</span>
      </div>
    `;
  }

  function card(book) {
    const { money, truncate } = App.Utils;
    const oldPrice = book.oldPrice ? `<del>${money.format(book.oldPrice)}</del>` : "";

    return `
      <article class="book-card">
        <a href="./detail.html?id=${book.id}" aria-label="View ${book.title}">
          ${cover(book)}
          <div class="book-info">
            <h3 class="book-title">${truncate(book.title)}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-bottom">
              <p><span class="price">${money.format(book.price)}</span>${oldPrice}</p>
              <span class="rating">${book.rating.toFixed(1)}</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  function renderCards(id, items) {
    const target = document.getElementById(id);
    if (target) target.innerHTML = items.map(card).join("");
  }

  App.BookCard = {
    cover,
    card,
    renderCards,
  };
})(window.PagesApp = window.PagesApp || {});
