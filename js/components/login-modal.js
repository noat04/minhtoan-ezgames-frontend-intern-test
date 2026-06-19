(function (App) {
  function init() {
    const modal = document.getElementById("loginModal");
    if (!modal) return;

    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="modal-overlay" data-close-login></div>

      <section class="modal-box" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button type="button" class="modal-close" data-close-login aria-label="Close login modal">
          &times;
        </button>

        <h2 id="login-title">Welcome back</h2>
        <p>Sign in to access your bag, orders and wishlist.</p>

        <form id="loginForm" class="login-form">
          <label for="loginEmail">Email</label>
          <input type="email" id="loginEmail" placeholder="you@example.com" required>

          <label for="loginPassword">Password</label>
          <input type="password" id="loginPassword" placeholder="Password" required>

          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>

        <p class="modal-note">New here? <a href="#">Create an account</a></p>
      </section>
    `;

    const openButtons = document.querySelectorAll("[data-open-login]");
    const closeButtons = modal.querySelectorAll("[data-close-login]");

    function openModal() {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector("input[type='email']").focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }

    openButtons.forEach((button) => button.addEventListener("click", openModal));
    closeButtons.forEach((button) => button.addEventListener("click", closeModal));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });

    modal.querySelector("#loginForm").addEventListener("submit", (event) => {
      event.preventDefault();
      closeModal();
    });
  }

  App.LoginModal = { init };
  init();
})(window.PagesApp = window.PagesApp || {});
