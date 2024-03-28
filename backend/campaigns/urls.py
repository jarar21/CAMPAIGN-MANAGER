from django.urls import path
from .views import CampaignListAPIVeiw,CampaignDetailAPIVeiw,SubscribeToCampaignAPIVeiw,AddCampaignAPIVeiw

urlpatterns = [
    path('campaigns',CampaignListAPIVeiw.as_view(), name='campaigns'),
    path('campaigns/<slug>',CampaignDetailAPIVeiw.as_view(), name='campaign'),
    path('subscribe',SubscribeToCampaignAPIVeiw.as_view(), name='subscribe'),
    path('addcampaign',AddCampaignAPIVeiw.as_view(), name='addcampaign'),
]