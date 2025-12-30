import Hero from "@/components/features/landing_page/Hero";
import ProblemSolution from "@/components/features/landing_page/ProblemSolution";
import HowItWorks from "@/components/features/landing_page/HowItWorks";
import Roles from "@/components/features/landing_page/Roles";
import WhyTaskMan from "@/components/features/landing_page/WhyTaskMan";
import FinalCTA from "@/components/features/landing_page/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Roles />
      <WhyTaskMan />
      <FinalCTA />
    </>
  );
}