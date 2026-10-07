(function () {
  "use strict";

  var button = document.getElementById("theme-toggle");
  if (!button || button.dataset.bound === "true") return;
  button.dataset.bound = "true";

  function savedTheme() {
    try {
      var value = localStorage.getItem("ctw-theme");
      return value === "dark" || value === "light" ? value : "";
    } catch (error) {
      return "";
    }
  }

  function activeTheme() {
    var value = savedTheme();
    if (value) return value;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function paint(theme) {
    var dark = theme === "dark";
    button.textContent = dark ? "Світла тема" : "Темна тема";
    button.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  var theme = activeTheme();
  if (savedTheme()) document.documentElement.setAttribute("data-theme", theme);
  paint(theme);

  button.addEventListener("click", function () {
    theme = activeTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ctw-theme", theme);
    } catch (error) {}
    paint(theme);
  });
})();
