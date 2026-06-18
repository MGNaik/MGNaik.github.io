/* SETPOINT — lightweight client-side search. No dependencies.
   Fetches /search.json and filters on title + tags + excerpt. */
(function () {
  var input = document.getElementById("search-input");
  var results = document.getElementById("results");
  var status = document.getElementById("search-status");
  if (!input || !results) return;

  var docs = [];
  var ready = false;

  fetch("/search.json")
    .then(function (r) { return r.json(); })
    .then(function (data) { docs = data; ready = true; run(input.value); })
    .catch(function () { status.textContent = "Search index failed to load."; });

  function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function card(d) {
    var tags = (d.tags || "").split(" ").filter(Boolean).slice(0, 3)
      .map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    return '<article class="card"><a class="card__link" href="' + d.url + '">' +
      '<div class="card__meta">' + esc(d.date) + ' <span class="dotsep">·</span> ' + esc(d.readtime) + "</div>" +
      '<h3 class="card__title">' + esc(d.title) + "</h3>" +
      '<p class="card__excerpt">' + esc(d.excerpt) + "</p></a>" +
      (tags ? '<div class="tags">' + tags + "</div>" : "") + "</article>";
  }

  function run(q) {
    if (!ready) return;
    q = (q || "").trim().toLowerCase();
    if (!q) {
      results.innerHTML = "";
      status.textContent = "Type to search " + docs.length + " posts.";
      return;
    }
    var terms = q.split(/\s+/);
    var hits = docs.filter(function (d) {
      var hay = (d.title + " " + d.tags + " " + d.excerpt).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
    status.textContent = hits.length + (hits.length === 1 ? " result" : " results") + ' for "' + q + '"';
    results.innerHTML = hits.map(card).join("");
  }

  input.addEventListener("input", function () { run(input.value); });
})();
