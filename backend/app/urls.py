from django.urls import path

from .views import hello, AdvertisementController, CompanyController , ApplicationController

urlpatterns = [
    path("hello", hello, name="hello"),
    path("advertisement/<int:pk>", AdvertisementController.as_view(), name="advertisement"),
    path('company', CompanyController.as_view(), name="company"),
    path('company/<int:pk>', CompanyController.as_view(), name="company"),
    path('application/<int:pk>', ApplicationController.as_view(), name="application"),
    path('application', ApplicationController.as_view(), name="application"),
]
