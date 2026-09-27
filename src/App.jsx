import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Header } from "./components/Layout";
import { AboutPage } from "./pages/About";
import { EventsPage } from "./pages/Events";
import { FamiliesPage } from "./pages/Families";
import { HomePage } from "./pages/Home";
import { IncubatorsPage } from "./pages/Incubators";
import { NotFoundPage } from "./pages/NotFound";

function useDisplayedLocation() {
  const location = useLocation();
  const current = useRef(location);
  const [rendered, setRendered] = useState(location);

  useEffect(() => {
    if (location.key === current.current.key) return;

    const next = location;
    let cancelled = false;

    const update = () => {
      if (cancelled) return;
      current.current = next;
      setRendered(next);
      window.scrollTo(0, 0);
    };

    const frame = window.setTimeout(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || typeof document.startViewTransition !== "function") {
        update();
        return;
      }

      try {
        document.startViewTransition(() => {
          flushSync(update);
        });
      } catch {
        update();
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(frame);
    };
  }, [location]);

  return rendered;
}

export default function App() {
  const location = useDisplayedLocation();

  return (
    <>
      <Header />
      <div className="page-shell">
        <main>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/incubators" element={<IncubatorsPage />} />
            <Route path="/families" element={<FamiliesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
