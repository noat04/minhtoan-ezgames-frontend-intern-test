(function (App) {
  if (App.HomePage) App.HomePage.init();
  if (App.ListPage) App.ListPage.init();
  if (App.DetailPage) App.DetailPage.init();
  if (App.CheckoutPage) App.CheckoutPage.init();

  App.CartStore.updateBagCount();
})(window.PagesApp = window.PagesApp || {});