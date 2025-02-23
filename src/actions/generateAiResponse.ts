// TODO: Need to implement prompt selection based on vibe and add user data to prompt

/*
 1. Predefined Prompts based on Vibe
 2. Add data from users github and custom prompt of user
 3. Generate bio based on vibe,custom prompt and user data
 */

"use server";

import { GithubUserData, ResponseStatus } from "@/types/github";
import { Intelligence } from "@/types/intelligence";
import axios from "axios";

export const generateAiResponse = async (
  prompt: string,
  vibe: string,
  gitInfo: GithubUserData,
  ai: Intelligence
): Promise<ResponseStatus> => {
  // Base URI's
  let geminiUri =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  const mistralUri = "https://api.mistral.ai/v1/chat/completions";

  // Both have Content-Type : application/json
  // geminiUri we can include key in link itself
  //in bodywe need to add "content":[{
  //  "parts":[{
  // "text": "prompt"
  // }]}]

  // mistralUri we need to include Bearer $api_key in authorization header
  // Accept: application/json in headers
  // also need to addd model, message :{ role: "user", "content": "prompt"}  in body

  if (prompt.length === 0 || prompt === undefined) {
    return { code: 400, message: "Prompt cannot be empty" };
  }
  if (vibe === undefined || vibe === null) {
    return { code: 400, message: "Vibe cannot be empty" };
  }
  if (gitInfo === undefined ||gitInfo === null) {
    return { code: 400, message: "Github Username cannot be empty" };
  }

  if (ai === null || ai === undefined) {
    return { code: 400, message: "Something went wrong" };
  }

  // Generating BIO
  if (ai === Intelligence.GEMINI) {
    if (
      process.env.NEXT_PUBLIC_GEMINI_API_KEY === undefined ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY === null
    )
      throw new Error("Missing Gemini API Key in environment variables");

    geminiUri = `${geminiUri}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;
      const payload = {

      content: [
        {
          parts: [
            {
              text: `This is what i want : ${prompt}. Here is the data from your github profile : ${gitInfo.user?.bio}` //TODO: Change this 
            },
          ],
        },
      ],
    };

      try {
        console.log("Sending request to Gemini:  ",geminiUri);
      const response = await axios.post(geminiUri, {
        content: [
          {
            parts: [
              {
                text: `Generate an github bio of 20 words in short. My details are as :- I am ${gitInfo.user?.name} and I am ${gitInfo.user?.blog}. I live in ${gitInfo.user?.location}, and my github id is ${gitInfo.user?.html_url}`.toString() , //TODO: Change this
              },
            ],
          },
        ],
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
        if (response.status != 200) {
          return { code: 400, message: response.data };
        }
        console.log(response.data);
      return { code: 200, message: response.data };
    } catch (error) {
      return { code: 500, message: `Internal Server Error: ${error}` };
    }
  }

  return { code: 501, message: "Something went wrong internally!" };
};
