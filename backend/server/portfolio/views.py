from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, TechCategory, Project, Stat, SocialLink
from .serializers import (
    ProfileSerializer, TechCategorySerializer, ProjectSerializer,
    StatSerializer, SocialLinkSerializer
)


@api_view(['GET'])
def get_profile(request):
    """Get the single profile instance"""
    profile = Profile.objects.first()
    if profile:
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    return Response({'detail': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)


class TechCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for tech categories"""
    queryset = TechCategory.objects.all()
    serializer_class = TechCategorySerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for projects"""
    queryset = Project.objects.filter(is_featured=True)
    serializer_class = ProjectSerializer


class StatViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for stats"""
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for social links"""
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
