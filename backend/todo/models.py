from django.db import models
from django.core.validators import MinLengthValidator

class EventDetails(models.Model):
    event_name = models.CharField(max_length=100)
    data = models.CharField(max_length=100)
    time = models.DateTimeField()
    location = models.CharField(max_length=100)
    # image = models.ImageField(upload_to='uploads/')
    is_liked = models.BooleanField(default=False)
    # user_id = models.CharField(max_length=100)
    
    def _str_(self):
        return self.title

class UserDetails(models.Model):
    email = models.CharField(max_length=100)
    userName = models.CharField(max_length=30)
    password = models.CharField(max_length=50, validators=[
            MinLengthValidator(8, 'the field must contain at least 8 characters')
            ])
