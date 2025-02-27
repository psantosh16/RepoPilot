import { Github } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="min-w-full h-auto py-1.5 px-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-bold text-xl">RepoPilot AI</div>
        </div>
        <div className="flex items-center">
          <Link
            href="https://www.github.com/psantosh16"
            target="_blank"
            className="text-sm text-slate-200 flex gap-x-2 items-center bg-black px-2.5 py-1.5 rounded-full transition-colors duration-200 hover:bg-black/60 cursor-pointer"
          >
            <Github size={16} />{' '}
            <p className="text-white font-semibold">Github</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
