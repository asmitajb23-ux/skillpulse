import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    step: "01",
    title: "Add your work",
    description:
      "Collect projects, write-ups, and outcomes in one place. No login or uploads are wired yet—this is the flow you’ll follow.",
  },
  {
    step: "02",
    title: "Map skills to evidence",
    description:
      "Each skill is tied to artifacts. SkillPulse will later score coverage so you can see what’s proven versus assumed.",
  },
  {
    step: "03",
    title: "See the gaps that matter",
    description:
      "Compare against a target role. Prioritize missing proof instead of chasing every course on the internet.",
  },
  {
    step: "04",
    title: "Share a verified snapshot",
    description:
      "Send a recruiter-friendly profile that highlights confidence, artifacts, and remaining growth areas.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-slate-50 py-16 sm:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Four steps from scattered work to a trusted skill story
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The product is frontend-first for now. Authentication, AI analysis,
            and APIs come later—this section shows the experience we are
            building toward.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((item) => (
            <li key={item.step}>
              <Card className="h-full">
                <span className="text-sm font-semibold text-violet-700">
                  {item.step}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
