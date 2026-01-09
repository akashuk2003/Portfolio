import type { Profile, TechCategory, Project, Stat, SocialLink } from './types';

const API_BASE_URL = 'http://localhost:8000/api';

async function fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return response.json();
}

export async function fetchProfile(): Promise<Profile> {
    return fetchAPI<Profile>('/profile/');
}

export async function fetchTechStack(): Promise<TechCategory[]> {
    return fetchAPI<TechCategory[]>('/tech-stack/');
}

export async function fetchProjects(): Promise<Project[]> {
    return fetchAPI<Project[]>('/projects/');
}

export async function fetchStats(): Promise<Stat[]> {
    return fetchAPI<Stat[]>('/stats/');
}

export async function fetchSocialLinks(): Promise<SocialLink[]> {
    return fetchAPI<SocialLink[]>('/social-links/');
}
