import { Audiences } from "@/components/landing/Audiences";
import { Cta } from "@/components/landing/Cta";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Features />
      <HowItWorks />
      <Audiences />
      <Cta />
    </main>
  );
}
