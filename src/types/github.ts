
export interface GithubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
}

export interface GithubRepo {
    name: string;
    description: string | null;
    language: string | null | string[];
    topics?: string[];
}

export interface ResponseStatus {
    code: number;
    message: string;
}

export interface GithubUserData {
    user: GithubUser | null;
    repos: GithubRepo[];
    status: ResponseStatus;
}