from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics,response,status
from .models import Campaign,Subscriber,AddCampaign
from .serializers import CampaignSerializer,SubscriberSerializer,AddCampaignSerializer
import cloudinary.uploader
from django.core.files.base import ContentFile
import base64
from django.shortcuts import get_object_or_404
# Create your views here.

class CampaignListAPIVeiw(generics.ListAPIView):
    
    serializer_class=CampaignSerializer

    def get_queryset(self):
        return Campaign.objects.all()
    
class CampaignDetailAPIVeiw(generics.GenericAPIView):
    serializer_class = CampaignSerializer
    queryset = Campaign.objects.all()  # Define the queryset explicitly

    def get(self, request, slug):
        campaign = get_object_or_404(self.queryset, slug=slug)
        serializer = self.serializer_class(campaign)
        return Response(serializer.data)

    def put(self, request, slug):
        campaign = get_object_or_404(Campaign, slug=slug)
        serializer = self.serializer_class(campaign, data=request.data, partial=True)
        if serializer.is_valid():
            # Check if the logo has changed in the request
            logo_changed = request.data.get('logo') is not None
            if logo_changed:
                try:
                    # Decode base64 string to binary data
                    base64_data = request.data.get('logo')
                    image_data = base64.b64decode(base64_data)
                    
                    # Upload file to Cloudinary
                    upload_result = cloudinary.uploader.upload(image_data, folder="logos/")

                    # Update logo URL in the serializer data
                    serializer.validated_data['logo'] = self.remove_cloudinary_prefix(upload_result['secure_url'])
                except Exception as e:
                    return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Save the updated data including logo change
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, slug, *args, **kwargs):
        campaign = get_object_or_404(Campaign, slug=slug)
        campaign.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def remove_cloudinary_prefix(self, url):
        # Remove the specified prefix from the Cloudinary URL
        prefix_to_remove = "https://res.cloudinary.com/dzplxvf5r/"
        if url.startswith(prefix_to_remove):
            return url[len(prefix_to_remove):]
        return url
    
    
class SubscribeToCampaignAPIVeiw(generics.CreateAPIView):
    serializer_class=SubscriberSerializer

    def get_queryset(self):
        return Subscriber.objects.all()
    
class AddCampaignAPIVeiw(generics.CreateAPIView):
    serializer_class = AddCampaignSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get the base64-encoded image data from the request
        base64_data = request.data.get('logo')

        if base64_data:
            try:
                # Decode base64 string to binary data
                image_data = base64.b64decode(base64_data)
                
                # Upload file to Cloudinary
                upload_result = cloudinary.uploader.upload(image_data, folder="logos/")

                # Create and save the object with the modified Cloudinary URL
                validated_data = serializer.validated_data
                validated_data['logo'] = self.remove_cloudinary_prefix(upload_result['secure_url'])
                instance = serializer.save()  # Save the instance

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'No image provided.'}, status=status.HTTP_400_BAD_REQUEST)

    def remove_cloudinary_prefix(self, url):
        # Remove the specified prefix from the Cloudinary URL
        prefix_to_remove = "https://res.cloudinary.com/dzplxvf5r/"
        if url.startswith(prefix_to_remove):
            return url[len(prefix_to_remove):]
        return url
    def get_queryset(self):
        return AddCampaign.objects.all()
    
    
