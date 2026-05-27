from django.contrib import admin
from .models import Profile, TechCategory, Project, Stat, SocialLink, Experience, ContactMessage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'location', 'availability_status', 'updated_at']
    fieldsets = (
        ('Identity', {'fields': ('name', 'title', 'tagline', 'description', 'email', 'location')}),
        ('Availability', {'fields': ('availability_status', 'availability_message')}),
        ('About Section', {'fields': ('bio_paragraph_1', 'bio_paragraph_2', 'bio_paragraph_3')}),
        ('Terminal Info', {'fields': ('whoami', 'interests')}),
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_featured']
    list_editable = ['order', 'is_featured']
    list_filter = ['is_featured']
    fieldsets = (
        ('Overview', {'fields': ('title', 'description', 'icon', 'order', 'is_featured')}),
        ('Links', {'fields': ('github_url', 'demo_url')}),
        ('Stack & Metrics', {'fields': ('tech', 'metrics')}),
        ('Case Study', {
            'classes': ('collapse',),
            'fields': ('problem_statement', 'technical_highlights', 'outcome_metrics', 'architecture_summary'),
        }),
    )


@admin.register(TechCategory)
class TechCategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['value', 'label', 'order']
    list_editable = ['order']


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'order']
    list_editable = ['order']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'period', 'is_current', 'order']
    list_editable = ['order', 'is_current']
    list_filter = ['is_current']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read']
    list_editable = ['is_read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
