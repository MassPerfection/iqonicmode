import { aboutLater, aboutReady, images, values } from "../content";
import { Button, PageHero, PlaceholderBlock, Reveal, Section, usePageMeta } from "../components/ui";

export function AboutPage() {
  usePageMeta("About IQ-Mode | Calgary Leadership & Modeling Incubator");

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A leadership and modeling incubator, rooted in Calgary."
        lead="ICONIQMode Leadership and Modeling Centre Society is a registered nonprofit society in Alberta, creating opportunities for youth, adults, parents, families and entrepreneurs to learn, participate, connect and grow."
        image={images.community}
        alt="A diverse Calgary community group standing together at sunset"
      />
      <Section>
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="rule-gold" />
              <span className="eyebrow">Foundations</span>
            </div>
            <h2 className="mt-7 text-title">The structure of who we are.</h2>
            <p className="mt-6 max-w-2xl opacity-80">
              These sections are built and ready — the final wording will be supplied by the society.
            </p>
          </div>
        </Reveal>
        <div className="mt-14">
          {aboutReady.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <PlaceholderBlock {...item} />
            </Reveal>
          ))}
        </div>
      </Section>
      <Section dark>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="rule-gold" />
            <span className="eyebrow">Section 06 — Our Values</span>
          </div>
          <h2 className="mt-7 text-title">I C O N I Q M O D E</h2>
          <p className="mt-6 max-w-2xl text-paper/70">
            Ten values, one word. Each letter is a commitment we hold to the people who participate.
          </p>
        </Reveal>
        <ol className="mt-16 border-t border-paper/15">
          {values.map(([letter, name, body], index) => (
            <Reveal key={`${letter}-${name}`} delay={(index % 5) * 70}>
              <li className="grid items-baseline gap-4 border-b border-paper/15 py-8 md:grid-cols-[6rem_12rem_1fr] md:gap-8">
                <span className="font-display text-title leading-none text-gold">{letter}</span>
                <span className="font-display text-heading">{name}</span>
                <p className="text-paper/65">{body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
      <Section>
        <div>
          {aboutLater.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <PlaceholderBlock {...item} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-16 flex flex-col gap-4 sm:flex-row">
            <Button to="/incubators" tone="ghost">
              Our Incubators
            </Button>
            <Button to="/contact">Connect with IQ-Mode</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
