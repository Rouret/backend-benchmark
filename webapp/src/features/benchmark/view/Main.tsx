import { HeroSection } from "@/components/HeroSection";
import { BenchmarkView } from "@/features/benchmark/view/BenchmarkView";

export const Main = () => {
  return (
    <main className=" w-screen bg-slate-900">
      <HeroSection />
      <BenchmarkView />
    </main>
  );
};
