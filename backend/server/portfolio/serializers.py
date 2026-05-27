from rest_framework import serializers
from .models import Profile, TechCategory, Project, Stat, SocialLink, Experience, ContactMessage


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'tagline', 'description',
            'availability_status', 'email', 'location', 'availability_message',
            'bio_paragraph_1', 'bio_paragraph_2', 'bio_paragraph_3',
            'whoami', 'interests'
        ]


class TechCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TechCategory
        fields = ['id', 'title', 'icon', 'items', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'tech', 'metrics',
            'icon', 'github_url', 'demo_url', 'order', 'is_featured',
            'problem_statement', 'technical_highlights',
            'outcome_metrics', 'architecture_summary',
        ]


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ['id', 'value', 'label', 'order']


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'url', 'order']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'role', 'period', 'location',
            'description', 'highlights', 'tech_used', 'is_current', 'order'
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
