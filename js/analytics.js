/**
 * Charts for analytics.html, using the data in data.js.
 * Author: Praveena Vemula
 */
document.addEventListener("DOMContentLoaded", function () {
  var ACCENT = "#ec4899";
  var GOLD = "#22d3ee";
  var MUTED = "#b3a6cc";
  var GRID = "rgba(255,255,255,0.08)";

  Chart.defaults.color = MUTED;
  Chart.defaults.font.family = '"Segoe UI", system-ui, Roboto, Arial, sans-serif';
  Chart.defaults.plugins.legend.labels.boxWidth = 12;

  function fmt(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return Math.round(n / 1e3) + "K";
    return n;
  }

  // ---------- summary numbers ----------
  var v = MONTHLY_STREAMS.values;
  var totalSold = TOUR_DATES.reduce(function (t, s) { return t + s.sold; }, 0);
  var selling = TOUR_DATES.filter(function (s) { return s.sold > 0; });
  var avgFill = selling.reduce(function (t, s) { return t + s.sold / s.capacity; }, 0) / selling.length;
  document.getElementById("kpi-month").textContent = fmt(v[v.length - 1]);
  document.getElementById("kpi-growth").textContent = "+" + Math.round((v[v.length - 1] / v[0] - 1) * 100) + "%";
  document.getElementById("kpi-tickets").textContent = totalSold.toLocaleString();
  document.getElementById("kpi-fill").textContent = Math.round(avgFill * 100) + "%";

  var axis = { grid: { color: GRID }, border: { display: false } };
  var noGrid = { grid: { display: false }, border: { display: false } };

  // 1. Line chart: monthly streams
  new Chart(document.getElementById("streamsChart"), {
    type: "line",
    data: {
      labels: MONTHLY_STREAMS.labels,
      datasets: [{
        label: "Streams", data: v,
        borderColor: ACCENT, backgroundColor: "rgba(236,72,153,0.18)",
        fill: true, tension: 0.35, pointRadius: 4, pointBackgroundColor: ACCENT,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: function (c) { return " " + c.parsed.y.toLocaleString() + " streams"; } } },
      },
      scales: { x: noGrid, y: Object.assign({}, axis, { ticks: { callback: fmt } }) },
    },
  });

  // 2. Doughnut chart: listeners by region
  new Chart(document.getElementById("regionChart"), {
    type: "doughnut",
    data: {
      labels: LISTENERS_BY_REGION.labels,
      datasets: [{
        data: LISTENERS_BY_REGION.values,
        backgroundColor: [ACCENT, "#a855f7", GOLD, "#f59e0b", "#6366f1", "#4b3a6b"],
        borderColor: "#150c25", borderWidth: 3,
      }],
    },
    options: {
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: { position: "bottom" },
        tooltip: { callbacks: { label: function (c) { return " " + c.label + ": " + c.parsed + "%"; } } },
      },
    },
  });

  // 3. Horizontal bar chart: top songs
  new Chart(document.getElementById("songsChart"), {
    type: "bar",
    data: {
      labels: TOP_SONGS.map(function (s) { return s.title; }),
      datasets: [{ label: "Plays", data: TOP_SONGS.map(function (s) { return s.plays; }), backgroundColor: GOLD, borderRadius: 6 }],
    },
    options: {
      indexAxis: "y",
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          title: function (c) { return c[0].label + " (" + TOP_SONGS[c[0].dataIndex].album + ")"; },
          label: function (c) { return " " + c.parsed.x.toLocaleString() + " plays"; },
        } },
      },
      scales: { x: Object.assign({}, axis, { ticks: { callback: fmt } }), y: noGrid },
    },
  });

  // 4. Grouped bar chart: tickets sold vs capacity
  new Chart(document.getElementById("ticketsChart"), {
    type: "bar",
    data: {
      labels: TOUR_DATES.map(function (s) { return s.city.split(",")[0]; }),
      datasets: [
        { label: "Sold", data: TOUR_DATES.map(function (s) { return s.sold; }), backgroundColor: ACCENT, borderRadius: 6 },
        { label: "Capacity", data: TOUR_DATES.map(function (s) { return s.capacity; }), backgroundColor: "#3b2a5c", borderRadius: 6 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      scales: { x: noGrid, y: axis },
    },
  });
});
