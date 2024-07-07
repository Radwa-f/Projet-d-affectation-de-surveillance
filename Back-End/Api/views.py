from argparse import Action
from urllib import request
from django.shortcuts import get_list_or_404, get_object_or_404
import secrets
import string
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework import filters
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from django.core.mail import send_mail
from .models import *
from .serializers import *
from scipy.optimize import linear_sum_assignment
from django.utils.crypto import get_random_string
import json
from django.http import JsonResponse
# Create your views here.


@method_decorator(csrf_exempt, name='dispatch')
class UserView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['role'] 
    
    def perform_create(self, serializer):
        user = serializer.save()
        if(user.filiere =="none"):
            subject = 'Bienvenue sur notre plateforme EnsajExams!'
            message = f'Bonjour {user.nom},\n\n Bienvenue sur notre plateforme. Votre compte a été créé avec succès.\n\nVous pouvez maintenant vous connecter en utilisant votre code {user.user_code}  et mot de passe:{user.password}.\n\nmerci!'
            sender_email = 'examsensaj@gmail.com' 
            recipient_email = [user.email]
            send_mail(subject, message, sender_email, recipient_email)
        else:
            subject = 'Bienvenue sur notre plateforme EnsajExams!'
            message = f'Bonjour {user.nom},\n\n Bienvenue sur notre plateforme. Votre compte a été créé avec succès.\n\nVous recevrez votre horaire d\'examen lorsqu\'ils seront prêts.\n\nmerci!'
            sender_email = 'examsensaj@gmail.com' 
            recipient_email = [user.email]
            send_mail(subject, message, sender_email, recipient_email)
        
    
    @action(detail=False, methods=['post'])
    def forgot_password(self, request):
        email = request.data.get('email')
        if email:
            user = User.objects.get(email=email)  # Assuming User is your custom model
            new_password = self.generate_random_password()  # Generate a new random password (assuming you have a method to generate passwords)
            user.password = new_password
            user.save()

                    # Send an email with the new password
            subject = 'Nouveau Mot de Passe'
            message = f'Bonjour {user.nom},\n\nVotre mot de passe a été réinitialisé. Nouveau Mot de Passe: {new_password}\n\nMerci!'
            sender_email = 'examsensaj@gmail.com' 
            recipient_email = [user.email]
            send_mail(subject, message, sender_email, recipient_email)
            return JsonResponse({'message': 'Password reset successfully. Check your email for the new password.'}, status=200)
            
        else:
            return JsonResponse({'error': 'Email is required.'}, status=400)
    
    def generate_random_password(self, length=12):
        alphabet = string.ascii_letters + string.digits + string.punctuation
        return ''.join(secrets.choice(alphabet) for _ in range(length))
 


    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = 'pk'
        lookup_field = 'id_user'  

        if self.kwargs.get(lookup_url_kwarg).isdigit():
            lookup_field = 'id_user'
        else:
            lookup_field = 'user_code'

        user = get_object_or_404(queryset, **{lookup_field: self.kwargs.get(lookup_url_kwarg)})

        self.check_object_permissions(self.request, user)

        return user


    
@method_decorator(csrf_exempt, name='dispatch')
class DisponibilteView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = DisponibiliteSerializer
    queryset = Disponibilite.objects.all()
    
@method_decorator(csrf_exempt, name='dispatch')
class ExamView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ExamSerializer
    queryset = Exam.objects.all()
    
    @action(detail=False, methods=['delete'])
    def delete_by_filiere(self, request):
        filiere = request.query_params.get('filiere', None)
        if filiere is not None:
            Exam.objects.filter(filiere=filiere).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Filiere parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def create_assignments(self, request):
        filiere = request.data.get('filiere', None)
        if not filiere:
            return JsonResponse({"error": "Filiere parameter is required."}, status=400)

        exams = Exam.objects.filter(filiere=filiere)
        

        for exam in exams:

            disponibilites = Disponibilite.objects.filter(
                Q(day_of_week=exam.day_of_week),
                Q(hour=exam.hour)
            )

            for disponibilite in disponibilites:

                existing_assignment_obj = Assignments.objects.filter(
                    exam__day_of_week=exam.day_of_week,
                    exam__hour=exam.hour,
                    surveillant=disponibilite.id_user.nom
                ).first()

                if not existing_assignment_obj:

                    Assignments.objects.create(exam=exam, surveillant=disponibilite.id_user.nom)
                    break
                else:
                    pass

        return JsonResponse({"message": "Assignments created successfully."}, status=201)


class LoginViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    queryset = User.objects.none()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user_code = serializer.validated_data.get('user_code')
            password = serializer.validated_data.get('password')
            
            try:
                user = User.objects.get(user_code=user_code, password=password)
                return Response({'id_user': user.id_user, 'role':user.role}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'Invalid user code or password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
def get_user_info(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    serialized_user = UserSerializer(user, fields=('user_code', 'nom', 'prenom', 'email', 'telephone'))
    return JsonResponse(serialized_user.data)
        

@method_decorator(csrf_exempt, name='dispatch')
class AssignmentView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = AssignmentSerializer
    queryset = Assignments.objects.all()

    def get_queryset(self):
        
        queryset = Assignments.objects.all()
        filiere = self.request.query_params.get('filiere')
        surveillant = self.request.query_params.get('surveillant')

        if filiere:
            queryset = queryset.filter(exam__filiere=filiere)
        if surveillant:
            queryset = queryset.filter(surveillant=surveillant)

        return queryset


    @action(detail=False, methods=['get'])
    def by_filiere(self, request, *args, **kwargs):
        filiere = request.query_params.get('filiere', None)
        if filiere:
            queryset = self.filter_queryset(self.get_queryset()).filter(exam__filiere=filiere)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Filiere parameter is required."}, status=400)
        
    @action(detail=False, methods=['get'])
    def by_surveillant(self, request, *args, **kwargs):
        surveillant = request.query_params.get('surveillant', None)
        if surveillant:
            queryset = self.filter_queryset(self.get_queryset()).filter(surveillant=surveillant)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "parameter is required."}, status=400)
    
    
    @action(detail=False, methods=['post'])
    def send_notification(self, request, *args, **kwargs):
        filiere = request.data.get('filiere')
        if not filiere:
            return Response({"error": "Filiere parameter is required."}, status=400)

        users = User.objects.filter(filiere=filiere)

        subject = 'EnsajExams Planning'
        message = f'Votre planning est pret , vous pouvez le veisiter dans le lien :\n\n http://localhost:3000/{filiere}'


        for user in users:
            send_mail(subject, message, 'examsensaj@gmail.com', [user.email])

        return Response({"message": "Notification sent to all users."})
    
