"""
URL configuration for Main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from Api import views
from rest_framework import routers
from Api.views import get_user_info

router = routers.DefaultRouter()
router.register(r'users',views.UserView)
router.register(r'disponibilite',views.DisponibilteView)
router.register(r'Exams', views.ExamView)
router.register(r'login', views.LoginViewSet, basename='login')
router.register(r'assignments', views.AssignmentView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('Api/', include(router.urls)),
    path('Api/users/<int:user_id>/', get_user_info, name='get_user_info'),
    path('Api/forgot/', views.UserView.as_view({'post': 'forgot_password'}), name='forgot_password'),
   
    
]
