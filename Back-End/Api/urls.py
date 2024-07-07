from django.urls import path, include
from . import views
from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView, UserView, login_view, logout_view
from .views import UserListByRoleAPIView, forgot_password



urlpatterns = [
    
    path('user-info/<int:user_id>/', views.UserView.as_view(), name='get_user_info'),
    
    
]
