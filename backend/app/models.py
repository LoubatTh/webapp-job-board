from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin , BaseUserManager
from django.db import models
from django.contrib.auth.hashers import make_password



class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    size = models.IntegerField()
    logo = models.CharField()


class Advertisement(models.Model):
    advertisement_id = models.AutoField(primary_key=True)
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
            ("Alternance", "Alternance")
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
    id = models.AutoField(primary_key=True)
    fullname = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=50)
    cv = models.CharField(max_length=150)
    cover_letter = models.CharField(max_length=500)
    advertisement = models.ForeignKey(Advertisement, on_delete=models.CASCADE)


class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None, number=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email, number=number)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, email, password=None, number=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password, number)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	number = models.IntegerField(max_length=15)
	is_staff = models.BooleanField(default=False)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username','number']
	objects = AppUserManager()
	def __str__(self):
		return self.username
	
	


