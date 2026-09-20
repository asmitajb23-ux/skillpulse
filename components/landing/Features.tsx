import { Container } from "@/components/layout/Container";
import {
  Card,
  CardDescription,
  CardEyebrow,
  CardTitle,
} from "@/components/ui/Card";

const features = [
  {
    eyebrow: "Diagnosis",
    title: "Skill gap analysis",
    description:
      "Compare what a target role expects with the skills evidenced in your work, then see the gaps ranked by impact.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 19V5m0 14h16M8 15l3-4 3 2 5-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Trust",
    title: "Portfolio verification",
    description:
      "Attach projects, repos, and write-ups so claims are tied to artifacts reviewers can inspect—not self-reported checklists.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M9 12.5 11 14.5 15.5 10M7 4h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Guidance",
    title: "Actionable learning paths",
    description:
      "Turn each gap into a focused next step: the proof to collect, the practice to complete, and the signal it will send.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 20h16M7 16 12 4l5 12M9.2 11h5.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Hiring",
    title: "Recruiter-ready profiles",
    description:
      "Share a concise skill snapshot with evidence strength, so hiring teams spend time on candidates who can actually show the work.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 20a8 8 0 0 1 16 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Coverage",
    title: "Technical and human skills",
    description:
      "Track both hard skills and collaboration evidence so your profile reflects how you ship, not only what you list.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M8 10a3 3 0 1 0-3-3m11 3a3 3 0 1 0-3-3M4 19v-1a4 4 0 0 1 4-4h1m11 5v-1a4 4 0 0 0-4-4h-1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Clarity",
    title: "Honest confidence scores",
    description:
      "See where evidence is strong, thin, or missing so you never over-claim and always know what to improve next.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 8v4l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to turn work into proof
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            SkillPulse is built for learners who want a truthful skills map and
            for teams who need evidence, not buzzwords.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                {feature.icon}
              </div>
              <CardEyebrow className="mt-5">{feature.eyebrow}</CardEyebrow>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
