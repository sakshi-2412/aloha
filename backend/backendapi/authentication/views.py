from rest_framework import permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import *
from django.contrib.auth.models import User

# create or get token for user
def auth_token(user):
    token, _ = Token.objects.get_or_create(user=user)
    return token


class LoginView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    
    def post(self , request):
        serializer_class = self.get_serializer(data=request.data)
        serializer_class.is_valid(raise_exception=True)
        user = serializer_class.save(request.data)
        token = auth_token(user)
        response = {
            'token' : token.key
        }
        return Response(response, status = status.HTTP_200_OK)


class RegisterView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer_class = self.get_serializer(data=request.data)
        serializer_class.is_valid(raise_exception=True)
        user = serializer_class.save(request.data)
        token = auth_token(user)
        response = {
            'token' : token.key
        }
        return Response(response, status = status.HTTP_200_OK)
        

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,) # token authentication required
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer_class = self.get_serializer(request.user)
        return Response(serializer_class.data, status = status.HTTP_200_OK)