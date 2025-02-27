'use server';

import { GithubUserData, ResponseStatus } from '@/types/github';
import { Intelligence } from '@/types/intelligence';
import { Vibe } from '@/types/prompt';
import { getPrompt } from '@/utils/prompts';

const POST = async (data: string, model: Intelligence): Promise<string> => {
  const maxAttempts = 2;
  const baseUri = 'https://openrouter.ai/api/v1/chat/completions';
  const payload: string = JSON.stringify({
    model:
      model === Intelligence.MISTRAL
        ? 'mistralai/mistral-small-24b-instruct-2501:free'
        : 'meta-llama/llama-3.3-70b-instruct:free',
    messages: [
      {
        role: 'user',
        content:
          data +
          'Provide me in following format strictly:\n\nTitle:{Title} \n\nDescription:{Description} \n\nTech Stack:{Tech Stack} \n\nGithub Link:{Github Link} ',
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

      if (
        response.status === 200 &&
        result.choices &&
        result.choices.length > 0
      ) {
        return result.choices[0].message.content;
      } else {
        console.error(`Attempt ${attempt} failed: `, result);
      }
    } catch (error) {
      console.error(`Attempt ${attempt} encountered an error: `, error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
  }

  return 'Title: Error. Description: Error. Tech Stack: Error. Github Link: Error.';
};

export const generateAiResponse = async (
  prompt: string,
  vibe: Vibe,
  gitInfo: GithubUserData,
  model: Intelligence
): Promise<ResponseStatus> => {
  if (!prompt || prompt.length === 0) {
    return { code: 400, message: 'Prompt cannot be empty' };
  }
  if (!vibe) {
    return { code: 400, message: 'Mode cannot be empty' };
  }
  if (!gitInfo) {
    return { code: 400, message: 'Github Username cannot be empty' };
  }
  if (!model) {
    return { code: 400, message: 'Error selecting AI model' };
  }

  const finalPrompt: string = getPrompt(vibe, prompt, gitInfo);
  const response = await POST(finalPrompt.toString(), model);

  return { code: 200, message: response };
};
