import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function Cta() {
  return (
    <section id="cta" className="scroll-mt-24 pb-16 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-700 px-6 py-12 text-center shadow-lg sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_45%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start building a verified skill story
            </h2>
            <p className="mt-4 text-base leading-7 text-brand-50 sm:text-lg">
              Accounts, analysis, and AI scoring are coming next. This release
              is the product foundation—explore the experience and get ready to
              plug in your portfolio.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="#features"
                size="lg"
                className="bg-white text-brand-800 hover:bg-brand-50 focus-visible:outline-white"
              >
                Explore features
              </Button>
              <Button
                href="#how-it-works"
                size="lg"
                variant="outline"
                className="border-0 bg-white/10 text-white ring-white/40 hover:bg-white/15 focus-visible:outline-white"
              >
                Review the flow
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
