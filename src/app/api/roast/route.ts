'use server';

import { getRoast, UserInfo } from '@/actions/generateRoast';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { repos, name, username, bio, gitLink, avatar } = await req.json();
    const data: UserInfo = { repos, name, username, bio, gitLink, avatar };

    if (!data) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    const response = await getRoast(data);

    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
};
