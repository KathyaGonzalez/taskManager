from rest_framework import routers
from .api import TaskViewSet
from django.urls import path, include
from .views import login_jwt
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserListAPIView

router = routers.DefaultRouter()

router.register('tasks', TaskViewSet, 'tasks')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login_jwt, name='login_jwt'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("users/", UserListAPIView.as_view(), name="user-list"),
]
