from django.db import models


class Company(models.Model):
    company_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    size = models.IntegerField()
    logo = models.CharField()


class Advertisement(models.Model):
    advertisement_id = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=1200)
    salary = models.FloatField()
    title = models.CharField()
    city = models.CharField()
    isActive = models.BooleanField()
    contract_type = models.CharField(
        max_length=10,
        choices=[
            ("CDI", "CDI"),
            ("CDD", "CDD"),
            ("Freelance", "Freelance"),
            ("Stage", "Stage"),
        ],
        default="CDI",
    )
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    environment = models.CharField(
        max_length=10,
        choices=[
            ("site", "site"),
            ("remote", "remote"),
            ("hybrid", "hybrid"),
        ],
        default="site",
    )
    created_at = models.DateField()
    updated_at = models.DateField()


class Application(models.Model):
    id = models.IntegerField(primary_key=True)
    fullname = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=50)
    cv = models.FileField(upload_to="documents/cv/")
    cover_letter = models.FileField(upload_to="documents/cover_letter/")
    advertisement = models.ForeignKey(Advertisement, on_delete=models.CASCADE)


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    full_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    created_at = models.DateField()
    role = models.CharField(
        max_length=10,
        choices=[
            ("user", "user"),
            ("recruiter", "recruiter"),
            ("admin", "admin"),
        ],
        default="user",
    )
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
