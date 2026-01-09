// API response types matching Django REST API

export interface Profile {
    id: number;
    name: string;
    title: string;
    tagline: string;
    description: string;
    availability_status: string;
    email: string;
    location: string;
    availability_message: string;
    bio_paragraph_1: string;
    bio_paragraph_2: string;
    bio_paragraph_3: string;
    whoami: string;
    interests: string;
}

export interface TechCategory {
    id: number;
    title: string;
    icon: 'Terminal' | 'Server' | 'Database' | 'Cloud' | 'Cog' | 'Shield';
    items: string[];
    order: number;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    metrics: string[];
    icon: 'Zap' | 'Database' | 'Lock' | 'Server' | 'Code' | 'Globe';
    github_url: string;
    demo_url: string;
    order: number;
    is_featured: boolean;
}

export interface Stat {
    id: number;
    value: string;
    label: string;
    order: number;
}

export interface SocialLink {
    id: number;
    platform: 'github' | 'linkedin' | 'twitter' | 'email';
    url: string;
    order: number;
}
