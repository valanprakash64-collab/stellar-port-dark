/**
 * ============================================================
 *  EDIT THIS FILE TO PERSONALIZE THE PORTFOLIO
 *  Every value below is a placeholder — replace the [BRACKETED]
 *  text with your own details. Nothing else needs to change.
 * ============================================================
 */

export const profile = {
  name: "[YOUR NAME]",
  tagline: "[YOUR TAGLINE]",
  role: "[YOUR ROLE / TITLE]",
  location: "[YOUR LOCATION]",
  availability: "[YOUR AVAILABILITY — e.g. Open to opportunities]",
  resumeUrl: "[YOUR RESUME LINK]",
  email: "[YOUR EMAIL]",
  phone: "[YOUR PHONE]",
  github: "[YOUR GITHUB]",
  linkedin: "[YOUR LINKEDIN]",
  extraLink: { label: "[YOUR OTHER LINK LABEL]", url: "[YOUR OTHER LINK]" },
};

/** About Me — keep this to roughly 4–5 lines. */
export const about = {
  paragraph:
    "[YOUR ABOUT ME — 4 to 5 lines. Describe who you are, what you build, and what drives you.] " +
    "I enjoy turning complex problems into clean, reliable software and I care deeply about detail, " +
    "performance and the experience of the people using what I build. My technical interests sit around " +
    "[YOUR TECHNICAL INTERESTS], and I learn fastest by shipping real projects end to end. " +
    "My goal is to grow into [YOUR CAREER GOAL] while working with teams that value craft and curiosity.",
  highlights: [
    { label: "Experience", value: "[X]+ yrs" },
    { label: "Projects shipped", value: "[X]+" },
    { label: "Core focus", value: "[YOUR FOCUS]" },
    { label: "Currently", value: "[YOUR CURRENT STATUS]" },
  ],
};

export const skillGroups = [
  {
    title: "Strongest areas",
    featured: true,
    skills: [
      { name: "[YOUR TOP SKILL]", level: 92 },
      { name: "[YOUR SKILL 2]", level: 88 },
      { name: "[YOUR SKILL 3]", level: 84 },
    ],
  },
  {
    title: "Languages & frameworks",
    skills: [
      { name: "[YOUR SKILL 4]", level: 80 },
      { name: "[YOUR SKILL 5]", level: 76 },
      { name: "[YOUR SKILL 6]", level: 70 },
    ],
  },
  {
    title: "Tools & platforms",
    skills: [
      { name: "[YOUR SKILL 7]", level: 74 },
      { name: "[YOUR SKILL 8]", level: 68 },
      { name: "[YOUR SKILL 9]", level: 62 },
    ],
  },
];

export const softSkills = [
  "[YOUR PROFESSIONAL SKILL 1]",
  "[YOUR PROFESSIONAL SKILL 2]",
  "[YOUR PROFESSIONAL SKILL 3]",
  "[YOUR PROFESSIONAL SKILL 4]",
  "[YOUR PROFESSIONAL SKILL 5]",
  "[YOUR PROFESSIONAL SKILL 6]",
];

export const education = [
  {
    degree: "[YOUR DEGREE]",
    institution: "[YOUR COLLEGE]",
    duration: "[YEAR – YEAR]",
    detail: "[RELEVANT INFORMATION — specialization, CGPA/percentage, coursework, honours]",
  },
  {
    degree: "[YOUR HIGHER SECONDARY / DIPLOMA]",
    institution: "[YOUR SCHOOL / INSTITUTE]",
    duration: "[YEAR – YEAR]",
    detail: "[RELEVANT INFORMATION — stream, score, achievements]",
  },
  {
    degree: "[YOUR CERTIFICATION]",
    institution: "[ISSUING ORGANISATION]",
    duration: "[YEAR]",
    detail: "[RELEVANT INFORMATION — what the certification covered]",
  },
];

export const experience = [
  {
    role: "[YOUR ROLE — e.g. Software Engineering Intern]",
    company: "[COMPANY NAME]",
    duration: "[MONTH YEAR – MONTH YEAR]",
    type: "Internship",
    responsibilities: [
      "[RESPONSIBILITY 1 — what you owned day to day]",
      "[RESPONSIBILITY 2 — tech you worked with]",
    ],
    achievements: ["[ACHIEVEMENT — a measurable result, e.g. cut load time by 40%]"],
    stack: ["[TECH]", "[TECH]", "[TECH]"],
  },
  {
    role: "[YOUR TECHNICAL ROLE]",
    company: "[COMPANY / ORGANISATION]",
    duration: "[MONTH YEAR – MONTH YEAR]",
    type: "Work experience",
    responsibilities: [
      "[RESPONSIBILITY 1]",
      "[RESPONSIBILITY 2]",
    ],
    achievements: ["[ACHIEVEMENT — recognition, ownership, impact]"],
    stack: ["[TECH]", "[TECH]"],
  },
  {
    role: "[YOUR ROLE — e.g. Technical Team Lead, Club]",
    company: "[ORGANISATION]",
    duration: "[YEAR – YEAR]",
    type: "Technical role",
    responsibilities: ["[RESPONSIBILITY 1]", "[RESPONSIBILITY 2]"],
    achievements: ["[ACHIEVEMENT]"],
    stack: ["[TECH]", "[TECH]"],
  },
];

export const projects = [
  {
    title: "[YOUR PROJECT 1]",
    description: "[SHORT DESCRIPTION — the problem it solves in one or two sentences.]",
    tech: ["[TECH]", "[TECH]", "[TECH]"],
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]", "[KEY FEATURE 3]"],
    link: "[YOUR PROJECT LINK]",
    repo: "[YOUR GITHUB REPO LINK]",
    kind: "Personal",
  },
  {
    title: "[YOUR PROJECT 2]",
    description: "[SHORT DESCRIPTION]",
    tech: ["[TECH]", "[TECH]"],
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]"],
    link: "[YOUR PROJECT LINK]",
    repo: "[YOUR GITHUB REPO LINK]",
    kind: "Academic",
  },
  {
    title: "[YOUR PROJECT 3]",
    description: "[SHORT DESCRIPTION]",
    tech: ["[TECH]", "[TECH]", "[TECH]"],
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]"],
    link: "[YOUR PROJECT LINK]",
    repo: "[YOUR GITHUB REPO LINK]",
    kind: "Technical",
  },
  {
    title: "[YOUR PROJECT 4]",
    description: "[SHORT DESCRIPTION]",
    tech: ["[TECH]", "[TECH]"],
    features: ["[KEY FEATURE 1]", "[KEY FEATURE 2]"],
    link: "[YOUR PROJECT LINK]",
    repo: "[YOUR GITHUB REPO LINK]",
    kind: "Personal",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
