from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.models import Profile


class LoginSerializer(serializers.Serializer):

    class Meta:
        model = User
        fields = ( 'username', 'password')

    def save(self,data):
        user = authenticate(username=data['username'], password=data['password'])
        # check if user exists for passed-in login credentials
        if(not user):
            raise serializers.ValidationError({'Error': 'Password or username is incorrect'})
        else:
            return user


class RegisterSerializer(serializers.Serializer):

    photo1 = serializers.ImageField(source='profile.photo1')
    photo2 = serializers.ImageField(source='profile.photo2')

    class Meta:
        model = User
        fields = ( 'username', 'password', 'photo1', 'first_name', 'email')
    
    def save(self, data):

        # check if user with passed-in username already exists
        if(User.objects.filter(username=data['username']).exists()):
            raise serializers.ValidationError({'Error': 'Username already exists'})

        # else create user and profile instance for passed-in details
        else:
            user = User.objects.create_user(
                username = data['username'],
                password = data['password'],
                first_name = data['name'],
                email = data['email'],)
            profile = Profile.objects.create(user = user, photo1 = data['photo1'], photo2 = data['photo2'])
            
            return user


# for fetching user details with token
class UserSerializer(serializers.ModelSerializer):

    banned = serializers.BooleanField(source='profile.banned')
    photo = serializers.CharField(source='profile.photo1')
    
    class Meta:
        model = User
        fields = ( 'id', 'username', 'first_name', 'email', 'banned', 'photo')
