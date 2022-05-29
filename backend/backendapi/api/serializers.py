from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Attendance
from datetime import datetime, date, timedelta

# total working time for a day (set to 5 min for demo purpose)
totalTime = 300



class UserSerializer(serializers.ModelSerializer):
    banned = serializers.BooleanField(source='profile.banned')

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'banned']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user



class AttendCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Attendance
        fields = ('id', 'username')

    def save(self, **kwargs):
        data = self.validated_data
        username = data['username']
        user = User.objects.get(username=username) # get user instance for recognised label (username)


        if(user.profile.banned == True):
            response = {
                "banned": True
            }
            return response

        # check if attendance instance of user already exists for today
        attend = Attendance.objects.filter(employee=user, username=username, date=datetime.now().date())

        if(attend.exists()):
            attend = attend[0]

            # if request for check-out
            if(attend.present == True):
                attend.checkOut = datetime.now().time()
                attend.present = False

                # add worked hours from previous check-in to current time in sumDay
                if(attend.sumDay):
                    attend.sumDay = attend.sumDay + datetime.combine(date.today(), datetime.now().time()) - datetime.combine(date.today(), attend.checkIn)
                else:
                    attend.sumDay = datetime.combine(date.today(), datetime.now().time()) - datetime.combine(date.today(), attend.checkIn)
            
            # if request for check-in
            else:
                attend.checkIn = datetime.now().time()
                attend.present = True
    
            attend.save()
        
        else:
            attend = Attendance.objects.create(employee=user, username=username, present=True, date=datetime.now().date(), checkIn=datetime.now().time(), checkOut=datetime.now().time() )
        
        # calculate percentage attendance for today 
        per = 0
        if(attend.sumDay):
            per = (attend.sumDay*100)/totalTime
            per = round(per / timedelta(seconds=1),2)

        
        response = {
            "username":  attend.username,
            "present": attend.present,
            "date":  attend.date,
            "checkIn":  attend.checkIn.strftime("%H:%M:%S"),
            "checkOut":  attend.checkOut.strftime("%H:%M:%S"),
            "sumDay": per,
            "banned": False,
        }
        return response




class ChartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attendance
        fields = ( 'id', 'username')

    def save(self, **kwargs):
        data = self.validated_data
        username = data['username']
        user = User.objects.get(username=username) # get user instance of passed-in username


        # array for storing percentage attendance for last 6 days
        dateweek = [None] * 6

        for i in range(6):
            dateweek[i] = 0

            # filter attendance instance of user for ith last day
            datei = datetime.today() - timedelta(days=i)
            attend = Attendance.objects.filter(employee=user, date=datei)

            # if instance exists, calculate percentage
            per = 0
            if(attend.exists()):
                attend = attend[0]
                if(attend.sumDay):
                    per = (attend.sumDay*100)/totalTime
                    per = round(per / timedelta(seconds=1),2)
                    dateweek[i] = per


        response = {
            "datetwo": dateweek,
        }
        return response