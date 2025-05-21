import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export const HeroSection = () => (
  <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
    <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

    <Boxes />

    <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
      TypeScript API Framework Benchmark
    </h1>
  </div>
);
