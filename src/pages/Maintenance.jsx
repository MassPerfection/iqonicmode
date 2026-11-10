import { useEffect } from "react";

export function MaintenancePage() {
  useEffect(() => {
    document.title = "ICONIQMode | Temporarily Unavailable";
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24 text-center text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,74,0.14),transparent_58%)]" />
      <div className="relative mx-auto w-full max-w-2xl">
        <p className="font-display text-heading tracking-[0.12em]">
          ICON<span className="text-gold">IQ</span>MODE
        </p>
        <p className="mt-3 text-micro tracking-[0.34em] text-gold uppercase">Walk. Lead. Inspire.</p>

        <div className="mx-auto mt-14 h-px w-14 bg-gold" />

        <h1 className="mt-10 font-display text-title">Temporarily unavailable</h1>
        <p className="mt-6 text-paper/70">
          The ICONIQMode website is offline for a short while. We will be back soon.
        </p>
        <p className="mt-8 text-paper/55">
          Questions in the meantime?{" "}
          <a className="text-gold transition-colors hover:text-gilt" href="mailto:iconiqmodesociety@gmail.com">
            iconiqmodesociety@gmail.com
          </a>
        </p>

        <p className="mt-16 text-micro tracking-[0.22em] text-paper/35 uppercase">
          ICONIQMode Leadership and Modeling Centre Society
        </p>
      </div>
    </div>
  );
}
