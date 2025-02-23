import { HeroCount } from "./_components/hero-count";
import { HeroText } from "./_components/hero-text";
export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      <HeroCount />
      <HeroText />
      
    </div>
  );
}
