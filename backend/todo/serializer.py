from rest_framework import serializers
from . models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDetails
        fields = ['id', 'event_name', 'data', 'is_liked', 'time','location']
# , 'image', 'user_id'
class ReactSerializer2(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['id', 'email', 'userName', 'password']