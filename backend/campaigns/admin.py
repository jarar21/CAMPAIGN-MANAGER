from django.contrib import admin
from .models import Campaign,Subscriber,AddCampaign

# Register your models here.
class CampaignModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_per_page = 5
class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ('email', 'Campaign', 'created_at')
    search_fields = ('email', 'Campaign__title', 'created_at')
    list_per_page = 5
class AddCampaignModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_per_page = 5

admin.site.register(Campaign,CampaignModelAdmin)
admin.site.register(Subscriber,SubscriberModelAdmin)
admin.site.register(AddCampaign,AddCampaignModelAdmin)
