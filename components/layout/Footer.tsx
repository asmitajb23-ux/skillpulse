import Link from "next/link";
import { Container } from "@/components/layout/Container";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#cta", label: "Get started" },
    ],
  },
  {
    title: "People",
    links: [
      { href: "#for-students", label: "Learners" },
      { href: "#for-recruiters", label: "Recruiters" },
      { href: "#features", label: "Verified portfolios" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 text-sm font-bold text-white"
              >
                SP
              </span>
              <span className="text-lg font-semibold text-slate-900">
                SkillPulse
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              An AI-powered skill gap and portfolio verification platform for
              learners, educators, and hiring teams.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-slate-900">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SkillPulse. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built for evidence-based hiring and learning.
          </p>
        </div>
      </Container>
    </footer>
  );
}
