from django.shortcuts import render
from .models import User
from .serializers import MyTokenObtainPairSerializer, UserRegistrationSerializer, UserSerializer, ResetPasswordSerializer, UserUpdateSerializer, ChangePasswordSerializer
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

# rest_framework
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import APIView, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

from shortuuid.django_fields import ShortUUIDField
import random

def generate_numeric_otp(length=7):
        # Generate a random 7-digit OTP
        otp = ''.join([str(random.randint(0, 9)) for _ in range(length)])
        return otp    


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
# User register View --------------------------------
class UserRegistrationView(generics.CreateAPIView):    
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    

    
class PasswordEmailVerify(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def get_object(self):
        email = self.kwargs['email']
        user = User.objects.get(email=email)
        
        if user:
            user.otp = generate_numeric_otp()
            uidb64 = user.pk
            
             # Generate a token and include it in the reset link sent via email
            refresh = RefreshToken.for_user(user)
            reset_token = str(refresh.access_token)

            # Store the reset_token in the user model for later verification
            user.reset_token = reset_token
            user.save()

            link = f"http://localhost:5000/create-new-password?otp={user.otp}&uidb64={uidb64}&reset_token={reset_token}"
            print(link)
            
            merge_data = {
                'link': link, 
                'email': user.email, 
                'full_name': user.full_name,
            }
            subject = f"Password Reset Request"
            text_body = render_to_string("email/password_reset.txt", merge_data)
            html_body = render_to_string("email/password_reset.html", merge_data)
            
            msg = EmailMultiAlternatives(
                subject=subject, from_email=settings.DEFAULT_FROM_EMAIL,
                to=[user.email], body=text_body
            )
            msg.attach_alternative(html_body, "text/html")
            msg.send()
        return user  
    
    
# Forgotten password
class PasswordChangeView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ResetPasswordSerializer
    
    def create(self, request, *args, **kwargs):
        payload = request.data
        
        otp = payload['otp']
        uidb64 = payload['uidb64']
        reset_token = payload['reset_token']
        password = payload['password']

        print("otp ======", otp)
        print("uidb64 ======", uidb64)
        print("reset_token ======", reset_token)
        print("password ======", password)

        user = User.objects.get(id=uidb64, otp=otp)
        if user:
            user.set_password(password)
            user.otp = ""
            user.reset_token = ""
            user.save()

            
            return Response( {"message": "Password Changed Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response( {"message": "An Error Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        


 # Update user view
class UserUpdateView(generics.RetrieveUpdateAPIView):
     queryset = User.objects.all()
     serializer_class = UserUpdateSerializer
     permission_classes = [AllowAny]    
     


#  Delete user view
class DeleteAccount(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user=self.request.user
        user.delete()

        return Response({"result":"user delete"})
    


# Users view

class UsersView(generics.ListAPIView):
     queryset = User.objects.all()
     serializer_class = UserSerializer
     permission_classes = [AllowAny]  
     
     
# This code defines another DRF View class called ProfileView, which inherits from generics.RetrieveAPIView and used to show user profile view.
class UserView(generics.RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get_object(self):
        user_id = self.kwargs['pk']

        user = User.objects.get(id=user_id)
       
        return user     
    
    
# Change passord

class ChangePasswordView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer    