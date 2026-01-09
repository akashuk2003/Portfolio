from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tech-stack', views.TechCategoryViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'stats', views.StatViewSet)
router.register(r'social-links', views.SocialLinkViewSet)

urlpatterns = [
    path('profile/', views.get_profile, name='profile'),
    path('', include(router.urls)),
]
