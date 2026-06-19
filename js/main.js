(function () {
  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const genreColors = ["#9b5546", "#667da8", "#5b9297", "#9b5278", "#c99745", "#7a6798"];
  const cartKey = "pagesAndCoCart";

  function getCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(cartKey));
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch (error) {
      return [{ id: 1, quantity: 2 }];
    }
    return [{ id: 1, quantity: 2 }];
  }

  function setCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateBagCount(cart);
  }

  function updateBagCount(cart = getCart()) {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll(".bag-count").forEach((element) => {
      element.textContent = count;
    });
  }

  function truncate(text, length = 20) {
    return text.length > length ? `${text.slice(0, length - 1)}...` : text;
  }

  function cover(book, extraClass = "") {
    const badge = book.badge
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

  function renderGenres() {
    const target = document.getElementById("genreGrid");
    if (!target || !Array.isArray(genres)) return;

    target.innerHTML = genres
      .map((genre, index) => {
        const count = books.filter((book) => book.genre === genre.name).length;
        return `
          <a class="genre-card" href="./lists.html?genre=${encodeURIComponent(genre.name)}" style="background:${genreColors[index % genreColors.length]}">
            <span>${genre.name}</span>
            <small>${count} titles</small>
          </a>
        `;
      })
      .join("");
  }

  function sortBooks(items, value) {
    const sorted = [...items];
    if (value === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (value === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (value === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }

  function renderList() {
    const target = document.getElementById("bookList");
    const filterBar = document.getElementById("filterBar");
    if (!target || !filterBar) return;

    const params = new URLSearchParams(window.location.search);
    let activeGenre = params.get("genre") || "All";
    const allGenres = ["All", ...genres.map((genre) => genre.name), "Biography"];

    function draw() {
      const sortSelect = document.getElementById("sortSelect");
      const filtered = activeGenre === "All" ? books : books.filter((book) => book.genre === activeGenre);
      target.innerHTML = sortBooks(filtered, sortSelect.value).map(card).join("");

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

    document.getElementById("sortSelect").addEventListener("change", draw);
    draw();
  }

  function selectedBook() {
    const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
    return books.find((book) => book.id === id) || books[0];
  }

  function renderDetail() {
    const detail = document.getElementById("bookDetail");
    if (!detail) return;

    const book = selectedBook();
    const related = books.filter((item) => item.genre === book.genre && item.id !== book.id).slice(0, 2);
    const meta = detail.querySelector(".book-meta");

    detail.querySelector(".detail-cover-wrapper .book-cover").outerHTML = cover(book, "detail-cover");
    detail.querySelector(".book-badge").textContent = book.genre;
    detail.querySelector("#detail-title").textContent = book.title;
    detail.querySelector(".detail-info > .book-author").textContent = `by ${book.author}`;
    detail.querySelector(".book-rating").textContent = `${book.rating.toFixed(1)} · ${book.pages || 312} pages · ${book.published || 2023}`;
    detail.querySelector(".detail-price span").textContent = money.format(book.price);
    detail.querySelector(".detail-price del").textContent = book.oldPrice ? money.format(book.oldPrice) : "";
    detail.querySelector("#addToBagBtn").textContent = `Add to bag - ${money.format(book.price)}`;

    if (meta) {
      meta.innerHTML = `
        <p><strong>Format</strong>Paperback</p>
        <p><strong>Pages</strong>${book.pages || 312}</p>
        <p><strong>Published</strong>${book.published || 2023}</p>
        <p><strong>Publisher</strong>Harbor & Vale</p>
        <p><strong>Language</strong>English</p>
        <p><strong>ISBN</strong>978-1-23456-001-2</p>
      `;
    }

    document.getElementById("addToBagBtn").addEventListener("click", () => {
      const cart = getCart();
      const existing = cart.find((item) => item.id === book.id);
      if (existing) existing.quantity += 1;
      else cart.push({ id: book.id, quantity: 1 });
      setCart(cart);
    });

    renderCards("relatedBooks", related.length ? related : books.slice(0, 2));
  }

  function renderCart() {
    const target = document.getElementById("cartItems");
    if (!target) return;

    let cart = getCart();

    function draw() {
      const lines = cart
        .map((item) => {
          const book = books.find((entry) => entry.id === item.id);
          if (!book) return "";
          return `
            <article class="cart-item" data-id="${book.id}">
              <div class="cart-thumb" style="--cover:${book.coverColor}"></div>
              <div>
                <h3 class="cart-title">${book.title}</h3>
                <p class="cart-author">${book.author}</p>
                <button type="button" class="remove-btn">Remove</button>
              </div>
              <div class="quantity-control" aria-label="Quantity">
                <button type="button" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase">+</button>
              </div>
              <p class="cart-line-price">${money.format(book.price * item.quantity)}</p>
            </article>
          `;
        })
        .join("");

      target.innerHTML = lines || "<p>Your bag is empty.</p>";
      const subtotal = cart.reduce((total, item) => {
        const book = books.find((entry) => entry.id === item.id);
        return total + (book ? book.price * item.quantity : 0);
      }, 0);

      document.getElementById("subtotal").textContent = money.format(subtotal);
      document.getElementById("total").textContent = money.format(subtotal);
      setCart(cart);
    }

    target.addEventListener("click", (event) => {
      const row = event.target.closest(".cart-item");
      if (!row) return;
      const id = Number(row.dataset.id);
      const item = cart.find((entry) => entry.id === id);

      if (event.target.closest(".remove-btn")) cart = cart.filter((entry) => entry.id !== id);
      if (event.target.dataset.action === "increase" && item) item.quantity += 1;
      if (event.target.dataset.action === "decrease" && item) item.quantity = Math.max(1, item.quantity - 1);
      draw();
    });

    draw();
  }

  renderGenres();
  renderCards("featuredBooks", books.slice(0, 5));
  renderCards("bestsellerBooks", books.filter((book) => book.badge === "Bestseller").slice(0, 4));
  renderCards("newBooks", books.filter((book) => book.badge === "New").concat(books.slice(11, 12)).slice(0, 4));
  renderList();
  renderDetail();
  renderCart();
  updateBagCount();
})();
