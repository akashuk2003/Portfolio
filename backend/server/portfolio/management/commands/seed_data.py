from django.core.management.base import BaseCommand
from portfolio.models import Profile, TechCategory, Project, Stat, SocialLink


class Command(BaseCommand):
    help = 'Seed the database with initial portfolio data matching the React frontend'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        
        # Clear existing data
        Profile.objects.all().delete()
        TechCategory.objects.all().delete()
        Project.objects.all().delete()
        Stat.objects.all().delete()
        SocialLink.objects.all().delete()
        
        # Create Profile
        Profile.objects.create(
            name="Alex Chen",
            title="backend_developer",
            tagline="scalable systems",
            description="I architect robust APIs, optimize databases, and build distributed systems that handle millions of requests. Passionate about clean code and system design.",
            availability_status="Available for new opportunities",
            email="alex@example.com",
            location="San Francisco, CA (Remote OK)",
            availability_message="Open for freelance & full-time roles",
            bio_paragraph_1="I'm a backend engineer who loves the challenge of building systems that work flawlessly at scale. From designing database schemas to architecting microservices, I focus on creating infrastructure that's reliable, maintainable, and performant.",
            bio_paragraph_2="My journey started with a fascination for how things work under the hood. That curiosity led me through distributed systems, real-time data processing, and security engineering — always seeking to understand the fundamentals.",
            bio_paragraph_3="When I'm not optimizing queries or debugging race conditions, you'll find me contributing to open source, writing technical blogs, or exploring new programming paradigms.",
            whoami="backend_developer | system_architect",
            interests="distributed_systems, performance, open_source"
        )
        self.stdout.write(self.style.SUCCESS('Created Profile'))
        
        # Create Tech Categories
        tech_categories = [
            {"title": "Languages", "icon": "Terminal", "items": ["Python", "Go", "TypeScript", "Rust", "Java"], "order": 0},
            {"title": "Frameworks", "icon": "Server", "items": ["FastAPI", "Django", "Express", "Gin", "Spring Boot"], "order": 1},
            {"title": "Databases", "icon": "Database", "items": ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra"], "order": 2},
            {"title": "Cloud & DevOps", "icon": "Cloud", "items": ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"], "order": 3},
            {"title": "Architecture", "icon": "Cog", "items": ["Microservices", "REST APIs", "GraphQL", "gRPC", "Event-Driven"], "order": 4},
            {"title": "Security", "icon": "Shield", "items": ["OAuth 2.0", "JWT", "RBAC", "Encryption", "Penetration Testing"], "order": 5},
        ]
        for tc in tech_categories:
            TechCategory.objects.create(**tc)
        self.stdout.write(self.style.SUCCESS(f'Created {len(tech_categories)} Tech Categories'))
        
        # Create Projects
        projects = [
            {
                "title": "Distributed Task Queue",
                "description": "High-throughput task processing system handling 100K+ jobs/minute with Redis-backed queue, worker pools, and real-time monitoring dashboard.",
                "tech": ["Go", "Redis", "gRPC", "Prometheus", "Grafana"],
                "metrics": ["100K+ jobs/min", "99.99% uptime", "Sub-10ms latency"],
                "icon": "Zap",
                "github_url": "#",
                "demo_url": "#",
                "order": 0,
            },
            {
                "title": "Real-time Analytics Pipeline",
                "description": "Event streaming platform processing millions of events daily with Kafka, real-time aggregations, and data warehouse integration.",
                "tech": ["Python", "Kafka", "ClickHouse", "Kubernetes", "Airflow"],
                "metrics": ["5M events/day", "Real-time processing", "Data warehouse sync"],
                "icon": "Database",
                "github_url": "#",
                "demo_url": "#",
                "order": 1,
            },
            {
                "title": "Microservices Auth Platform",
                "description": "Enterprise-grade authentication service with OAuth 2.0, SSO, MFA, and fine-grained RBAC supporting 500K+ users.",
                "tech": ["TypeScript", "PostgreSQL", "Redis", "JWT", "Docker"],
                "metrics": ["500K+ users", "OAuth 2.0 + SSO", "Multi-tenant"],
                "icon": "Lock",
                "github_url": "#",
                "demo_url": "#",
                "order": 2,
            },
            {
                "title": "API Gateway & Rate Limiter",
                "description": "High-performance API gateway with intelligent rate limiting, request routing, circuit breakers, and detailed analytics.",
                "tech": ["Rust", "Redis", "OpenAPI", "Envoy", "AWS"],
                "metrics": ["1M+ req/sec", "P99 < 5ms", "Zero downtime deploys"],
                "icon": "Server",
                "github_url": "#",
                "demo_url": "#",
                "order": 3,
            },
        ]
        for p in projects:
            Project.objects.create(**p)
        self.stdout.write(self.style.SUCCESS(f'Created {len(projects)} Projects'))
        
        # Create Stats
        stats = [
            {"value": "7+", "label": "Years Experience", "order": 0},
            {"value": "50+", "label": "Projects Delivered", "order": 1},
            {"value": "99.9%", "label": "Uptime Achieved", "order": 2},
            {"value": "10M+", "label": "Requests/Day Handled", "order": 3},
        ]
        for s in stats:
            Stat.objects.create(**s)
        self.stdout.write(self.style.SUCCESS(f'Created {len(stats)} Stats'))
        
        # Create Social Links
        social_links = [
            {"platform": "github", "url": "https://github.com", "order": 0},
            {"platform": "linkedin", "url": "https://linkedin.com", "order": 1},
            {"platform": "twitter", "url": "https://twitter.com", "order": 2},
            {"platform": "email", "url": "mailto:alex@example.com", "order": 3},
        ]
        for sl in social_links:
            SocialLink.objects.create(**sl)
        self.stdout.write(self.style.SUCCESS(f'Created {len(social_links)} Social Links'))
        
        self.stdout.write(self.style.SUCCESS('Database seeding complete!'))
