from django.urls import path

from .views import hello, AdvertisementController

urlpatterns = [
    path("hello", hello, name="hello"),
    path("advertisement", AdvertisementController.as_view(), name="advertisement"),
]
