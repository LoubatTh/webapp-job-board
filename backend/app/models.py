from django.db import models
from .models import Company
from .models import Application


class Advertisement(models.Model):
    advertisement_id = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=1200)
    salary = models.FloatField
    publication_date = models.DateField

    ENVIRONMENT_CHOICES = [
        ('hybrid', 'Hybrid'),
        ('remote', 'Remote'),
        ('site', 'Site'),
    ]
      
    environment = models.CharField(
        max_length=10,
        choices=ENVIRONMENT_CHOICES,
        default='site',
    )

    skills = models.CharField
    title = models.CharField
    city = models.CharField
    isActive = models.BooleanField
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)

class Company(models.Model):
    company_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    size = models.IntegerField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    advertissement = models.ForeignKey(Advertisement, on_delete=models.CASCADE)
    
