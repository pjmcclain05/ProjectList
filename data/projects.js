/* ============================================================
 * PROJECTS DATA
 * ------------------------------------------------------------
 * This is the ONLY file you need to edit to add / remove / move
 * projects and sections on the home page.
 *
 *   1. Add a new project:   add an entry to PROJECTS below.
 *   2. Add a new section:   add an entry to SECTIONS and list
 *                           the project ids you want in it.
 *   3. Reorder a row:       reorder ids in `projectIds`.
 *   4. Reorder sections:    reorder entries in SECTIONS.
 *
 * A project can appear in multiple sections — just list its id
 * in each section's `projectIds`.
 *
 * Thumbnail tips:
 *   - Drop an image in the `images/` folder and use a relative
 *     path like `images/my-project.jpg`.
 *   - Or omit `thumbnail` and a colored gradient placeholder
 *     using the project title's initials will be generated.
 *
 * Link button tips:
 *   - Use a plain string for the default label:
 *       github: "https://github.com/you/repo"
 *   - Use an object to set a custom button label:
 *       live: { url: "https://...", label: "Download on TestFlight" }
 *   - Supported keys (first one listed becomes the primary red button):
 *       live, github, demo, docs
 *   - You can also add any arbitrary key with an object and a label:
 *       appstore: { url: "https://...", label: "App Store" }
 * ============================================================ */

window.SITE = {
  // Shown in the top hero banner on the home page
  hero: {
    name: "Parker McClain",
    tagline: "A Collection of my Projects",
    // Optional: id of a featured project to link the hero CTA to
    featuredProjectId: "portfolio-site",
  },
};

window.PROJECTS = {

  "Lyla": {
    title: "Lyla Biosciences",
    tagline: "Insights for people with T1D",
    thumbnail: "images/Lyla.png", // leave blank to auto-generate a placeholder
    accent: "#66c9e2",
    year: 2026,
    tech: [],
    description:
      "Lyla Biosciences uses glucose, insulin, activity, and sleep data to provide people managing T1D with more tools to manage their glucose. Lyla is curently in the beta testing phase and is live on testflight.",
    links: {
      live: { url: "https://lylabiosciences.com", label: "Lyla Website" },
    },
    
  },


  
};

window.SECTIONS = [
  {
    id: "featured",
    title: "Featured",
    projectIds: ["Lyla"],
  },
  {
    id: "Startups",
    title: "Startups",
    projectIds: ["Lyla"],
  },
  {
    id: "Papers",
    title: "Papers",
    projectIds: ["shader-playground", "generative-art", "card-game-ai"],
  },
];
