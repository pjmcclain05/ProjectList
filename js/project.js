/* Renders the project detail page based on the ?id= URL parameter */
(function () {
  "use strict";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (attrs[k] != null) node.setAttribute(k, attrs[k]);
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

  function bannerBackground(project) {
    if (project.thumbnail) {
      return "url('" + project.thumbnail + "') center/cover no-repeat, " +
        (project.accent || "#333");
    }
    var c = project.accent || "#444";
    return "linear-gradient(135deg, " + c + " 0%, " +
      shade(c, -45) + " 100%)";
  }

  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function renderNotFound(root, id) {
    root.innerHTML = "";
    root.appendChild(
      el("div", { class: "not-found" }, [
        el("h1", { text: "Project not found" }),
        el("p", {
          text: id
            ? "No project with id \"" + id + "\" exists."
            : "No project id was specified.",
        }),
        el("a", {
          class: "btn btn-primary",
          href: "index.html",
          text: "Back to projects",
        }),
      ])
    );
  }

  function renderProject(root, id, project) {
    document.title = project.title + " — Projects";

    var banner = el("div", {
      class: "project-banner",
      style: "background:" + bannerBackground(project),
      text: project.thumbnail ? "" : initials(project.title),
    });

    var meta = el("div", { class: "project-meta" });
    if (project.status === "ongoing") {
      meta.appendChild(el("span", { class: "pill-ongoing", text: "Ongoing" }));
    } else if (project.status === "complete") {
      meta.appendChild(el("span", { class: "pill-complete", text: "Complete" }));
    }
    if (project.year) {
      meta.appendChild(el("span", { class: "pill", text: String(project.year) }));
    }
    (project.tech || []).forEach(function (t) {
      meta.appendChild(el("span", { class: "pill", text: t }));
    });

    var links = el("div", { class: "project-links" });
    var hasLinks = false;
    // Default labels for each link key. Override per-project by using an
    // object instead of a plain string:
    //   github: { url: "https://...", label: "My Custom Label" }
    // The first key listed will be styled as the primary (red) button.
    var defaultLabels = {
      live:   { label: "View Live",          primary: true  },
      github: { label: "Source on GitHub",   primary: false },
      demo:   { label: "Demo",               primary: false },
      docs:   { label: "Docs",               primary: false },
    };
    var projectLinks = project.links || {};
    // Render in definition order, with known keys first then any extras
    var allKeys = Object.keys(defaultLabels).concat(
      Object.keys(projectLinks).filter(function (k) {
        return !defaultLabels[k];
      })
    );
    allKeys.forEach(function (key, idx) {
      var val = projectLinks[key];
      if (!val) return;
      var url   = typeof val === "object" ? val.url   : val;
      var label = typeof val === "object" && val.label
        ? val.label
        : (defaultLabels[key] ? defaultLabels[key].label : key);
      var primary = idx === 0;
      if (!url) return;
      hasLinks = true;
      links.appendChild(
        el("a", {
          class: "btn " + (primary ? "btn-primary" : "btn-secondary"),
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          text: label,
        })
      );
    });

    root.innerHTML = "";
    root.appendChild(banner);
    root.appendChild(el("h1", { class: "project-title", text: project.title }));
    if (project.tagline) {
      root.appendChild(
        el("p", { class: "project-tagline", text: project.tagline })
      );
    }
    if (meta.children.length) root.appendChild(meta);
    root.appendChild(
      el("p", {
        class: "project-description",
        text: project.description || "",
      })
    );
    if (hasLinks) root.appendChild(links);

    var downloadList = project.downloads || [];
    if (downloadList.length) {
      var dlSection = el("div", { class: "project-downloads" });
      dlSection.appendChild(el("h3", { class: "downloads-title", text: "Downloads" }));
      var dlButtons = el("div", { class: "project-links" });
      downloadList.forEach(function (item) {
        if (!item.file && !item.url) return;
        var href = item.file || item.url;
        var isExternal = !item.file;
        var attrs = {
          class: "btn btn-download",
          href: href,
          text: item.label || "Download",
        };
        if (item.file) {
          attrs.download = "";
        } else {
          attrs.target = "_blank";
          attrs.rel = "noopener noreferrer";
        }
        dlButtons.appendChild(el("a", attrs));
      });
      dlSection.appendChild(dlButtons);
      root.appendChild(dlSection);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("project-root");
    var id = getParam("id");
    var project = id && window.PROJECTS ? window.PROJECTS[id] : null;
    if (!project) {
      renderNotFound(root, id);
      return;
    }
    renderProject(root, id, project);
  });
})();
