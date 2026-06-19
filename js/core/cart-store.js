(function (App) {
  const cartKey = "pagesAndCoCart";
  const defaultCart = [{ id: 1, quantity: 2 }];

  function createDefaultCart() {
    return defaultCart.map((item) => ({ ...item }));
  }

  function getCart() {
    try {
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart === null) return createDefaultCart();

      const parsed = JSON.parse(savedCart);
      if (Array.isArray(parsed)) return parsed;
    } catch (error) {
      return createDefaultCart();
    }

    return createDefaultCart();
  }

  function updateBagCount(cart = getCart()) {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll(".bag-count").forEach((element) => {
      element.textContent = count;
    });
  }

  function setCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateBagCount(cart);
  }

  App.CartStore = {
    getCart,
    setCart,
    updateBagCount,
  };
})(window.PagesApp = window.PagesApp || {});
