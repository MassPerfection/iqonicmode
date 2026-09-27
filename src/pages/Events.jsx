import { eventExpectations, eventRoles, eventSchedule, images, otherActivities } from "../content";
import { Button, Card, Eyebrow, PageHero, Reveal, Section, SectionHeading, usePageMeta } from "../components/ui";

export function EventsPage() {
  usePageMeta("Events | Calgary Multicultural Runway & Community Activities — IQ-Mode");

  return (
    <>
      <PageHero
        eyebrow="Featured event"
        title="Official Launching of IQ-Mode & Multiculturalism 2026 Runway Showcase"
        lead="November 28, 2026 · 10:00 AM – 6:00 PM · The Ampersand Building, Downtown Calgary"
        image={images.venue}
        alt="An elegant runway hall lit by warm golden spotlights"
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <Eyebrow>About the event</Eyebrow>
            <h2 className="mt-7 text-title">One day, the whole community.</h2>
            <p className="mt-8 opacity-80">
              A community event bringing together leadership, modeling, multiculturalism, families, entrepreneurs,
              businesses, vendors, designers, community supporters and participants. It marks the public launch of IQ-Mode
              in Calgary and sets the tone for everything that follows.
            </p>
            <p className="mt-6 opacity-80">
              The day moves between a runway experience, live speaking segments, cultural programming and open time for
              people to meet each other. It is built to be walked through, not only watched.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <dl className="border-t border-border">
              {[
                ["Date", "November 28, 2026"],
                ["Time", "10:00 AM – 6:00 PM"],
                ["Venue", "The Ampersand Building"],
                ["City", "Downtown Calgary, Alberta"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-border py-6">
                  <dt className="text-micro tracking-[0.3em] text-gold uppercase">{label}</dt>
                  <dd className="mt-2 font-display text-heading">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>
      <Section dark>
        <Reveal>
          <SectionHeading eyebrow="What to expect" title="Four things happening at once." />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {eventExpectations.map((item, index) => (
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
        <Reveal>
          <SectionHeading
            eyebrow="Who can participate"
            title="Roles for the day."
            lead="Every role below is open. Tell us which one fits and we will follow up with the details."
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventRoles.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 90}>
              <Card className="h-full">
                <h3 className="font-display text-heading">{item.title}</h3>
                <p className="mt-4 opacity-70">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section dark>
        <Reveal>
          <SectionHeading
            eyebrow="Event schedule"
            title="How the day runs."
            lead="A working outline — timings will be confirmed closer to the date."
          />
        </Reveal>
        <ol className="mt-16 border-t border-paper/15">
          {eventSchedule.map(([time, detail], index) => (
            <Reveal key={time} delay={(index % 4) * 60}>
              <li className="grid gap-2 border-b border-paper/15 py-7 md:grid-cols-[10rem_1fr] md:gap-8">
                <span className="text-micro tracking-[0.3em] text-gold uppercase">{time}</span>
                <span className="font-display text-heading">{detail}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Registration & tickets</Eyebrow>
            <h2 className="mt-7 text-title">Registration opens soon.</h2>
            <p className="mt-8 opacity-80">
              Participant registration, vendor tables, designer submissions and ticket details will be published here. To
              be notified first — or to reserve a role now — send us a message and tell us how you would like to take part.
            </p>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Button to="/contact">Get Involved</Button>
              <Button href="mailto:iconiqmodesociety@gmail.com" tone="ghost">
                Email the team
              </Button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow>Other activities</Eyebrow>
            <h3 className="mt-7 font-display text-heading">Beyond the launch, IQ-Mode runs activities across these areas.</h3>
            <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {otherActivities.map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-micro tracking-[0.14em] uppercase opacity-75">
                  <span className="h-px w-4 shrink-0 translate-y-[-0.2em] bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
