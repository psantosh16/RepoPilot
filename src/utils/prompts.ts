import { GithubUserData } from '@/types/github';
import { Vibe } from '@/types/prompt';

const professionalPrompts = [
  'Using your GitHub profile data (username, URL, avatar, repository count, and repository names with their respective tech stack languages), generate a polished, professional bio intended for your README.md file. Structure your output into four clear sections: title, description, tech stack, and Github link. Emphasize technical expertise and career achievements with business-appropriate emojis like 💼 or 📊.',
  'Given your GitHub details (username, URL, total repositories, and repository names with corresponding tech stack languages), craft a refined, structured bio for your README.md file that highlights your skills, projects, and industry experience. Divide your response into distinct sections: title, description, tech stack, and Github link.',
  'Based on your GitHub information (including username, URL, repository count, and details such as repository names with their associated tech stack languages), create a sophisticated bio for your README.md file that outlines your technical competencies and professional milestones. Present your answer in four parts: title, description, tech stack, and Github link.',
];

const casualPrompts = [
  'Using your GitHub details (username, URL, avatar, repository count, and repository names with their tech stack languages), generate a friendly, casual bio intended for your README.md file. Structure your output into four sections: title, description, tech stack, and Github link. Keep the tone relaxed with playful emojis like 😎 or 🎉.',
  'With your GitHub profile data (username, URL, total repositories, and repository names with their tech stack languages), craft a laid-back bio for your README.md file that highlights your projects and skills in a conversational tone. Ensure your response is divided into title, description, tech stack, and Github link.',
  'Based on your GitHub information (including username, URL, repository count, and each repository name with its tech stack language), create a personable bio for your README.md file that reflects your coding journey. Format your answer into four distinct parts: title, description, tech stack, and Github link.',
];

const creativePrompts = [
  'Given your GitHub profile data (username, URL, avatar, repository count, and repository names with their tech stack languages), craft a creative and imaginative bio intended for your README.md file that tells a unique story about your coding journey. Structure your output into four parts: title, description, tech stack, and Github link, and enhance your narrative with artistic emojis like 🎨, 🌟, or 🚀.',
  'Using your GitHub details (username, URL, total repositories, and repository names paired with their tech stack languages), generate a bio for your README.md file that blends technical achievements with creative storytelling. Divide your response into title, description, tech stack, and Github link, and incorporate vibrant emojis such as 🎭, ✨, or 🖌️.',
  'With your GitHub information (including username, URL, repository count, and each repository name with its tech stack language), produce an engaging bio for your README.md file that combines technical detail with artistic flair. Present your answer in four clear sections: title, description, tech stack, and Github link, decorated with expressive emojis like 🌈, 🎇, or 🪐.',
];

const funnyPrompts = [
  'Based on your GitHub profile data (username, URL, avatar, repository count, and repository names with their tech stack languages), generate a witty and humorous bio intended for your README.md file. Structure your response into four separate sections: title, description, tech stack, and Github link, and add funny emojis like 😂, 🤖, or 😜.',
  'Using your GitHub details (username, URL, total repositories, and repository names with corresponding tech stack languages), craft a funny, clever bio for your README.md file that mixes technical details with a humorous twist. Ensure your output is divided into title, description, tech stack, and Github link, and include playful emojis such as 🤪 or 🎈.',
  'With your GitHub profile information (including username, URL, repository count, and each repository name with its tech stack language), create a humorous bio for your README.md file that blends technical prowess with playful wit. Format your answer into four distinct sections: title, description, tech stack, and Github link, and incorporate amusing emojis like 😹, 🤓, or 😂.',
];

export const getPrompt = (
  vibe: Vibe,
  prompt: string,
  gitInfo: GithubUserData
): string => {
  let finalPrompt;
  switch (vibe) {
    case Vibe.PROFESSIONAL:
      finalPrompt =
        professionalPrompts[
          Math.floor(Math.random() * professionalPrompts.length)
        ];
    case Vibe.CASUAL:
      finalPrompt =
        casualPrompts[Math.floor(Math.random() * casualPrompts.length)];
    case Vibe.CREATIVE:
      finalPrompt =
        creativePrompts[Math.floor(Math.random() * creativePrompts.length)];
    case Vibe.FUNNY:
      finalPrompt =
        funnyPrompts[Math.floor(Math.random() * funnyPrompts.length)];
    default:
      finalPrompt = 'Generate from Following data: ';
  }

  return (
    finalPrompt +
    prompt +
    ` My GitHub username is ${gitInfo.user?.login} and my profile URL is ${gitInfo.user?.html_url}. I have ${gitInfo.repos.length} public repositories, including: ${gitInfo.repos.map((repo) => repo.name).join(', ')}. These projects use languages such as ${gitInfo.repos.map((repo) => repo.language).join(', ')}. Combine this information with your creativity to generate a unique bio for my Github profile.`
  );
};
