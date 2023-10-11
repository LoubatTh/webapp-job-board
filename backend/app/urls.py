from django.urls import path

from .views import hello, AdvertisementController, CompanyController

urlpatterns = [
    path("hello", hello, name="hello"),
    path("advertisement", AdvertisementController.as_view(), name="advertisement"),
    path("company", CompanyController.as_view(), name="advertisement"),
]
