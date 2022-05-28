from rest_framework import viewsets, generics, status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .serializers import *
from .models import *
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_filed = 'id'

class AttendCreateView(generics.GenericAPIView):
    
    serializer_class = AttendCreateSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = serializer.save()
        return Response(response,status=status.HTTP_200_OK)

class ChartView(generics.GenericAPIView):
    
    serializer_class = ChartSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = serializer.save()
        return Response(response,status=status.HTTP_200_OK)