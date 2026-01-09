from django.db import models


class Profile(models.Model):
    """Single profile for the portfolio owner"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, help_text="e.g., backend_developer")
    tagline = models.CharField(max_length=200, help_text="e.g., scalable systems")
    description = models.TextField(help_text="Main bio description")
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
    """Portfolio project"""
    ICON_CHOICES = [
        ('Zap', 'Zap'),
        ('Database', 'Database'),
        ('Lock', 'Lock'),
        ('Server', 'Server'),
        ('Code', 'Code'),
        ('Globe', 'Globe'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech = models.JSONField(help_text="Array of technology names")
    metrics = models.JSONField(help_text="Array of metric strings")
    icon = models.CharField(max_length=50, choices=ICON_CHOICES)
    github_url = models.URLField(blank=True, default="#")
    demo_url = models.URLField(blank=True, default="#")
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Stat(models.Model):
    """Statistics for the About section"""
    value = models.CharField(max_length=50, help_text="e.g., 7+, 99.9%, 10M+")
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
