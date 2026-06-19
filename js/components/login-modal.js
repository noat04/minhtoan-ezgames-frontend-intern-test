(function () {
  const modal = document.getElementById("loginModal");
  if (!modal) return;

  const openButtons = document.querySelectorAll("[data-open-login]");
  const closeButtons = modal.querySelectorAll("[data-close-login]");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const emailInput = modal.querySelector("input[type='email']");
    if (emailInput) emailInput.focus();
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

  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      closeModal();
    });
  }
})();
