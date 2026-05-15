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
 *
 * Downloads tip:
 *   - Add a `downloads` array to attach downloadable files to a project.
 *   - For files stored in this repo (e.g. the `files/` folder), use `file`:
 *       downloads: [
 *         { label: "Download CAD File", file: "files/my-model.step" },
 *         { label: "Download PDF",      file: "files/report.pdf"    },
 *       ]
 *   - For files hosted externally (Google Drive, Dropbox, etc.), use `url`:
 *       downloads: [
 *         { label: "Download from Drive", url: "https://drive.google.com/..." },
 *       ]
 *   - Omit `downloads` entirely if there are no files to offer.
 *
 * Status tip:
 *   - Add  status: "ongoing"   for a green "Ongoing" pill
 *   - Add  status: "complete"  for a blue "Complete" pill
 *   - Omit the field entirely to show no status pill
 * ============================================================ */

window.SITE = {
  // Shown in the top hero banner on the home page
  hero: {
    name: "Parker McClain",
    tagline: "A Collection of my Projects",
    // Optional: id of a featured project to link the hero CTA to
    featuredProjectId: "portfolio-site",
    // Optional: path to your resume file for the download button on the home page
    // Drop the file in the files/ folder and update the path below
    resumeFile: "files/resume.pdf",
    resumeLabel: "Download Resume", // change the button text here
  },
};

window.PROJECTS = {

  "Lyla": {
    title: "Lyla Biosciences",
    tagline: "Insights for people with T1D",
    thumbnail: "images/Lyla.png", // leave blank to auto-generate a placeholder
    accent: "#66c9e2",
    status: "ongoing",
    year: 2026,
    tech: [],
    description:
      "Lyla Biosciences uses glucose, insulin, activity, and sleep data to provide people managing T1D with more tools to manage their glucose. Lyla is currently in the beta testing phase and is live on TestFlight.",
    links: {
      live: { url: "https://lylabiosciences.com", label: "Lyla Website" },
    },
    
  },
   "MoDrp": {
    title: "MoDrp",
    tagline: "IOS App that rates your Drip",
    thumbnail: "", // leave blank to auto-generate a placeholder
    accent: "#4d52b1",
    status: "complete",
    year: 2026,
    tech: ["Swift", "App Store Connect"],
    description:
      "MoDrp is an App I created that rates your outfit and gives tips for improvement. It was originally started as a way for me to familiarize myself with app store connect before launching Lyla but my friends liked it and I decided to publish it for real.",
    links: {
      live: { url: "https://apps.apple.com/us/app/modrp/id6759079112", label: "MoDrp Download" },
    },
    
  },
   "Gurus": {
    title: "Garbage Gurus",
    tagline: "Junk removal business",
    thumbnail: "", // leave blank to auto-generate a placeholder
    accent: "#d68a27",
    status: "complete",
    year: 2022,
    tech: ["Marketing", "Customer Relationships"],
    description:
      "Garbage Gurus was a junk hauling business I started in high school. We would drive around the city and pick up old things people wanted to get rid of using a trailer my friend and I bought.",
    links: {
    },
    
  },
  "Deuce": {
    title: "The Deuce",
    tagline: "College Band",
    thumbnail: "images/Deuce.JPG", // leave blank to auto-generate a placeholder
    accent: "#267e23",
    status: "ongoing",
    year: 2024,
    tech: [],
    description:
      "The Deuce is a band I manage with my roommate. We usually play around campus but we've also had the opportunity to open for Dayglow and Ravyn Lenae.",
    links: { 
      live: {url: "https://www.instagram.com/the_.deuce/", label: "Deuce Instagram"}
    },
    
  },
  "AIGrading": {
    title: "AI Grading Performance on AP Exams",
    tagline: "Research Paper",
    thumbnail: "", // leave blank to auto-generate a placeholder
    accent: "#58c7cf",
    status: "ongoing",
    year: 2026,
    tech: ["Latex"],
    description:
      "This paper was originally written as a final project for a class but the findings were interesting so I decided to continue with it. The paper examines the effectiveness of AI graders as well as potential areas for improvement.",
    links: { 
    },
    downloads: [
    { label: "Download Manuscript", file: "files/AIGrading.pdf" },
     ]
    
  },

};

window.SECTIONS = [
  {
    id: "featured",
    title: "Featured",
    projectIds: ["Lyla", "Deuce"],
  },
  {
    id: "Startups",
    title: "Startups",
    projectIds: ["Lyla", "Gurus"],
  },
  {
    id: "Papers",
    title: "Papers",
    projectIds: ["AIGrading"],
  },
  {
    id: "Apps",
    title: "Apps",
    projectIds: ["Lyla","MoDrp"],
  },
  {
    id: "Music",
    title: "Music",
    projectIds: ["Deuce"],
  },
];
