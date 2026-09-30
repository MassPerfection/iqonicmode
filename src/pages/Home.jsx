import { useEffect, useRef, useState } from "react";
import {
  actionWords,
  images,
  incubators,
  waysIn,
  whoCanJoin,
} from "../content";
import { Button, Card, Eyebrow, Reveal, Section, SectionHeading, usePageMeta } from "../components/ui";

function EvolvingMark() {
  const sparks = Array.from({ length: 8 }, (_, index) => index * 45);

  return (
    <div className="mark">
      <div className="runway" aria-hidden="true">
        <span className="runway-floor" />
        <span className="runway-spot" />
      </div>
      <div className="mark-glow" />
      <div className="mark-burst" aria-hidden="true">
        {sparks.map((angle) => (
          <span key={angle} className="mark-spark" style={{ "--angle": `${angle}deg` }} />
        ))}
      </div>
      <div className="mark-ring mark-ring--outer" />
      <div className="mark-ring mark-ring--inner" />
      <div className="mark-gem" />
    </div>
  );
}

function HeroEntrance() {
  const sparks = Array.from({ length: 28 }, (_, index) => ({
    angle: index * (360 / 28),
    delay: 180 + (index % 7) * 90,
    distance: 160 + (index % 7) * 48,
  }));

  return (
    <div className="hero-copy">
      <div className="fireworks" aria-hidden="true">
        {sparks.map((spark) => (
          <span
            key={`${spark.angle}-${spark.delay}`}
            className="spark"
            style={{ "--angle": `${spark.angle}deg`, "--delay": `${spark.delay}ms`, "--distance": `${spark.distance}px` }}
          />
        ))}
      </div>
      <div className="hero-piece" style={{ animationDelay: "80ms" }}>
        <div className="flex justify-center">
          <Eyebrow>Calgary, Alberta — Nonprofit Society</Eyebrow>
        </div>
      </div>
      <h1 className="hero-piece hero-title mt-10 font-display text-hero">
        CONNECT.
        <br />
        SPEAK. WALK.
        <br />
        <span className="text-gilt">LEAD. INSPIRE.</span>
      </h1>
      <p className="hero-piece mt-10 max-w-xl text-paper/75" style={{ animationDelay: "620ms" }}>
        Creating opportunities for children, teens, adults, parents, families, entrepreneurs and community members to learn,
        participate, connect and grow.
      </p>
      <div className="hero-piece mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "860ms" }}>
        <Button to="/contact">Join IQ-Mode</Button>
        <Button to="/contact" tone="ghost">
          Get Involved
        </Button>
      </div>
      <p className="hero-piece mt-16 font-display text-heading text-paper/50 italic" style={{ animationDelay: "1080ms" }}>
        Don't just dream it. Mode it.
      </p>
    </div>
  );
}

