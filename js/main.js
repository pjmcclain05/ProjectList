/* Renders the home page from window.SITE / window.PROJECTS / window.SECTIONS */
(function () {
  "use strict";

  /* ---------- helpers shared with project.js ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") {
          node.addEventListener(k.slice(2), attrs[k]);
        } else if (attrs[k] != null) {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function initials(title) {
    return title
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w[0].toUpperCase(); })
      .join("");
  }

  // Build a CSS background for a card. If the project has a thumbnail
  // image, use it; otherwise generate a colored gradient placeholder.
  function thumbBackground(project) {
    if (project.thumbnail) {
      return "url('" + project.thumbnail + "') center/cover no-repeat, " +
        (project.accent || "#333");
    }
    var c = project.accent || "#444";
    return "linear-gradient(135deg, " + c + " 0%, " +
      shade(c, -35) + " 100%)";
  }

  // Lighten/darken a hex color by `percent` (-100..100). Falls back to input.
  function shade(hex, percent) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    if (!m) return hex;
    var r = parseInt(m[1], 16),
        g = parseInt(m[2], 16),
        b = parseInt(m[3], 16);
    var t = percent < 0 ? 0 : 255;
    var p = Math.abs(percent) / 100;
    function mix(c) { return Math.round((t - c) * p) + c; }
    function hx(n) { return ("0" + n.toString(16)).slice(-2); }
    return "#" + hx(mix(r)) + hx(mix(g)) + hx(mix(b));
  }

  /* ---------- rendering ---------- */
  function renderHero() {
    var site = window.SITE || {};
    var hero = site.hero || {};
    var titleEl = document.getElementById("hero-title");
    var tagEl = document.getElementById("hero-tagline");
    var ctaEl = document.getElementById("hero-cta");
    var footerName = document.getElementById("footer-name");

    titleEl.textContent = hero.name || "My Projects";
    tagEl.textContent = hero.tagline || "";
    footerName.textContent =
      "© " + new Date().getFullYear() + " " + (hero.name || "");

    if (hero.featuredProjectId && window.PROJECTS[hero.featuredProjectId]) {
      ctaEl.href = "project.html?id=" +
        encodeURIComponent(hero.featuredProjectId);
      ctaEl.textContent = "View Featured Project";
    } else {
      ctaEl.style.display = "none";
    }
  }

  function renderCard(projectId) {
    var project = window.PROJECTS[projectId];
    if (!project) {
      console.warn("Unknown project id:", projectId);
      return null;
    }

    var thumb = el("div", {
      class: "card-thumb",
      style: "background:" + thumbBackground(project),
      // Show initials only for placeholder (no thumbnail image)
      text: project.thumbnail ? "" : initials(project.title),
    });

    var overlay = el("div", { class: "card-overlay" }, [
      el("h3", { class: "card-title", text: project.title }),
      el("p", { class: "card-tagline", text: project.tagline || "" }),
    ]);

    return el(
      "a",
      {
        class: "card",
        href: "project.html?id=" + encodeURIComponent(projectId),
        "aria-label": project.title,
        tabindex: "0",
      },
      [thumb, overlay]
    );
  }

  function renderRow(section) {
    var scroller = el("div", { class: "row-scroller" });
    (section.projectIds || []).forEach(function (pid) {
      var card = renderCard(pid);
      if (card) scroller.appendChild(card);
    });

    function scrollBy(dir) {
      var amount = scroller.clientWidth * 0.85 * dir;
      scroller.scrollBy({ left: amount, behavior: "smooth" });
    }

    var leftBtn = el("button", {
      class: "scroll-btn left",
      "aria-label": "Scroll left",
      text: "‹",
      onclick: function () { scrollBy(-1); },
    });
    var rightBtn = el("button", {
      class: "scroll-btn right",
      "aria-label": "Scroll right",
      text: "›",
      onclick: function () { scrollBy(1); },
    });

    var wrap = el("div", { class: "row-scroller-wrap" }, [
      leftBtn, scroller, rightBtn,
    ]);

    return el(
      "section",
      { class: "row", id: "section-" + section.id },
      [el("h2", { class: "row-title", text: section.title }), wrap]
    );
  }

  function renderSections() {
    var root = document.getElementById("sections");
    (window.SECTIONS || []).forEach(function (section) {
      // Skip empty sections silently
      if (!section.projectIds || section.projectIds.length === 0) return;
      root.appendChild(renderRow(section));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHero();
    renderSections();
  });
})();
