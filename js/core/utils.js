(function (App) {
  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const genreColors = ["#9b5546", "#667da8", "#5b9297", "#9b5278", "#c99745", "#7a6798"];

  function truncate(text, length = 20) {
    return text.length > length ? `${text.slice(0, length - 1)}...` : text;
  }

  App.Utils = {
    money,
    genreColors,
    truncate,
  };
})(window.PagesApp = window.PagesApp || {});
