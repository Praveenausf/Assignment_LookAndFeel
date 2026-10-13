/**
 * Shared scripts for every page — Infusion
 * Author: Praveena Vemula
 */
document.addEventListener("DOMContentLoaded", function () {
  // Mark the current page in the top menu
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("current");
      link.setAttribute("aria-current", "page");
    }
  });

  // Mobile menu toggle
  var btn = document.querySelector(".menu-btn");
  var menu = document.querySelector(".menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Home page: next four shows
  var box = document.getElementById("upcoming-shows");
  if (box && typeof TOUR_DATES !== "undefined") {
    TOUR_DATES.slice(0, 4).forEach(function (show) {
      var d = new Date(show.date + "T00:00:00");
      var month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
      var tag = show.status === "Sold Out" ? "tag-sold" : "tag-sale";
      box.insertAdjacentHTML("beforeend",
        '<div class="card hover center date-box">' +
          '<div class="month">' + month + '</div>' +
          '<div class="day">' + d.getDate() + '</div>' +
          '<h3>' + show.city + '</h3>' +
          '<p class="muted small">' + show.venue + '</p>' +
          '<span class="tag ' + tag + '">' + show.status + '</span>' +
        '</div>');
    });
  }
});

// Small helper used by the CRUD page
function showToast(message) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(function () { t.classList.remove("show"); }, 2200);
}
