'use server';

import { GithubRepo } from '@/types/github';

// import { NextResponse } from "next/server";
// import axios from "axios";

export interface UserInfo {
  repos: GithubRepo[];
  name: string;
  username: string;
  bio: string;
  gitLink: string;
  avatar: string;
}

const POST = async (data: UserInfo): Promise<string> => {
  const prompt = `
  As an elite GitHub profile evaluator, your task is to deliver a candid and humorous critique of ${data.name}'s profile. Below are the details of their repositories:

${data.repos
  .map(
    (repo, index) =>
      `${index + 1}. **${repo.name}**\n   - *Description:* ${repo.description}\n   - *Languages:* ${repo.language}\n   - *Topics:* ${repo.topics}\n`
  )
  .join('\n')}

**Instructions:**
- **Tone:** Employ sharp, witty language to highlight areas where the profile falls short of top-tier standards. Feel free to use emojis and strong words to emphasize points.
- **Content:** Focus on critiquing the user's profile directly, pointing out deficiencies and areas for improvement. If the profile meets high standards, acknowledge this with balanced praise.
- **Formatting:** Present your critique in a clear, readable style using proper spaces or markdown formatting. Aim for a medium-length response that is both entertaining and insightful.
- **Important Notes:**
  - Do not mention or reference any elite benchmark coder.
  - Avoid differentiating between the user and any elite coder; address the user directly.
  - Ignore any links in the data and avoid unnecessary object outputs (e.g., [object Object]).
  - Ensure your response is free from unnecessary data and directly addresses the user's profile.

Deliver your evaluation as if you are an elite coder in the industry, providing a critique that is both entertaining and constructive.`;

  const maxAttempts = 3;
  const baseUri = 'https://openrouter.ai/api/v1/chat/completions';

  console.log(data);
  console.log('Prompt: ', prompt);

  const payload: string = JSON.stringify({
    model: 'mistralai/mistral-small-24b-instruct-2501:free',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    top_p: 1,
    temperature: 0.85,
    repetition_penalty: 1,
  });

  let attempt = 0;
  let response, result;

  while (attempt < maxAttempts) {
    attempt++;
    try {
      response = await fetch(baseUri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.OPENROUTER_API_KEY,
        },
        body: payload,
      });

      result = await response.json();
      console.log(`Attempt ${attempt} result: `, result);
      if (result?.choices?.[0]?.message?.content) {
        return result.choices[0].message.content;
      }
    } catch (error) {
      console.error(`Attempt ${attempt} encountered an error: `, error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
  }

  return 'Internal Server Error';
};

export const getRoast = async (data: UserInfo): Promise<string> => {
  try {
    const response = await POST(data);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    return 'Internal Server Error';
  }
};
