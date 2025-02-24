import { Switcher } from "./_components/ai-switcher";
import { HeroCount } from "./_components/hero-count";
import { HeroText } from "./_components/hero-text";
import BioGenerator from "./_components/user-textarea";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-y-5 px-3">
      <HeroCount />
      <HeroText />
      <Switcher />
      <BioGenerator />
    </div>
  );
}
