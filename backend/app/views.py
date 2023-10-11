from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializer import AdvertisementSerializer
from .serializer import CompanySerializer
from .serializer import ApplicationSerializer
from .serializer import UserSerializer
from .models import User
from .models import Advertisement
from .models import Company
from .models import Application



# Create your views here.
def hello(request):
    return HttpResponse("Hello")


class AdvertisementController(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk=None):
        if pk:
            advertisement = get_object_or_404(Advertisement, pk=pk)
            serializer = AdvertisementSerializer(
                advertisement, context={"request": request}
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            advertisement = Advertisement.objects.all()
            serializer = AdvertisementSerializer(advertisement, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AdvertisementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, pk=None):
        advertisement = get_object_or_404(Advertisement, pk=pk)
        serializer = AdvertisementSerializer(advertisement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk=None):
        advertisement = get_object_or_404(Advertisement, pk=pk)
        advertisement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


class CompanyController(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk=None):
        if pk:
            company = get_object_or_404(Company, pk=pk)
            serializer = CompanySerializer(
                company, context={"request": request}
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            company = Company.objects.all()
            serializer = CompanySerializer(company, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )   

    def put(self, request, pk=None):
        company = get_object_or_404(Company, pk=pk)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )     
    
    def delete(self, request, pk=None):
        company = get_object_or_404(Company, pk=pk)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ApplicationController(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk=None):
        if pk:
            application = get_object_or_404(Application, pk=pk)
            serializer = ApplicationSerializer(
            application, context={"request": request}
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            application = Application.objects.all()
            serializer = ApplicationSerializer(application, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )   
    
    def put(self, request, pk=None):
        application = get_object_or_404(Application, pk=pk)
        serializer = CompanySerializer(application, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )    
    
    def delete(self, request, pk=None):
        application = get_object_or_404(Application, pk=pk)
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserController(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(
                user, context={"request": request}
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            user = User.objects.all()
            serializer = UserSerializer(user, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )
    
    def put(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )
    
    def delete(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


