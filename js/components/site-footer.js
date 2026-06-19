(function (App) {
  function init() {
    const footer = document.getElementById("siteFooter");
    if (!footer) return;

    footer.innerHTML = `
      <div class="container footer-wrapper">
        <section class="footer-brand" aria-labelledby="footer-brand-title">
          <h2 class="footer-title" id="footer-brand-title">Pages & Co.</h2>
          <p>An independent bookshop for readers who like to take their time. Open since 1998.</p>
          <nav class="social-links" aria-label="Social media">
            <a href="#" aria-label="LinkedIn">In</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="Facebook">f</a>
          </nav>
        </section>

        <nav class="footer-nav" aria-label="Footer navigation">
          <section aria-labelledby="footer-shop-title">
            <h3 id="footer-shop-title">Shop</h3>
            <a href="./lists.html">New arrivals</a>
            <a href="./lists.html">Bestsellers</a>
            <a href="./lists.html?genre=Fiction">Fiction</a>
            <a href="./lists.html?genre=Children">Children</a>
            <a href="#">Gift cards</a>
          </section>
          <section aria-labelledby="footer-about-title">
            <h3 id="footer-about-title">About</h3>
            <a href="#">Our story</a>
            <a href="#">Events</a>
            <a href="#">Visit the shop</a>
            <a href="#">Journal</a>
          </section>
          <section aria-labelledby="footer-help-title">
            <h3 id="footer-help-title">Help</h3>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">FAQ</a>
            <a href="#">Contact</a>
          </section>
        </nav>

        <section class="footer-newsletter" aria-labelledby="newsletter-title">
          <h3 id="newsletter-title">The reading room</h3>
          <p>One handpicked recommendation in your inbox each week.</p>
          <form class="newsletter-form">
            <label class="visually-hidden" for="newsletter-email">Email address</label>
            <input type="email" id="newsletter-email" placeholder="Email address">
            <button type="submit">Join</button>
          </form>
        </section>
      </div>

      <div class="container footer-bottom">
        <span>&copy; 2026 Pages & Co. &middot; Privacy &middot; Terms</span>
        <span>Free shipping on orders over $35</span>
      </div>
    `;

    footer.querySelector(".newsletter-form").addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  App.SiteFooter = { init };
  init();
})(window.PagesApp = window.PagesApp || {});
