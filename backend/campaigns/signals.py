from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import AddCampaign, Campaign

@receiver(post_save, sender=AddCampaign)
def update_campaign(sender, instance, created, **kwargs):
    try:
        campaign = Campaign.objects.get(id=instance.id)
    except Campaign.DoesNotExist:
        campaign = Campaign.objects.create(
            id=instance.id,
            title=instance.title,
            description=instance.description,
            slug=instance.slug,
            logo=instance.logo
        )
    else:
        campaign.title = instance.title
        campaign.description = instance.description
        campaign.slug = instance.slug
        campaign.logo = instance.logo
        campaign.save()