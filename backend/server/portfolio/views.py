from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, TechCategory, Project, Stat, SocialLink, Experience, ContactMessage
from .serializers import (
    ProfileSerializer, TechCategorySerializer, ProjectSerializer,
    StatSerializer, SocialLinkSerializer, ExperienceSerializer,
    ContactMessageSerializer,
)


@api_view(['GET'])
def get_profile(request):
    """Get the single profile instance"""
    profile = Profile.objects.first()
    if profile:
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    return Response({'detail': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def submit_contact(request):
    """Accept a contact form submission"""
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'detail': 'Message received. I will get back to you soon!'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TechCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TechCategory.objects.all()
    serializer_class = TechCategorySerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_featured=True)
    serializer_class = ProjectSerializer


class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
