from django.core.management.base import BaseCommand
from portfolio.models import Profile, TechCategory, Project, Stat, SocialLink, Experience


class Command(BaseCommand):
    help = 'Seed portfolio with real data from Akash UK resume'

    def handle(self, *args, **kwargs):
        self.seed_profile()
        self.seed_stats()
        self.seed_social_links()
        self.seed_tech_stack()
        self.seed_projects()
        self.seed_experience()
        self.stdout.write(self.style.SUCCESS('[DONE] All portfolio data seeded successfully.'))

    def seed_profile(self):
        Profile.objects.all().delete()
        Profile.objects.create(
            name="Akash U K",
            title="backend_developer",
            tagline="I build systems that stay up",
            description=(
                "Backend-focused Full Stack Developer with production experience building "
                "multi-tenant SaaS platforms, RESTful APIs, and AI-integrated applications. "
                "Skilled in cloud deployments, ETL pipelines, async processing, and LLM integrations."
            ),
            availability_status="Open to new opportunities",
            email="akashuk48@gmail.com",
            location="Palakkad, Kerala (Remote OK)",
            availability_message="Available for full-time roles & freelance projects",
            bio_paragraph_1=(
                "I'm a Backend-focused Full Stack Developer who has spent the last year building "
                "production multi-tenant SaaS platforms at Avanzo Cyber Security Solutions — "
                "covering LMS, ERP, HRMS, and GRC (MyCISO) products all from a single Django codebase."
            ),
            bio_paragraph_2=(
                "I think in systems first: database schema, API contracts, auth boundaries, "
                "then UI. I've shipped billing engines, role-based access control across multiple "
                "client tenants, CI/CD pipelines, and AI-integrated document workflows in production."
            ),
            bio_paragraph_3=(
                "Outside work, I build personal projects to sharpen skills — a QSR SaaS platform, "
                "an AI documentation summarizer, and a developer upskill platform with real-time "
                "features. B.Sc in AI & ML from STC Coimbatore."
            ),
            whoami="backend_developer | saas_engineer | full_stack",
            interests="multi_tenant_systems, api_design, llm_integrations, devops",
        )
        self.stdout.write('  ✓ Profile seeded')

    def seed_stats(self):
        Stat.objects.all().delete()
        stats = [
            ("1+", "Years Production Experience", 0),
            ("8+", "Projects Shipped", 1),
            ("4", "SaaS Platforms Built", 2),
            ("99.9%", "Uptime Achieved", 3),
        ]
        for value, label, order in stats:
            Stat.objects.create(value=value, label=label, order=order)
        self.stdout.write('  ✓ Stats seeded')

    def seed_social_links(self):
        SocialLink.objects.all().delete()
        links = [
            ("github", "https://github.com/akashuk48", 0),
            ("linkedin", "https://linkedin.com/in/akash-u-k", 1),
            ("email", "mailto:akashuk48@gmail.com", 2),
        ]
        for platform, url, order in links:
            SocialLink.objects.create(platform=platform, url=url, order=order)
        self.stdout.write('  ✓ Social links seeded')

    def seed_tech_stack(self):
        TechCategory.objects.all().delete()
        categories = [
            {
                "title": "Backend",
                "icon": "Server",
                "order": 0,
                "items": ["Python", "Django", "Django REST Framework", "Celery", "WebSockets", "JWT", "OAuth2"],
            },
            {
                "title": "Databases",
                "icon": "Database",
                "order": 1,
                "items": ["PostgreSQL", "MySQL", "SQLite", "Supabase", "Redis"],
            },
            {
                "title": "Cloud & DevOps",
                "icon": "Cloud",
                "order": 2,
                "items": ["AWS (EC2, S3, RDS)", "Docker", "GitHub Actions", "Vercel", "Coolify", "MinIO"],
            },
            {
                "title": "Frontend",
                "icon": "Terminal",
                "order": 3,
                "items": ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "HTML/CSS"],
            },
            {
                "title": "AI & Integrations",
                "icon": "Cog",
                "order": 4,
                "items": ["Gemini API", "OpenAI API", "Agentic Coding", "LLM Integrations", "ETL Pipelines"],
            },
            {
                "title": "Architecture & Testing",
                "icon": "Shield",
                "order": 5,
                "items": ["Multi-Tenant Architecture", "RBAC", "REST API Design", "Pytest", "Django Test Framework", "CI/CD"],
            },
        ]
        for cat in categories:
            TechCategory.objects.create(**cat)
        self.stdout.write('  ✓ Tech stack seeded')

    def seed_projects(self):
        Project.objects.all().delete()
        projects = [
            {
                "title": "MyCISO — GRC Platform",
                "description": (
                    "Cybersecurity Governance, Risk & Compliance (GRC) platform for managing "
                    "ISO/NIST frameworks across multiple client organisations from a single "
                    "multi-tenant Django backend. Serves real enterprise clients at Avanzo."
                ),
                "tech": ["Django", "MySQL", "AWS EC2", "Docker", "JWT", "RBAC", "DRF"],
                "metrics": ["Multi-tenant", "Enterprise clients", "RBAC secured", "Production AWS"],
                "icon": "Shield",
                "github_url": "#",
                "demo_url": "#",
                "order": 0,
                "is_featured": True,
                "problem_statement": (
                    "Enterprise clients needed a centralised platform to manage cybersecurity "
                    "governance, risk assessments, and compliance across ISO 27001 and NIST "
                    "frameworks — without paying for separate instances."
                ),
                "technical_highlights": [
                    "Multi-tenant architecture: single codebase serving N client organisations with strict data isolation",
                    "RBAC with granular permissions across compliance modules and risk domains",
                    "Secured with JWT auth and audit logging for compliance traceability",
                    "Deployed on AWS EC2 with Docker for reproducible, zero-downtime releases",
                ],
                "outcome_metrics": [
                    {"label": "Architecture", "value": "Multi-tenant"},
                    {"label": "Deployment", "value": "AWS + Docker"},
                    {"label": "Auth", "value": "JWT + RBAC"},
                ],
                "architecture_summary": (
                    "Django DRF backend with tenant-aware middleware. MySQL with per-tenant "
                    "schema filtering. Docker-compose on AWS EC2. JWT-based auth with role "
                    "resolution per tenant context."
                ),
            },
            {
                "title": "Hospital Management System",
                "description": (
                    "Full-featured HMS with OP/IP patient workflows, real-time billing engine, "
                    "pharmacy inventory, lab booking, and multi-role access for doctors, nurses, "
                    "pharmacists, and billing staff. Built and shipped at Avanzo."
                ),
                "tech": ["Django", "DRF", "MySQL", "Docker", "AWS", "JWT", "RBAC", "Celery"],
                "metrics": ["200+ records/day", "Multi-role RBAC", "Real-time billing", "Production clinic"],
                "icon": "Database",
                "github_url": "#",
                "demo_url": "#",
                "order": 1,
                "is_featured": True,
                "problem_statement": (
                    "A production clinic needed a unified platform for OP/IP workflows, billing, "
                    "pharmacy, and lab — with strict role boundaries so each staff type only sees "
                    "what they need."
                ),
                "technical_highlights": [
                    "Role-based access: doctors, nurses, pharmacists, billing staff each have isolated views",
                    "Real-time billing engine with auto-calculation, discount rules, and PDF generation",
                    "Celery async workers for lab report generation and email notifications",
                    "Django signals for inventory deduction on pharmacy dispensing",
                ],
                "outcome_metrics": [
                    {"label": "Daily records", "value": "200+"},
                    {"label": "Roles managed", "value": "6+"},
                    {"label": "Billing accuracy", "value": "Automated"},
                ],
                "architecture_summary": (
                    "Django + DRF REST API with RBAC middleware. MySQL database with optimised "
                    "billing queries. Celery + Redis for async tasks. Docker on AWS."
                ),
            },
            {
                "title": "LMS — Multi-Tenant Learning Platform",
                "description": (
                    "Production Learning Management System serving multiple client organisations "
                    "from a single codebase. Content delivery, JWT auth, MinIO/S3 file storage, "
                    "and per-tenant course management. Built at Avanzo."
                ),
                "tech": ["Django", "MySQL", "AWS S3", "MinIO", "Docker", "JWT", "DRF"],
                "metrics": ["Multi-tenant", "S3 file storage", "Per-tenant isolation", "CI/CD pipeline"],
                "icon": "Globe",
                "github_url": "#",
                "demo_url": "#",
                "order": 2,
                "is_featured": True,
                "problem_statement": (
                    "Multiple client organisations needed independent LMS environments — separate "
                    "course catalogues, user bases, and branding — without the cost of running "
                    "separate servers for each."
                ),
                "technical_highlights": [
                    "Tenant-aware middleware: all queries filtered by organisation context automatically",
                    "MinIO/S3 file storage for course content with pre-signed URL delivery",
                    "JWT auth with per-tenant user isolation — no cross-tenant data leakage possible",
                    "GitHub Actions CI/CD with automated test suite before every deploy",
                ],
                "outcome_metrics": [
                    {"label": "Architecture", "value": "Multi-tenant"},
                    {"label": "Storage", "value": "S3 + MinIO"},
                    {"label": "CI/CD", "value": "GitHub Actions"},
                ],
                "architecture_summary": (
                    "Django DRF backend with tenant middleware. MySQL. MinIO for file storage with "
                    "S3-compatible API. Docker-compose. GitHub Actions for automated deploy."
                ),
            },
            {
                "title": "AI Documentation Summarizer",
                "description": (
                    "Upload any document and get AI-powered analysis with a conversational Q&A "
                    "interface. Built with Django backend, Next.js frontend, and Gemini/OpenAI "
                    "for intelligent document understanding."
                ),
                "tech": ["Django", "Next.js", "Gemini API", "OpenAI API", "PostgreSQL", "Vercel"],
                "metrics": ["Multi-LLM support", "Conversational Q&A", "Vercel deployed", "RAG-style retrieval"],
                "icon": "Zap",
                "github_url": "#",
                "demo_url": "#",
                "order": 3,
                "is_featured": True,
                "problem_statement": (
                    "Professionals drowning in long PDFs and documentation needed a way to get "
                    "instant answers — upload once, ask anything, get grounded responses."
                ),
                "technical_highlights": [
                    "Multi-LLM support: switches between Gemini and OpenAI based on document type",
                    "Document chunking and embedding for accurate context retrieval",
                    "Conversational interface maintains chat history per document session",
                    "Django API + Next.js frontend, deployed on Vercel with PostgreSQL",
                ],
                "outcome_metrics": [
                    {"label": "LLMs integrated", "value": "2 (Gemini + OpenAI)"},
                    {"label": "Interface", "value": "Conversational Q&A"},
                    {"label": "Deploy", "value": "Vercel"},
                ],
                "architecture_summary": (
                    "Django REST API for document ingestion and LLM orchestration. "
                    "PostgreSQL for session storage. Next.js frontend on Vercel. "
                    "Gemini/OpenAI APIs with document chunking strategy."
                ),
            },
            {
                "title": "QSR Restaurant SaaS Platform",
                "description": (
                    "Multi-tenant SaaS for quick-service restaurants — menu management, order "
                    "processing, inventory tracking, and staff management from one platform. "
                    "Built with Django, React, and Supabase."
                ),
                "tech": ["Django", "React", "PostgreSQL", "Supabase", "Vercel", "DRF"],
                "metrics": ["Multi-tenant SaaS", "Real-time orders", "Supabase realtime", "Vercel deployed"],
                "icon": "Server",
                "github_url": "#",
                "demo_url": "#",
                "order": 4,
                "is_featured": True,
                "problem_statement": (
                    "Small QSR chains needed affordable SaaS tooling — menu management, live "
                    "order tracking, and inventory — without paying enterprise restaurant software fees."
                ),
                "technical_highlights": [
                    "Multi-tenant: each restaurant client gets isolated data and custom menu config",
                    "Supabase real-time for live order status updates across kitchen and counter",
                    "Django DRF API with React frontend, deployed on Vercel",
                    "Role separation: owner, manager, cashier, kitchen staff",
                ],
                "outcome_metrics": [
                    {"label": "Architecture", "value": "Multi-tenant SaaS"},
                    {"label": "Real-time", "value": "Supabase"},
                    {"label": "Roles", "value": "4 staff types"},
                ],
                "architecture_summary": (
                    "Django + DRF API. React frontend on Vercel. PostgreSQL via Supabase with "
                    "real-time subscriptions. Tenant-aware query layer."
                ),
            },
            {
                "title": "Developer Upskill Platform",
                "description": (
                    "Full-featured learning platform for developers — structured learning paths, "
                    "XP and badge progression system, creator studio for content authors, and "
                    "real-time features via WebSockets."
                ),
                "tech": ["Django", "DRF", "PostgreSQL", "React", "Redis", "WebSockets", "Celery"],
                "metrics": ["XP/badge system", "Real-time WebSockets", "Creator studio", "Redis caching"],
                "icon": "Code",
                "github_url": "#",
                "demo_url": "#",
                "order": 5,
                "is_featured": True,
                "problem_statement": (
                    "Developers needed structured, gamified learning paths — not just video dumps. "
                    "A platform where progress is tracked with XP, skills unlock badges, and "
                    "creators can publish technical content."
                ),
                "technical_highlights": [
                    "XP and badge engine: tracks progress, awards achievements, calculates skill levels",
                    "WebSockets for real-time notifications (new content, badge unlocks, leaderboard)",
                    "Creator studio: content authors can structure courses, add quizzes, track completions",
                    "Redis for session caching and Celery for async badge evaluation tasks",
                ],
                "outcome_metrics": [
                    {"label": "Real-time", "value": "WebSockets"},
                    {"label": "Gamification", "value": "XP + Badges"},
                    {"label": "Async", "value": "Celery + Redis"},
                ],
                "architecture_summary": (
                    "Django + DRF backend. PostgreSQL for progress tracking. Redis + Celery for "
                    "async badge processing. Django Channels for WebSocket real-time features. "
                    "React frontend."
                ),
            },
        ]
        for p in projects:
            Project.objects.create(**p)
        self.stdout.write('  ✓ Projects seeded')

    def seed_experience(self):
        Experience.objects.all().delete()
        experiences = [
            {
                "company": "Avanzo Cyber Security Solutions",
                "role": "Python Backend Developer",
                "period": "Feb 2025 – Present",
                "location": "Thrissur, Kerala",
                "description": (
                    "Building and maintaining multi-tenant backend systems for LMS, ERP, HRMS, "
                    "and GRC (MyCISO) platforms — all serving multiple enterprise clients from "
                    "a single Django codebase."
                ),
                "highlights": [
                    "Built multi-tenant SaaS backend for LMS, ERP, HRMS, and MyCISO GRC platforms",
                    "Designed RESTful APIs for user management, course delivery, HR workflows, and compliance modules",
                    "Secured all endpoints with JWT authentication and granular RBAC",
                    "Managed PostgreSQL/MySQL databases with optimised queries and indexing",
                    "Implemented CI/CD pipelines via GitHub Actions with automated test suites",
                    "Deployed on AWS EC2 with Docker for reproducible, zero-downtime releases",
                ],
                "tech_used": ["Python", "Django", "DRF", "PostgreSQL", "MySQL", "Docker", "AWS", "JWT", "RBAC", "GitHub Actions"],
                "is_current": True,
                "order": 0,
            },
            {
                "company": "Luminar Technolabs",
                "role": "Python Full Stack Development Intern",
                "period": "2021 – Apr 2024",
                "location": "Cochin, Kerala",
                "description": (
                    "Trained in Python full stack development covering Django, REST APIs, "
                    "React, and database design as part of an intensive program alongside B.Sc studies."
                ),
                "highlights": [
                    "Completed intensive Python full stack curriculum covering Django, React, and PostgreSQL",
                    "Built foundational projects covering REST API design, authentication, and frontend integration",
                    "Gained practical experience in Git workflows and agile development practices",
                ],
                "tech_used": ["Python", "Django", "React", "PostgreSQL", "REST APIs", "Git"],
                "is_current": False,
                "order": 1,
            },
        ]
        for exp in experiences:
            Experience.objects.create(**exp)
        self.stdout.write('  ✓ Experience seeded')
