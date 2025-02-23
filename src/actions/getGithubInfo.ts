"use server";
import { GithubUserData, GithubUser, GithubRepo } from "@/types/github";
import axios from "axios";


async function fetchData(url: string) {
    const response = await axios.get(url, {
        headers: {
            Accept: "application/vnd.github.v3+json",
            'Cache-Control': 'max-age=60'
        }
    });

    if (response.status != 200) {
        console.error(`Failed to fetch data from ${url}: ${response.status}`);
        return null;
    }

    return await response.data;
}

export async function fetchGithubUserData(username: string): Promise<GithubUserData> {
    try {
        const userUrl:string = `https://api.github.com/users/${username}`;
        const reposUrl:string = `https://api.github.com/users/${username}/repos`;

        const [userData, reposData] = await Promise.all([
            fetchData(userUrl),
            fetchData(reposUrl),
        ]);

        if (!userData || !reposData) {
            console.error("Failed to fetch GitHub data.");
            return {
                user: null,
                repos: [],
                status: { code: 500, message: "Failed to fetch GitHub data." },
            }
        }

        const user: GithubUser = {
            login: userData.login,
            avatar_url: userData.avatar_url,
            html_url: userData.html_url,
            name: userData.name,
            company: userData.company,
            blog: userData.blog,
            location: userData.location,
            email: userData.email,
            bio: userData.bio,
        };

        const slicedRepos: number = reposData.length > 10 ? 10 : reposData.length;

        const repos: GithubRepo[] = reposData.slice(0, slicedRepos).map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language + repo.topics ? repo.topics : [],
        }));
        console.log("GitHub user data fetched successfully.");
        return { user, repos, status: { code:200 , message: "Data fetched successfully" } };
    } catch (error) {
        console.error("Error fetching GitHub user data:", error);
        return {
            user: null,
            repos: [],
            status: { code: 500, message: "Error fetching GitHub user data." },
        }
    }
}
