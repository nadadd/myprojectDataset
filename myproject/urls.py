from django.urls import path, include
from rest_framework.routers import DefaultRouter
from criteria.views import DatasetViewSet

router = DefaultRouter()
router.register(r'datasets', DatasetViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

