import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

const skills = [
  { name: "React", level: "Verified", width: "w-[88%]" },
  { name: "System design", level: "Gap", width: "w-[42%]" },
  { name: "SQL", level: "Strong", width: "w-[74%]" },
  { name: "Communication", level: "Evidence", width: "w-[81%]" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(79,70,229,0.12),_transparent_55%)]"
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800 ring-1 ring-inset ring-brand-100">
            Skill gap &amp; portfolio verification
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Prove the skills you have. Close the ones you don’t.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            SkillPulse maps real projects to in-demand skills, highlights
            honest gaps, and turns your portfolio into verified evidence
            recruiters can trust—not just another resume claim.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#cta" size="lg">
              Analyze your skills
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-slate-200 pt-8">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Evidence
              </dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900">
                Project-backed
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Gaps
              </dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900">
                Role-ready
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Sharing
              </dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900">
                Recruiter-safe
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-200/50 via-violet-100 to-transparent blur-2xl"
          />
          <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-brand-900/5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Frontend Engineer snapshot
                </p>
                <p className="text-sm text-slate-500">
                  Portfolio confidence 76%
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                4 artifacts verified
              </span>
            </div>
            <ul className="mt-6 space-y-4">
              {skills.map((skill) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-800">
                      {skill.name}
                    </span>
                    <span className="text-slate-500">{skill.level}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r from-brand-600 to-violet-500 ${skill.width}`}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              Recommended next proof: add a production incident write-up to
              strengthen system design evidence.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
