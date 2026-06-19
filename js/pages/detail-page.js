(function (App) {
  function selectedBook() {
    const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
    return books.find((book) => book.id === id) || books[0];
  }

  function renderMetadata(target, book) {
    if (!target) return;

    target.innerHTML = `
      <p><strong>Format</strong>Paperback</p>
      <p><strong>Pages</strong>${book.pages || 312}</p>
      <p><strong>Published</strong>${book.published || 2023}</p>
      <p><strong>Publisher</strong>Harbor & Vale</p>
      <p><strong>Language</strong>English</p>
      <p><strong>ISBN</strong>978-1-23456-001-2</p>
    `;
  }

  function init() {
    const detail = document.getElementById("bookDetail");
    if (!detail) return;

    const book = selectedBook();
    const related = books
      .filter((item) => item.genre === book.genre && item.id !== book.id)
      .slice(0, 2);
    const { money } = App.Utils;

    detail.querySelector(".detail-cover-wrapper .book-cover").outerHTML =
      App.BookCard.cover(book, "detail-cover", false);
    detail.querySelector(".detail-info > .book-badge").textContent = book.genre;
    detail.querySelector("#detail-title").textContent = book.title;
    detail.querySelector(".detail-info > .book-author").textContent = `by ${book.author}`;
    detail.querySelector(".book-rating").textContent =
      `\u2605 ${book.rating.toFixed(1)} \u00b7 ${book.pages || 312} pages \u00b7 ${book.published || 2023}`;
    detail.querySelector(".detail-price span").textContent = money.format(book.price);
    detail.querySelector(".detail-price del").textContent =
      book.oldPrice ? money.format(book.oldPrice) : "";
    detail.querySelector("#addToBagBtn").textContent =
      `Add to bag - ${money.format(book.price)}`;

    renderMetadata(detail.querySelector(".book-meta"), book);

    document.getElementById("addToBagBtn").addEventListener("click", () => {
      const cart = App.CartStore.getCart();
      const existing = cart.find((item) => item.id === book.id);
      if (existing) existing.quantity += 1;
      else cart.push({ id: book.id, quantity: 1 });
      App.CartStore.setCart(cart);
    });

    App.BookCard.renderCards(
      "relatedBooks",
      related.length ? related : books.slice(0, 2)
    );
  }

  App.DetailPage = { init };
})(window.PagesApp = window.PagesApp || {});
