/**
 * Create, read, update and delete tour dates.
 * Author: Praveena Vemula
 */
document.addEventListener("DOMContentLoaded", function () {
  var shows = TOUR_DATES.map(function (s) { return Object.assign({}, s); });
  var nextId = shows.length + 1;

  var form = document.getElementById("tour-form");
  var tbody = document.getElementById("tour-table");
  var search = document.getElementById("search");
  var formTitle = document.getElementById("form-title");
  var submitBtn = document.getElementById("submit-btn");
  var cancelBtn = document.getElementById("cancel-btn");
  var fields = ["date", "city", "venue", "capacity", "sold", "status"];
  var el = {};
  fields.concat(["tour-id"]).forEach(function (f) { el[f] = document.getElementById(f); });

  var TAGS = { "On Sale": "tag-sale", "Sold Out": "tag-sold", "Announced": "tag-announced", "Cancelled": "tag-cancelled" };

  function safe(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function niceDate(iso) {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  // READ: draw the table
  function render() {
    var q = search.value.trim().toLowerCase();
    var list = shows
      .filter(function (s) { return !q || s.city.toLowerCase().indexOf(q) > -1 || s.venue.toLowerCase().indexOf(q) > -1; })
      .sort(function (a, b) { return a.date.localeCompare(b.date); });

    tbody.innerHTML = list.map(function (s) {
      var pct = Math.round((s.sold / s.capacity) * 100);
      return "<tr>" +
        "<td>" + niceDate(s.date) + "</td>" +
        "<td>" + safe(s.city) + "</td>" +
        "<td>" + safe(s.venue) + "</td>" +
        "<td>" + s.sold + " / " + s.capacity + " <span class='muted small'>(" + pct + "%)</span></td>" +
        "<td><span class='tag " + TAGS[s.status] + "'>" + s.status + "</span></td>" +
        "<td class='actions'>" +
          "<button class='btn btn-ghost btn-sm' data-edit='" + s.id + "'>Edit</button>" +
          "<button class='btn btn-danger btn-sm' data-delete='" + s.id + "'>Delete</button>" +
        "</td></tr>";
    }).join("");

    document.getElementById("count").textContent = shows.length;
    document.getElementById("empty-msg").classList.toggle("hidden", list.length > 0);
  }

  function setError(name, bad) {
    el[name].parentElement.classList.toggle("invalid", bad);
    return bad;
  }

  function validate() {
    var cap = Number(el.capacity.value);
    var sold = el.sold.value === "" ? NaN : Number(el.sold.value);
    var errors = [
      setError("date", !el.date.value),
      setError("city", !el.city.value.trim()),
      setError("venue", !el.venue.value.trim()),
      setError("capacity", !(cap > 0)),
      setError("sold", isNaN(sold) || sold < 0 || sold > cap),
    ];
    return errors.indexOf(true) === -1;
  }

  function resetForm() {
    form.reset();
    document.querySelectorAll(".field.invalid").forEach(function (f) { f.classList.remove("invalid"); });
    el["tour-id"].value = "";
    el.status.value = "On Sale";
    formTitle.textContent = "Add a Show";
    submitBtn.textContent = "Add Show";
    cancelBtn.classList.add("hidden");
  }

  // CREATE and UPDATE
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;

    var data = {
      date: el.date.value,
      city: el.city.value.trim(),
      venue: el.venue.value.trim(),
      capacity: Number(el.capacity.value),
      sold: Number(el.sold.value),
      status: el.status.value,
    };

    var id = Number(el["tour-id"].value);
    if (id) {
      Object.assign(shows.find(function (s) { return s.id === id; }), data);
      showToast("Updated the show in " + data.city + ".");
    } else {
      data.id = nextId++;
      shows.push(data);
      showToast("Added a show in " + data.city + ".");
    }
    resetForm();
    render();
  });

  cancelBtn.addEventListener("click", resetForm);
  search.addEventListener("input", render);

  tbody.addEventListener("click", function (e) {
    var editId = e.target.getAttribute("data-edit");
    var deleteId = e.target.getAttribute("data-delete");

    // Load a show into the form for editing
    if (editId) {
      var s = shows.find(function (x) { return x.id === Number(editId); });
      fields.forEach(function (f) { el[f].value = s[f]; });
      el["tour-id"].value = s.id;
      formTitle.textContent = "Edit Show";
      submitBtn.textContent = "Save Changes";
      cancelBtn.classList.remove("hidden");
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      el.date.focus();
    }

    // DELETE
    if (deleteId) {
      var d = shows.find(function (x) { return x.id === Number(deleteId); });
      if (confirm("Delete the " + d.city + " show at " + d.venue + "?")) {
        shows = shows.filter(function (x) { return x.id !== d.id; });
        if (Number(el["tour-id"].value) === d.id) resetForm();
        showToast("Deleted the show in " + d.city + ".");
        render();
      }
    }
  });

  render();
});
