from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()



from djoser.serializers import UserCreateSerializer


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'name', 'password']
        
        
class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = ['id', 'email', 'name', ]

# ****************************************************************

# JWT Authentication
# ****************************************************************

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # These are claims, you can add custom claims
        token['id'] = user.id
        token['username'] = user.username
        token['name'] = user.name
        token['email'] = user.email
        token['phone'] = user.phone
        token['profession'] = user.profession

        token['address'] = user.address
        token['photo'] = str(user.photo)
        token['organizer'] = str(user.is_organizer)
        token['agent'] = str(user.is_agent)
        token['date_joined'] = str(user.date_joined)

        # ...
        return token
    



# Register user

# JWT Registration
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, max_length=60, min_length=8, required=True, validators=[
                                     validate_password], style={})
    re_password = serializers.CharField(
        write_only=True, required=True, style={})

    class Meta:
        model = User
        fields = ('name', 'email', 'password', 're_password')

        # extra_kwargs = {'email': {'validators': [
        #     UniqueValidator(queryset=User.objects.all())], }}
        
    def validate(self, attrs):
        if attrs['email'].exists():
            raise serializers.ValidationError('User already exists')
        return super().validate(attrs)

    def validate(self, attrs):
        if attrs['password'] != attrs['re_password']:
            raise serializers.ValidationError('Password does not match')
        return super().validate(attrs)

    def create(self, validated_data):
        # username = validated_data['username']
        name = validated_data['name']
        email = validated_data['email']
        password = validated_data['password']

        user = User.objects.create(email=email, name=name)
        # email_username, mobile = user.email.split('@')
        user.set_password(password)
        user.save()

        return user
    


# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = '__all__'    

# Forgotten password
class ResetPasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    re_password = serializers.CharField(write_only=True, required=True)
    # old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ( 'password', 're_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['re_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    # def validate_old_password(self, value):
    #     user = self.context['request'].user
    #     if not user.check_password(value):
    #         raise serializers.ValidationError({"old_password": "Old password is not correct"})
    #     return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance        
    

# User
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["name", "email", "phone", "profession", "photo", "address" ]
        





# Update user

class UserUpdateSerializer(serializers.ModelSerializer):
    

    class Meta:
        email = serializers.EmailField(read_only=True)

        model = User
        fields = ["name", "email", "phone", "profession", "photo", "gender", "address" ]
        
    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value    
        
    def update(self, instance, validated_data):
        
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        # instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.profession = validated_data.get('profession', instance.profession)
        instance.address = validated_data.get('address', instance.address)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.gender = validated_data.get('address', instance.gender)
        
        instance.save()
        # return super().update(instance, validated_data)
        return instance
    
    


# Change Password

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance    
    