from django.urls import path
from . import views
from .views import hello, AdvertisementController, CompanyController , ApplicationController, CompanyAdvertisementController

urlpatterns = [
    path("hello", hello, name="hello"),
    path("advertisement/<int:pk>/", AdvertisementController.as_view(), name="advertisement"),
    path("advertisement", AdvertisementController.as_view(), name="advertisement"),
    path('company', CompanyController.as_view(), name="company"),
    path('company/<int:pk>/', CompanyController.as_view(), name="company"),
    path('company/advertisement/', CompanyAdvertisementController.as_view(), name="company_advertisement"),
    path('application/<int:pk>/', ApplicationController.as_view(), name="application"),
    path('application', ApplicationController.as_view(), name="application"),
    path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
]
