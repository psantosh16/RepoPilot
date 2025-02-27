'use client';
import BioGenerator from './user-textarea';
import { Switcher } from './ai-switcher';
import { useMode } from '@/context/mode_context';
import { Mode } from '@/types/mode';
import { HeroText } from './hero-text';
import { RoastModeForm } from './roast_mode/roast_mode_form';

export const ModeToggleWrapper = () => {
  const { mode } = useMode();
  return (
    <div>
      {mode === Mode.NORMAL ? (
        <div id="bio-gen" className="grid grid-cols-1 gap-y-5 w-screen">
          <HeroText />
          <Switcher />
          <BioGenerator />
        </div>
      ) : (
        <div className="w-screen">
          <RoastModeForm />
        </div>
      )}
    </div>
  );
};
