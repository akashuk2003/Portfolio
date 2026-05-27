from django.db import models


class Profile(models.Model):
    """Single profile for the portfolio owner"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, help_text="e.g., backend_developer")
    tagline = models.CharField(max_length=200, help_text="Short hook: e.g., I build systems that stay up")
    description = models.TextField(help_text="Main bio description (1–2 sentences)")
    availability_status = models.CharField(max_length=200, default="Available for new opportunities")
    email = models.EmailField()
    location = models.CharField(max_length=200)
    availability_message = models.CharField(max_length=200, default="Open for freelance & full-time roles")

    # About section
    bio_paragraph_1 = models.TextField(blank=True)
    bio_paragraph_2 = models.TextField(blank=True)
    bio_paragraph_3 = models.TextField(blank=True)

    # Terminal info for About section
    whoami = models.CharField(max_length=200, default="backend_developer | system_architect")
    interests = models.CharField(max_length=300, default="distributed_systems, performance, open_source")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name


class TechCategory(models.Model):
    """Technology category with skills"""
    ICON_CHOICES = [
        ('Terminal', 'Terminal'),
        ('Server', 'Server'),
        ('Database', 'Database'),
        ('Cloud', 'Cloud'),
        ('Cog', 'Cog'),
        ('Shield', 'Shield'),
    ]

    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, choices=ICON_CHOICES)
    items = models.JSONField(help_text="Array of technology names")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Tech Category"
        verbose_name_plural = "Tech Categories"
        ordering = ['order']

    def __str__(self):
        return self.title


class Project(models.Model):
    """Portfolio project with case study fields"""
    ICON_CHOICES = [
        ('Zap', 'Zap'),
        ('Database', 'Database'),
        ('Lock', 'Lock'),
        ('Server', 'Server'),
        ('Code', 'Code'),
        ('Globe', 'Globe'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(help_text="Problem/solution overview (2–3 sentences)")
    tech = models.JSONField(help_text="Array of technology names")
    metrics = models.JSONField(help_text="Array of result strings e.g. ['99.9% uptime', '3x faster']")
    icon = models.CharField(max_length=50, choices=ICON_CHOICES)
    github_url = models.URLField(blank=True, default="#")
    demo_url = models.URLField(blank=True, default="#")
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    # Case study fields
    problem_statement = models.TextField(
        blank=True,
        help_text="What specific problem did this solve? (1–2 sentences)"
    )
    technical_highlights = models.JSONField(
        default=list,
        help_text="Key engineering decisions e.g. ['Chose PostgreSQL for JSONB support', 'Used Celery for async billing']"
    )
    outcome_metrics = models.JSONField(
        default=list,
        help_text="Structured results: [{'label': 'Uptime', 'value': '99.9%'}, ...]"
    )
    architecture_summary = models.TextField(
        blank=True,
        help_text="One-paragraph architecture description"
    )

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Stat(models.Model):
    """Statistics for the About / SignalBar section"""
    value = models.CharField(max_length=50, help_text="e.g., 5+, 99.9%, 12+")
    label = models.CharField(max_length=100, help_text="e.g., Years Experience")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.value} - {self.label}"


class SocialLink(models.Model):
    """Social media links"""
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'Twitter'),
        ('email', 'Email'),
    ]

    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    url = models.CharField(max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.platform


class Experience(models.Model):
    """Career timeline entry"""
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    period = models.CharField(max_length=100, help_text="e.g., Jan 2023 – Present")
    location = models.CharField(max_length=200, blank=True)
    description = models.TextField(help_text="Brief role description")
    highlights = models.JSONField(
        default=list,
        help_text="Key achievements e.g. ['Built billing engine', 'Led team of 3']"
    )
    tech_used = models.JSONField(
        default=list,
        help_text="Technologies used in this role"
    )
    is_current = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Experience"
        verbose_name_plural = "Experience"

    def __str__(self):
        return f"{self.role} @ {self.company}"


class ContactMessage(models.Model):
    """Submitted contact form messages"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"{self.name} — {self.subject[:50]}"
