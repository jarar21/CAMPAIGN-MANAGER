from rest_framework import serializers
from .models import Campaign,Subscriber,AddCampaign



class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'
        extra_kwargs = {'partial': True}



class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'

class AddCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddCampaign
        fields = '__all__'