function ActionWords() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const progress = Math.min(Math.max(-rect.top / span, 0), 0.9999);
      const next = Math.min(Math.floor(progress * actionWords.length), actionWords.length - 1);
      setIndex((current) => (current === next ? current : next));
      stageRef.current?.style.setProperty("--p", progress.toFixed(4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={ref} className="relative bg-ink text-paper" style={{ height: "500vh" }}>
      <div ref={stageRef} className="action-stage sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-12">
        <div className="scroll-cue" aria-hidden="true">
          <span className="scroll-cue-label">Scroll</span>
          <div className="scroll-cue-track">
            <div className="scroll-cue-fill" />
            <div className="scroll-cue-thumb" />
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-4">
              <span className="rule-gold" />
              <span className="eyebrow">The five action words</span>
            </div>
            <ol className="mt-10 space-y-4 md:space-y-5">
              {actionWords.map((item, itemIndex) => {
                const active = itemIndex === index;
                return (
                  <li
                    key={item.word}
                    className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ opacity: active ? 1 : 0.18 }}
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="text-micro tracking-[0.3em] text-gold tabular-nums">0{itemIndex + 1}</span>
                      <h2
                        className="font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-none transition-colors duration-700"
                        style={{ color: active ? "var(--color-gilt)" : "var(--color-paper)" }}
                      >
                        {item.word}
                      </h2>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ gridTemplateRows: active ? "1fr" : "0fr", opacity: active ? 1 : 0 }}
                    >
                      <p className="mt-2 ml-[3.1rem] max-w-md overflow-hidden text-paper/70">{item.line}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="pointer-events-none order-first h-[36vh] lg:order-last lg:h-[70vh]">
            <EvolvingMark />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  usePageMeta("ICONIQMode | Calgary Leadership & Modeling Incubator for Youth and Families");

  return (
    <>
      <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 pt-36 pb-24 text-center text-paper md:px-12">
        <img
          src={images.hero}
          alt=""
          width={1920}
          height={1080}
          className="hero-drift absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/45" />
        <HeroEntrance />
      </section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-7 text-title">
              More Than a Runway.
              <br />
              More Than a Program.
            </h2>
            <p className="mt-8 max-w-xl opacity-80">
              IQ-Mode is a leadership and modeling incubator creating opportunities for people of different ages and
              backgrounds to develop confidence, communication, leadership, creativity, entrepreneurial thinking and
              community connections.
            </p>
            <div className="mt-10">
              <Button to="/about" tone="ghost">
                About IQ-Mode
              </Button>
            </div>
          </Reveal>
          <Reveal delay={160} className="overflow-hidden">
            <img
              src={images.speaking}
              alt="A young person speaking with a microphone during a community workshop"
              width={1536}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section dark>
        <Reveal>
          <SectionHeading
            eyebrow="Our incubators"
            title="Four spaces to grow."
            lead="Each incubator is a place to practice something real — and every one of them opens into the community."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {incubators.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <Card dark className="h-full">
                <span className="text-micro tracking-[0.3em] text-gold tabular-nums">0{index + 1}</span>
                <h3 className="mt-5 font-display text-heading">{item.title}</h3>
                <p className="mt-4 text-paper/65">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={180}>
          <div className="mt-14">
            <Button to="/incubators" tone="ghost">
              Explore the incubators
            </Button>
          </div>
        </Reveal>
      </Section>

      <ActionWords />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <Reveal className="overflow-hidden">
            <img
              src={images.families}
              alt="A parent and teenager together at a community gathering"
              width={1536}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={160}>
            <Eyebrow>For families</Eyebrow>
            <h2 className="mt-7 text-title">IQ-Mode is for the family too.</h2>
            <p className="mt-8 opacity-80">When a child or teen participates, parents do not have to remain on the sidelines.</p>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
              {["Support", "Participate", "Learn", "Connect", "Volunteer", "Explore Entrepreneurship"].map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-micro tracking-[0.14em] uppercase">
                  <span className="h-px w-4 shrink-0 translate-y-[-0.2em] bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <blockquote className="mt-12 border-l border-gold pl-7 font-display text-heading leading-snug italic">
              A parent can support their child while also developing their own skills, building relationships, exploring
              entrepreneurship and becoming part of the community.
            </blockquote>
            <div className="mt-11">
              <Button to="/families" tone="ghost">
                For Families
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <Eyebrow>For entrepreneurs</Eyebrow>
            <h2 className="mt-7 text-title">Grow together.</h2>
            <p className="mt-8 max-w-xl text-paper/70">
              IQ-Mode welcomes entrepreneurs, business owners and professionals who want to connect with families, youth,
              community members and other businesses.
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                "Networking",
                "Partnerships",
                "Mentorship",
                "Sponsorship",
                "Vendor opportunities",
                "Community activities",
                "Collaborative projects",
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-micro tracking-[0.14em] text-paper/75 uppercase">
                  <span className="h-px w-4 shrink-0 translate-y-[-0.2em] bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Button to="/incubators" tone="ghost">
                Business & Entrepreneurship
              </Button>
            </div>
          </Reveal>
          <Reveal delay={160} className="overflow-hidden">
            <img
              src={images.entrepreneurs}
              alt="Entrepreneurs meeting and connecting at an evening community gathering"
              width={1536}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading eyebrow="Who can join" title="Everyone has a place to start." />
        </Reveal>
        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {whoCanJoin.map((item, index) => (
            <Reveal key={item} delay={(index % 4) * 80}>
              <div className="flex h-full min-h-40 flex-col justify-between bg-paper p-8 transition-colors duration-500 hover:bg-ink hover:text-paper">
                <span className="text-micro tracking-[0.3em] text-gold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-8 font-display text-heading">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="relative isolate overflow-hidden bg-ink px-6 py-28 text-paper md:px-12 md:py-36">
        <img
          src={images.venue}
          alt="An elegant runway hall lit with warm golden spotlights in downtown Calgary"
          width={1536}
          height={1024}
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <Eyebrow>Featured event</Eyebrow>
            <h2 className="mt-8 max-w-4xl text-title">
              Official Launching of IQ-Mode & Multiculturalism 2026 Runway Showcase
            </h2>
            <dl className="mt-12 grid gap-8 border-y border-paper/15 py-8 sm:grid-cols-3">
              {[
                ["Date", "November 28, 2026"],
                ["Time", "10:00 AM – 6:00 PM"],
                ["Location", "The Ampersand Building, Downtown Calgary"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-micro tracking-[0.3em] text-gold uppercase">{label}</dt>
                  <dd className="mt-3 font-display text-heading">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-2xl text-paper/70">
              A community event bringing together leadership, modeling, multiculturalism, families, entrepreneurs,
              businesses, vendors, designers, community supporters and participants.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Button to="/events">Event Details</Button>
              <Button to="/contact" tone="ghost">
                Get Involved
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Get involved"
            title="Five ways to step in."
            lead="Participation looks different for everyone. Choose the way that fits your time, your skills and your season."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {waysIn.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 90}>
              <Card className="h-full">
                <span className="text-micro tracking-[0.3em] text-gold tabular-nums">0{index + 1}</span>
                <h3 className="mt-5 font-display text-heading">{item.title}</h3>
                <p className="mt-4 opacity-70">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={180}>
          <div className="mt-16">
            <Button to="/contact">Connect with IQ-Mode</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
