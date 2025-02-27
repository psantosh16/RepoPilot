'use server';

import db from '@/utils/firestore';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from '@firebase/firestore';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const SESSION_KEY = 'viewed_timestamp';
const SESSION_DURATION = 10 * 60 * 1000;

export const updateViewCount = async (githubId: string, model: string) => {
  let count: number = 0;

  try {
    const now = Date.now();
    const cookieStore = await cookies();
    const lastViewed = cookieStore.get(SESSION_KEY)?.value;

    if (lastViewed && now - Number(lastViewed) < SESSION_DURATION) {
      console.log('View already counted in this session.');
      return { count, message: 'View already counted in this session.' };
    }

    const collectionRef = collection(db, 'repopilot-database');
    const docRef = doc(collectionRef, 'v1');
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log('No such document!');
      return { count };
    }

    const data = docSnapshot.data();
    count = data?.count || 0;
    const storedGitHubIDs = data?.githubIds || [];

    if (storedGitHubIDs.includes(githubId)) {
      console.log('GitHub ID already registered.');
      return { count, message: 'GitHub ID already registered.' };
    }

    await updateDoc(docRef, {
      count: count + 1,
      githubIds: arrayUnion({
        id: githubId,
        model: model,
        timestamp: Timestamp.fromDate(new Date()),
      }),
    });

    count += 1;

    // Set cookie with 10-minute expiry
    cookieStore.set({
      name: SESSION_KEY,
      value: now.toString(),
      maxAge: SESSION_DURATION / 1000,
      path: '/',
    });

    console.log('View count updated:', count);
    revalidatePath('/');
  } catch (error) {
    console.error('Error updating view count:', error);
    count = 0;
  }

  return { count };
};
