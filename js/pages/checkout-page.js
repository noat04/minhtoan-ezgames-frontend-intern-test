(function (App) {
  function init() {
    const target = document.getElementById("cartItems");
    if (!target) return;

    let cart = App.CartStore.getCart();
    const { money } = App.Utils;

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
      App.CartStore.setCart(cart);
    }

    target.addEventListener("click", (event) => {
      const row = event.target.closest(".cart-item");
      if (!row) return;

      const id = Number(row.dataset.id);
      const item = cart.find((entry) => entry.id === id);

      if (event.target.closest(".remove-btn")) {
        cart = cart.filter((entry) => entry.id !== id);
      }
      if (event.target.dataset.action === "increase" && item) item.quantity += 1;
      if (event.target.dataset.action === "decrease" && item) {
        item.quantity = Math.max(1, item.quantity - 1);
      }

      draw();
    });

    draw();
  }

  App.CheckoutPage = { init };
})(window.PagesApp = window.PagesApp || {});
