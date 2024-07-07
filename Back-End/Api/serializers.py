from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user', 'user_code', 'password', 'nom', 'prenom', 'email', 'telephone', 'role', 'filiere']


class DisponibiliteSerializer(serializers.ModelSerializer):

    #id_user=UserSerializer()

    class Meta:

        model = Disponibilite
        fields = ["id_user", "day_of_week", "hour"]
        
        
class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id_exam', 'subject', 'day_of_week', 'hour', 'salle','filiere']
        
class LoginSerializer(serializers.Serializer):
    user_code = serializers.CharField()
    password = serializers.CharField()
    
class AssignmentSerializer(serializers.ModelSerializer):
    
    exam = ExamSerializer()
    
    class Meta:
        model = Assignments
        fields = ['id','exam','surveillant']
        
