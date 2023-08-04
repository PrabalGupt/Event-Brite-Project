from django.contrib import admin
from .models import EventDetails, UserDetails

# Register your models here.
class EventAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'data','is_liked', 'time','location')
# , 'image', 'user_id'
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'userName', 'password')

admin.site.register(EventDetails, EventAdmin)
admin.site.register(UserDetails, UserAdmin)