(function (App) {
  const heroSlides = [
    {
      label: "Weekend reading",
      title: ["Books chosen", "for slow", "Sunday mornings"],
      description: "Quiet, absorbing reads selected for the days when there is nowhere else to be.",
      cta: "Browse fiction",
      href: "./lists.html?genre=Fiction",
      colors: ["#455f4b", "#496a65"],
    },
    {
      label: "Staff favourites",
      title: ["The shelves", "we keep", "coming back to"],
      description: "Our booksellers pick the titles they can't stop pressing into customers' hands.",
      cta: "Browse bestsellers",
      href: "./lists.html",
      colors: ["#355b45", "#2f5856"],
    },
    {
      label: "New voices",
      title: ["Fresh stories", "from voices", "worth hearing"],
      description: "Discover recent arrivals with bold ideas, memorable characters and new perspectives.",
      cta: "See new arrivals",
      href: "./lists.html",
      colors: ["#4d5142", "#6d5848"],
    },
  ];

  function initHeroSlider() {
    const hero = document.querySelector(".hero-wrapper");
    if (!hero) return;

    const content = hero.querySelector(".hero-content");
    const label = content.querySelector(".section-label");
    const title = content.querySelector("#hero-title");
    const description = content.querySelector("p:not(.section-label)");
    const cta = content.querySelector(".hero-actions a");
    const dots = hero.querySelectorAll(".hero-dots button");
    let activeIndex = 1;

    function render() {
      const slide = heroSlides[activeIndex];
      label.textContent = slide.label;
      title.innerHTML = slide.title.map((line) => `<span>${line}</span>`).join(" ");
      description.textContent = slide.description;
      cta.textContent = slide.cta;
      cta.href = slide.href;
      hero.style.setProperty("--hero-start", slide.colors[0]);
      hero.style.setProperty("--hero-end", slide.colors[1]);

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function showSlide(index) {
      activeIndex = (index + heroSlides.length) % heroSlides.length;
      render();
    }

    hero.querySelector(".hero-arrow-prev").addEventListener("click", () => {
      showSlide(activeIndex - 1);
    });

    hero.querySelector(".hero-arrow-next").addEventListener("click", () => {
      showSlide(activeIndex + 1);
    });

    hero.querySelector(".hero-dots").addEventListener("click", (event) => {
      const dot = event.target.closest("[data-slide]");
      if (dot) showSlide(Number(dot.dataset.slide));
    });

    render();
  }

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

    initHeroSlider();
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
