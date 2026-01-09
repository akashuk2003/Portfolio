from django.contrib import admin
from .models import Profile, TechCategory, Project, Stat, SocialLink


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'updated_at']
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'title', 'tagline', 'description', 'availability_status')
        }),
        ('Contact', {
            'fields': ('email', 'location', 'availability_message')
        }),
        ('About Section', {
            'fields': ('bio_paragraph_1', 'bio_paragraph_2', 'bio_paragraph_3')
        }),
        ('Terminal Info', {
            'fields': ('whoami', 'interests')
        }),
    )


@admin.register(TechCategory)
class TechCategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'is_featured', 'order']
    list_editable = ['is_featured', 'order']
    list_filter = ['is_featured', 'icon']
    ordering = ['order']


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['value', 'label', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'order']
    list_editable = ['order']
    ordering = ['order']
