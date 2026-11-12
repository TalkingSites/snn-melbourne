// Click a question for its ribs, a rib for its session. One sidebar, with a back step,
// and the question you're in stays highlighted on the map.
(function () {
  var side = document.querySelector(".side");
  if (!side) return;
  var body = side.querySelector(".side__body");
  var back = side.querySelector(".side__back");
  var lastFocus = null;

  function mark(id) {
    document.querySelectorAll(".map .is-active").forEach(function (el) { el.classList.remove("is-active"); });
    var el = id && document.querySelector('.map [data-open="' + id + '"]');
    if (el) el.classList.add("is-active");
  }
  function show(id) {
    var view = document.getElementById("v-" + id);
    if (!view) return;
    if (side.hidden) lastFocus = document.activeElement;
    body.innerHTML = view.innerHTML;
    var to = view.getAttribute("data-back");
    back.hidden = !to;
    if (to) {
      back.textContent = document.getElementById("v-" + to).getAttribute("data-label");
      back.onclick = function () { show(to); };
    }
    mark(to || id);
    side.hidden = false;
    body.scrollTop = 0;
    body.focus({ preventScroll: true });
    try { history.replaceState(null, "", "#" + id); } catch (e) {}
  }
  function close() {
    side.hidden = true;
    mark(null);
    try { history.replaceState(null, "", location.pathname); } catch (e) {}
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open]");
    if (t) {
      var id = t.getAttribute("data-open");
      // clicking the open question again closes it
      if (!side.hidden && t.closest(".map") && t.classList.contains("is-active") && location.hash === "#" + id) close();
      else show(id);
      return;
    }
    if (e.target.closest(".side__close")) close();
    else if (!side.hidden && !e.target.closest(".side") && !e.target.closest(".map")) close();
  });
  document.addEventListener("keydown", function (e) { if (!side.hidden && e.key === "Escape") close(); });
  if (location.hash) show(decodeURIComponent(location.hash.slice(1)));
})();

// On the day itself, mark what's on now (Melbourne time) and fade what's finished.
(function () {
  var day = document.querySelector(".day");
  if (!day || !day.dataset.date) return;
  function tick() {
    var parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    var today = get("year") + "-" + get("month") + "-" + get("day");
    var now = get("hour") + ":" + get("minute");
    document.querySelectorAll(".now-tag").forEach(function (t) { t.remove(); });
    document.querySelectorAll("[data-from]").forEach(function (el) {
      var on = today === day.dataset.date && now >= el.dataset.from && now < el.dataset.to;
      var past = today === day.dataset.date && now >= el.dataset.to;
      el.classList.toggle("is-now", on);
      el.classList.toggle("is-past", past && !on);
      if (on) {
        var tag = document.createElement("span");
        tag.className = "now-tag";
        tag.textContent = "On now";
        (el.classList.contains("round") ? el.querySelector(".mid") : el).appendChild(tag);
      }
    });
  }
  tick();
  setInterval(tick, 60000);
})();
