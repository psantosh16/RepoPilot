import { HeroCountOutput } from '@/types/hero';
import db from '@/utils/firestore';
import { collection, doc, getDoc } from 'firebase/firestore';
// import { RoastModeToggle } from "../_components/roast_mode/roast_mode";

const fetchViewCount = async (): Promise<HeroCountOutput> => {
  let count: number | null = null;
  try {
    const collectionRef = collection(db, 'repopilot-database');
    const docRef = doc(collectionRef, 'v1');
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log('No such document!');
      count = null;
    }

    const data = docSnapshot.data();
    count = data?.count || null;
  } catch (error) {
    console.error('Error fetching data:', error);
    count = null;
  }
  return { count };
};

export const HeroCount = async () => {
  const { count } = await fetchViewCount();

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 px-3 select-none cursor-pointer hover:scale-110 ease-in-out transition-transform">
      <div
        id="counter"
        className="border border-gray-200 rounded-xl px-2 py-0.5 shadow-sm bg-slate-50 flex gap-x-1 text-slate-600 text-sm "
      >
        <strong>{count !== null ? count : '10'}</strong>{' '}
        <p>bios generated so far</p>
      </div>
    </div>
  );
};
