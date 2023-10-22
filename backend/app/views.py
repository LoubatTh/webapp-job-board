from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import AdvertisementSerializer
from .serializer import CompanySerializer
from .serializer import ApplicationSerializer
from .models import Advertisement
from .models import Company
from .models import Application
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import get_user_model, login, logout
from .serializer import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validations import custom_validation, validate_email, validate_password


# Create your views here.
def hello(request):
    return HttpResponse("Hello")


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        """
        Vérifie si l'utilisateur a la permission d'accéder à la vue.

        Cette méthode est appelée pour chaque requête HTTP pour déterminer
        si l'utilisateur a la permission d'accéder à la vue.

        :param request: Requête HTTP
        :param view: Vue Django REST framework
        :return: True si l'utilisateur a la permission, False sinon
        """
        # Les utilisateurs authentifiés ont la permission de lecture (GET)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Seuls les utilisateurs administrateurs ont la permission pour les autres méthodes (POST, PUT, DELETE)
        return request.user and request.user.is_superuser


class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and request.user.is_staff


class AdvertisementController(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, pk=None):
        """
        Méthode GET pour récupérer les données de l'annonce.

        Si un identifiant (pk) est fourni, renvoie les détails de l'annonce spécifiée.
        Sinon, renvoie une liste de toutes les annonces.

        :param request: Requête HTTP
        :param pk: Identifiant de l'annonce (optionnel)
        :return: Réponse avec les données de l'annonce
        """
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
        """
        Méthode POST pour ajouter une nouvelle annonce.

        Crée une nouvelle annonce en utilisant les données fournies dans la requête.

        :param request: Requête HTTP avec les données de la nouvelle annonce
        :return: Réponse avec les données de la nouvelle annonce ou une erreur en cas de validation incorrecte
        """
        serializer = AdvertisementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, pk=None):
        """
        Méthode PUT pour mettre à jour une annonce existante.

        Met à jour les données de l'annonce spécifiée par son identifiant (pk)
        en utilisant les données fournies dans la requête.

        :param request: Requête HTTP avec les données de mise à jour
        :param pk: Identifiant de la publicité à mettre à jour
        :return: Réponse avec les données mises à jour ou une erreur en cas de validation incorrecte
        """
        advertisement = get_object_or_404(Advertisement, pk=pk)
        serializer = AdvertisementSerializer(advertisement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk=None):
        """
        Méthode DELETE pour supprimer une annonce.

        Supprime l'annonce spécifiée par son identifiant (pk).

        :param request: Requête HTTP
        :param pk: Identifiant de l'annonce à supprimer
        :return: Réponse avec un statut 204 No Content pour indiquer que l'annonce a été supprimée
        """
        advertisement = get_object_or_404(Advertisement, pk=pk)
        advertisement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CompanyController(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, pk=None):
        if pk:
            company = get_object_or_404(Company, pk=pk)
            serializer = CompanySerializer(company, context={"request": request})
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


class CompanyAdvertisementController(APIView):
    permission_classes = [IsStaff]

    def get(self, request):
        company = request.user.company
        advertisement = Advertisement.objects.filter(company=company)
        serializer = AdvertisementSerializer(advertisement, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdvertisementApplicationController(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        advertisement = get_object_or_404(Advertisement, pk=pk)
        application = Application.objects.filter(advertisement=advertisement)
        serializer = ApplicationSerializer(application, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ApplicationController(APIView):
    permission_classes = [IsAdminOrReadOnly]

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
        serializer = ApplicationSerializer(application, data=request.data)
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


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """
        Méthode POST pour l'inscription d'un nouvel utilisateur.

        Valide les données de l'utilisateur, crée un utilisateur s'il est valide,
        puis renvoie une réponse appropriée.

        :param request: Requête HTTP avec les données d'inscription
        :return: Réponse avec les données de l'utilisateur nouvellement inscrit ou une erreur en cas de validation incorrecte
        """
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        """
        Méthode POST pour la connexion de l'utilisateur.

        Valide les données de connexion, authentifie l'utilisateur s'il est valide,
        puis renvoie une réponse appropriée.

        :param request: Requête HTTP avec les données de connexion
        :return: Réponse avec les données de l'utilisateur connecté ou une erreur en cas de validation incorrecte
        """
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        """
        Méthode POST pour la déconnexion de l'utilisateur.

        Déconnecte l'utilisateur et renvoie une réponse appropriée.

        :param request: Requête HTTP de déconnexion
        :return: Réponse avec un statut HTTP 200 OK pour indiquer la déconnexion réussie
        """
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        """
        Méthode GET pour récupérer les informations de l'utilisateur connecté.

        Renvoie les informations de l'utilisateur connecté dans une réponse.

        :param request: Requête HTTP
        :return: Réponse avec les données de l'utilisateur connecté
        """
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)
