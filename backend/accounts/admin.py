from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', )
    list_editable = ( 'name',)
    search_fields = ('name',)
    list_filter = ['date_joined', ]
