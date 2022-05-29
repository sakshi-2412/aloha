from django.db import models
from django.contrib.auth.models import User


# image upload path in the format - media/<username>/<1 or 2>
def upload_path1(instance, filename):
    return '{0}/1.jpg'.format(instance.user.username)
    
def upload_path2(instance, filename):
    return '{0}/2.jpg'.format(instance.user.username)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo1 = models.ImageField(blank=True, null=True, upload_to=upload_path1)
    photo2 = models.ImageField(blank=True, null=True, upload_to=upload_path2)
    banned = models.BooleanField(default=True) 
    # banned true for restricted users, new users are always restricted

class Attendance(models.Model):
    employee = models.ForeignKey(User, related_name='employee', on_delete=models.CASCADE)
    username = models.CharField(max_length=30, blank=True)
    present = models.BooleanField(default=False) # present true for check-in, false for check-out
    date = models.DateField()
    checkIn = models.TimeField()
    checkOut = models.TimeField(null=True, blank=True)
    sumDay = models.DurationField(null=True, blank=True) # total time spent inside the office for the date
