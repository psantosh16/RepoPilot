import { HeroCount } from './_components/hero-count';
import { ModeToggleWrapper } from './_components/mode_wrapper';
import { RoastModeToggle } from './_components/roast_mode/roast_mode_toggle';

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-y-5 px-3">
      <RoastModeToggle />
      <HeroCount />
      <ModeToggleWrapper />
    </div>
  );
}
