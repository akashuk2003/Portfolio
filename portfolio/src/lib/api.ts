import type { Profile, TechCategory, Project, Stat, SocialLink, Experience } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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

export async function fetchExperience(): Promise<Experience[]> {
    return fetchAPI<Experience[]>('/experience/');
}

export async function submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}): Promise<{ detail: string }> {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(JSON.stringify(err));
    }
    return response.json();
}
