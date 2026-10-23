import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "./data/content.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Work from "./components/Work.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Team from "./components/Team.jsx";
import Engage from "./components/Engage.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

// Routes: "#/work/<slug>" is a case study. Anything else is the home page,
// where "#work", "#contact" and so on are plain in-page anchors.
function parse() {
  const m = window.location.hash.match(/^#\/work\/([\w-]+)/);
  return m ? { page: "case", slug: m[1] } : { page: "home" };
}

export default function App() {
  const [route, setRoute] = useState(parse);
  const [intent, setIntent] = useState(null);
  const pendingScroll = useRef(null);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    if (pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      return;
    }
    if (route.page === "case") {
      window.scrollTo(0, 0);
      return;
    }
    const id = window.location.hash.replace("#", "");
    if (id && !id.startsWith("/")) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [route]);

  function inquire(project) {
    setIntent({ slug: project.slug, name: project.name, category: project.category });
    pendingScroll.current = "contact";
    window.location.hash = "#/";
  }

  const project = route.page === "case" ? PROJECTS.find((p) => p.slug === route.slug) : null;

  return (
    <>
      <Nav />
      {route.page === "case" ? (
        <CaseStudy project={project} onInquire={inquire} />
      ) : (
        <main>
          <Hero />
          <Marquee />
          <Work />
          <Services />
          <Process />
          <Team />
          <Engage />
        </main>
      )}
      <Contact intent={intent} />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
