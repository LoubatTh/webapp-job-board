from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializer import AdvertisementSerializer
from .models import Advertisement


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
