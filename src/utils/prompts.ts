import { GithubUserData } from "@/types/github";
import { Vibe } from "@/types/prompt";

const professionalPrompts = [
    "Using the provided GitHub profile details (name, URL, avatar, repository names, languages, etc.), generate a polished, professional bio that highlights technical expertise and career achievements. Use business-appropriate emojis like 💼 or 📊 to accentuate key points.",
    "Given the user’s GitHub input (including name, URL, avatar, repositories, languages, and any additional info), craft a refined and structured bio that emphasizes skills, projects, and industry experience. Feel free to sprinkle in subtle tech emojis such as 💻 or 🏢.",
    "Based on the input details (name, URL, avatar, repositories, languages, plus extra information), create a sophisticated GitHub bio that outlines technical competencies and professional milestones. Include tasteful emojis (e.g., 🛠️, 🚀) to enhance readability.",
    "Using the provided GitHub profile information, design a professional bio that communicates your expertise, projects, and key technologies in a clear, concise manner. Add relevant emojis like 🔍 or 📈 to highlight achievements.",
    "With details including your GitHub name, URL, avatar, repository list, languages, and more, produce a well-organized and professional bio that showcases your technical and career highlights. Incorporate elegant emojis such as 🏆 and 💡 where appropriate."
];

const casualPrompts = [
    "Using your GitHub details (name, URL, avatar, repositories, languages, and extra info), create a friendly and casual bio that feels approachable and genuine. Feel free to include playful emojis like 😎 or 🎉.",
    "Given the GitHub profile input, write a laid-back bio that highlights your projects and skills in a relaxed, conversational tone. Use casual emojis such as 😊, 👍, or 👋 to keep it light and engaging.",
    "Based on the provided GitHub info (name, URL, avatar, repositories, languages, etc.), generate a casual and personable bio that reflects your interests and experiences. Incorporate fun emojis like 🌟 and 😁 to add character.",
    "Using the user’s GitHub profile details, craft a bio that’s warm, informal, and relatable—perfect for connecting with fellow developers. Add a few friendly emojis (e.g., ✌️, 🤗) to enhance the tone.",
    "With input including your GitHub profile data and extra personal tidbits, design a casual bio that showcases your work and personality in an easygoing style. Use lighthearted emojis such as 🎈 and 😄 where fitting.",
];


const creativePrompts = [
    "Given your GitHub profile details (name, URL, avatar, repositories, languages, plus extra info), create a creative and imaginative bio that tells a unique story about your coding journey. Enhance the narrative with artistic emojis like 🎨, 🌟, or 🚀.",
    "Using the provided GitHub information, craft a bio that blends technical achievements with artistic expression. Write creatively and include vibrant emojis (e.g., 🎭, ✨) to add flair to your profile.",
    "With details such as your GitHub name, URL, avatar, repository names, languages, and more, generate a bio that’s as creative as it is informative—turn your technical journey into an engaging story. Use whimsical emojis like 🖌️, 🌈, or 🌀.",
    "Based on your GitHub profile input, design a bio that uniquely reflects your personality and creative approach to coding. Combine narrative style with technical highlights and decorate with creative emojis like 🎇, 📚, or 🧩.",
    "Using your GitHub details, produce an eye-catching, creative bio that stands out by blending technical details with a narrative twist. Infuse your bio with a mix of imaginative language and expressive emojis (like 🎨, 🪐) to capture your individuality.",
];
const funnyPrompts = [
    "Based on your GitHub profile details (name, URL, avatar, repositories, languages, etc.), create a witty and humorous bio that playfully highlights your skills and projects. Feel free to use amusing emojis like 😂, 🤖, or 😜.",
    "Using the given GitHub info, write a funny and clever bio that combines technical details with a dose of humor. Incorporate playful emojis (e.g., 🐱‍💻, 😆) to give your bio a lighthearted vibe.",
    "With your GitHub details at hand, craft a bio that’s both impressive and funny—inject some humor by referencing your projects or languages in a quirky way. Use fun emojis like 🤪 and 🎈 to enhance the comedic tone.",
    "From the provided GitHub data (including name, URL, avatar, repositories, languages), generate a bio that humorously reflects your tech journey and personality. Sprinkle in funny emojis like 😹, 🤩, or 😎 to keep it entertaining.",
    "Using your GitHub profile details, produce a bio that mixes technical prowess with playful humor. Write in a witty tone and use humorous emojis such as 😂, 🤓, and 🎉 to ensure your bio stands out.",
];

export const getPrompt = (vibe: Vibe, prompt: string, gitInfo: GithubUserData): string => {
    let finalPrompt;
    switch (vibe) {
        case Vibe.PROFESSIONAL:
            finalPrompt = professionalPrompts[Math.floor(Math.random() * professionalPrompts.length)] ;
        case Vibe.CASUAL:
            finalPrompt = casualPrompts[Math.floor(Math.random() * casualPrompts.length)];
        case Vibe.CREATIVE:
            finalPrompt = creativePrompts[Math.floor(Math.random() * creativePrompts.length)];
        case Vibe.FUNNY:
            finalPrompt =  funnyPrompts[Math.floor(Math.random() * funnyPrompts.length)];
        default:
            finalPrompt = "Generate from Following data:";   
    }

    return finalPrompt + prompt + `My Github username is ${gitInfo.user?.login} and github url is ${gitInfo.user?.html_url}. Also i have ${gitInfo.repos.length} public repositories. Listed as follows: ${gitInfo.repos.map((repo) => repo.name).join(", ")} which are written in ${gitInfo.repos.map((repo) => repo.language).join(", ")}. Combine this knowledge with your creativity to generate a bio.`;
}

