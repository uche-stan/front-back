from django.urls import path 
from . import views as accounts_views


urlpatterns = [
    
    path('token', accounts_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/register', accounts_views.UserRegistrationView.as_view(), name='register'),
    path('user/password-reset/<email>/', accounts_views.PasswordEmailVerify.as_view(), name='password_reset'),
    path('user/password-reset/', accounts_views.PasswordChangeView.as_view(), name='password_change'),
    
     # api for axios
    path('user/update/<int:pk>', accounts_views.UserUpdateView.as_view(), name='update'),
    path('user/delete/<int:pk>', accounts_views.DeleteAccount.as_view(), name='delete'),
    path('user/', accounts_views.UsersView.as_view(), name='users'),
    path('user/<int:pk>', accounts_views.UserView.as_view(), name='user-detail'),
    
    path('user/password-change/<int:pk>/', accounts_views.ChangePasswordView.as_view(), name='change_password'),
    
]


