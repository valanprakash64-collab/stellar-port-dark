import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground, CursorGlow } from "@/components/portfolio/ambient";
import { profile } from "@/components/portfolio/data";
import { Hero } from "@/components/portfolio/hero";
import { NavBar } from "@/components/portfolio/nav";
import {
  AboutAndSkills,
  Contact,
  Education,
  Experience,
  Footer,
  Projects,
} from "@/components/portfolio/sections";

const title = `${profile.name} — ${profile.role} Portfolio`;
const description =
  "Personal portfolio: about, skills, education, experience, projects and contact details.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          description,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <CursorGlow />
      <NavBar />
      <main>
        <Hero />
        <AboutAndSkills />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
