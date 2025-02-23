"use server";

import { GithubUserData, ResponseStatus } from "@/types/github";
import { Intelligence } from "@/types/intelligence";
import { Vibe } from "@/types/prompt";
import { getPrompt } from "@/utils/prompts";
import axios from "axios";

const POST = async (data: string, model: Intelligence): Promise<string> => { 
  
  const payload:string = JSON.stringify({
    "model": model == Intelligence.MISTRAL ? "mistralai/mistral-small-24b-instruct-2501:free" : "deepseek/deepseek-r1:free",
    "messages": [
      {"role": "user", "content": data + "Don't add text formating. Just give proper spaces. Text for Readme.md in 30 words or less. Decription of 40 words or less. Use appropriate emojies. Provide me in following format only: Title: \n\nDescription: \n\nTech Stack: \n\nGithub Link: "}
    ],
    "top_p": 1,
    "temperature": 0.85,
    "repetition_penalty": 1
  })

  const baseUri = "https://openrouter.ai/api/v1/chat/completions";
  const res = await axios.post(baseUri, payload, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
    },
  });
  console.log("Data from AI: ",res.data.choices[0].message.content);
  return res.data.choices[0].message.content;
};

export const generateAiResponse = async (
  prompt: string,
  vibe: Vibe,
  gitInfo: GithubUserData,
  model: Intelligence
): Promise<ResponseStatus> => {

  if (prompt.length === 0 || prompt === undefined) {
    return { code: 400, message: "Prompt cannot be empty" };
  }
  if (vibe === undefined || vibe === null) {
    return { code: 400, message: "Vibe cannot be empty" };
  }
  if (gitInfo === undefined ||gitInfo === null) {
    return { code: 400, message: "Github Username cannot be empty" };
  }

  if (model === null || model === undefined) {
    return { code: 400, message: "Something went wrong" };
  }

  const finalPrompt:string = getPrompt(vibe,prompt,gitInfo);
  const response = await POST(finalPrompt.toString(), model);

return { code: 200, message: response };

};
