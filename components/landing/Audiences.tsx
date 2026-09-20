import { Container } from "@/components/layout/Container";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

export function Audiences() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-6 lg:grid-cols-2">
        <Card id="for-students" className="scroll-mt-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            For learners
          </p>
          <CardTitle as="h2" className="text-2xl">
            Know exactly what to prove next
          </CardTitle>
          <CardDescription className="text-base leading-7">
            Stop guessing which certificate will help. SkillPulse shows which
            skills are already evidenced in your portfolio and which gaps are
            blocking the roles you want.
          </CardDescription>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
              Role-based gap maps instead of generic course lists
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
              Portfolio artifacts that stay attached to each skill
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
              A shareable snapshot when you are ready to apply
            </li>
          </ul>
        </Card>

        <Card id="for-recruiters" className="scroll-mt-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
            For recruiters
          </p>
          <CardTitle as="h2" className="text-2xl">
            Screen for evidence, not adjectives
          </CardTitle>
          <CardDescription className="text-base leading-7">
            Review candidates through verified skill coverage. See what is
            demonstrated, what is still a gap, and where to go deep in an
            interview—without extra tools or guesswork.
          </CardDescription>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-600" />
              Faster shortlists based on proof strength
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-600" />
              Transparent gaps instead of inflated skill lists
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-600" />
              Consistent snapshots across interns and experienced hires
            </li>
          </ul>
        </Card>
      </Container>
    </section>
  );
}
