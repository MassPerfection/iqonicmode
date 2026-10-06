import { images, incubatorPages } from "../content";
import { Button, Eyebrow, PageHero, Reveal, Section, TagList, usePageMeta } from "../components/ui";

export function IncubatorsPage() {
  usePageMeta("Our Incubators | Calgary Leadership, Modeling & Entrepreneurship — IQ-Mode");

  return (
    <>
      <PageHero
        eyebrow="Our incubators"
        title="Four incubators. One community."
        lead="Each incubator is a space to practice something real — leadership, modeling, entrepreneurship and community — with mentorship alongside."
        image={images.modeling}
        alt="A silhouette walking under a warm golden spotlight"
      />
      {incubatorPages.map((item, index) => {
        const dark = index % 2 === 1;
        return (
          <Section key={item.title} dark={dark}>
            <div className={`grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center ${dark ? "lg:[&>*:first-child]:order-last" : ""}`}>
              <Reveal>
                <Eyebrow>Incubator {item.n}</Eyebrow>
                <h2 className="mt-7 text-title">{item.title}</h2>
                <p className={`mt-7 max-w-xl ${dark ? "text-paper/70" : "opacity-80"}`}>{item.lead}</p>
                {item.groups.map((group) => (
                  <div key={group.heading} className="mt-11">
                    <h3 className="font-display text-heading">{group.heading}</h3>
                    <TagList items={group.items} />
                  </div>
                ))}
              </Reveal>
              <Reveal delay={150}>
                <img src={item.image} alt={item.alt} width={1536} height={1024} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </Reveal>
            </div>
          </Section>
        );
      })}
      <Section>
        <Reveal>
          <h2 className="max-w-3xl text-title">Find the incubator that fits you.</h2>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row">
            <Button to="/contact">Join IQ-Mode</Button>
            <Button to="/events" tone="ghost">
              See what's coming up
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
