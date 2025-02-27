'use client';
import { useMode } from '@/context/mode_context';
import { Mode } from '@/types/mode';
import Image from 'next/image';

export const RoastModeToggle = () => {
  const { mode, toggleMode } = useMode();
  const isRoastMode = mode === Mode.ROAST;
  const roastImage = '/images/roast.jpg';
  const normalImage = '/icons/logo.png';

  return (
    <div
      id="roast_me"
      className="relative cursor-pointer select-none mt-8 md:mt-2"
    >
      <Image
        src={isRoastMode ? roastImage : normalImage}
        width={100}
        height={100}
        className="size-18 rounded-xl mb-10 transition-transform duration-300 ease-in-out transform hover:scale-110"
        alt="repopilot_logo"
        onClick={toggleMode}
      />
      <div className="font-shadowintolight font-bold absolute md:top-0 md:left-28 -top-4 left-20 text-center w-fit flex items-center gap-x-2 h-auto text-xl text-slate-500 whitespace-nowrap">
        <span className="text-5xl font-normal">⃔</span>
        <div className="text-center flex flex-col">
          Click here for
          <span className="font-pixelifySans text-red-600">
            {mode === Mode.NORMAL ? 'ROAST' : 'NORMAL'}
            <span className="font-shadowintolight text-slate-500"> Mode</span>
          </span>
        </div>
      </div>
    </div>
  );
};
