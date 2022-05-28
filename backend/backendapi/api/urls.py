from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('attend/create/', AttendCreateView.as_view()),
    path('attend/chart/', ChartView.as_view()),
]