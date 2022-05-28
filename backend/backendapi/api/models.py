from django.db import models
from django.contrib.auth.models import User

def upload_path1(instance, filename):
    return '{0}/1.jpg'.format(instance.user.username)
    
def upload_path2(instance, filename):
    return '{0}/2.jpg'.format(instance.user.username)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo1 = models.ImageField(blank=True, null=True, upload_to=upload_path1)
    photo2 = models.ImageField(blank=True, null=True, upload_to=upload_path2)
    banned = models.BooleanField(default=True)

class Attendance(models.Model):
    employee = models.ForeignKey(User, related_name='employee', on_delete=models.CASCADE)
    username = models.CharField(max_length=30, blank=True)
    present = models.BooleanField(default=False)
    date = models.DateField()
    checkIn = models.TimeField()
    checkOut = models.TimeField(null=True, blank=True)
    sumDay = models.DurationField(null=True, blank=True)
