import { familyPairings, images, immigrantTopics, parentMay } from "../content";
import { Button, Card, Eyebrow, PageHero, Reveal, Section, SectionHeading, usePageMeta } from "../components/ui";

export function FamiliesPage() {
  usePageMeta("For Families | Calgary Youth & Parent Programs — IQ-Mode");

  return (
    <>
      <PageHero
        eyebrow="For families"
        title="Your child's journey can be your journey too."
        lead="Parents can support their children while also participating in appropriate IQ-Mode activities."
        image={images.families}
        alt="A parent and teenager laughing together at a community event"
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <Eyebrow>Parents may</Eyebrow>
            <h2 className="mt-7 text-title">Sidelines optional.</h2>
            <ul className="mt-11 space-y-5">
              {parentMay.map((item) => (
                <li key={item} className="flex items-baseline gap-4 border-b border-border pb-5">
                  <span className="h-px w-5 shrink-0 translate-y-[-0.25em] bg-gold" />
                  <span className="font-display text-heading">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <img
              src={images.families}
              alt="A parent and their teenager at an outdoor community gathering"
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
            eyebrow="Example pairings"
            title="How families participate together."
            lead="IQ-Mode is designed to create opportunities where families can connect, learn and grow together."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {familyPairings.map((item, index) => (
            <Reveal key={item.title} delay={(index % 2) * 90}>
              <Card dark className="h-full">
                <span className="text-micro tracking-[0.3em] text-gold tabular-nums">0{index + 1}</span>
                <h3 className="mt-5 font-display text-heading">{item.title}</h3>
                <p className="mt-4 text-paper/65">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <Reveal>
            <img
              src={images.community}
              alt="A multicultural group of adults and youth together in the city"
              width={1536}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow>Immigrant families</Eyebrow>
            <h2 className="mt-7 text-title">Every family arrives differently.</h2>
            <p className="mt-8 max-w-xl opacity-80">
              There is no single immigrant experience, and no single way to settle into a new city. IQ-Mode offers
              conversations, workshops and community activities that families can take up in whatever order is useful to
              them.
            </p>
            <ul className="mt-11 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {immigrantTopics.map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-micro tracking-[0.14em] uppercase opacity-75">
                  <span className="h-px w-4 shrink-0 translate-y-[-0.2em] bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Button to="/contact">Connect with IQ-Mode</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
