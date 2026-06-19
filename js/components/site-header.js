(function (App) {
  function init() {
    const header = document.getElementById("siteHeader");
    if (!header) return;

    header.innerHTML = `
      <div class="container header-wrapper">
        <a href="./index.html" class="logo" data-page="home" aria-label="Pages and Co home">
          Pages & Co.
        </a>

        <nav class="main-nav" aria-label="Main navigation">
          <a href="./index.html" data-page="home">Home</a>
          <a href="./lists.html" data-page="books">Shop All</a>
          <a href="./lists.html?genre=Fiction">Fiction</a>
          <a href="./lists.html?genre=Mystery">Mystery</a>
          <a href="./lists.html?genre=Children">Children</a>
          <a href="./lists.html?genre=Poetry">Poetry</a>
        </nav>

        <div class="header-actions">
          <button type="button" class="search-btn" aria-label="Search books">
            Search titles, authors...
          </button>
          <button type="button" class="signin-btn" data-open-login>Sign in</button>
          <a href="./checkout.html" class="bag-link" data-page="checkout">
            Bag <span class="bag-count">0</span>
          </a>
        </div>
      </div>
    `;

    const pageName = document.body.classList.contains("home-page")
      ? "home"
      : document.body.classList.contains("list-page") ||
          document.body.classList.contains("detail-page")
        ? "books"
        : document.body.classList.contains("checkout-page")
          ? "checkout"
          : "";

    header.querySelectorAll(`[data-page="${pageName}"]`).forEach((link) => {
      link.setAttribute("aria-current", "page");
    });
  }

  App.SiteHeader = { init };
  init();
})(window.PagesApp = window.PagesApp || {});
