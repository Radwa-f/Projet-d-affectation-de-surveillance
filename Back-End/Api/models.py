from django.db import models

# Create your models here.

class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    user_code = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    telephone = models.CharField(max_length=20)
    role = models.CharField(max_length=20)
    filiere = models.CharField(max_length=20,null=True)
    
    def __str__(self):
        return f"{self.nom} {self.prenom}"
    


class Exam(models.Model):
    id_exam= models.AutoField(primary_key=True)
    subject = models.CharField(max_length=100)
    

    day_of_week = models.CharField(max_length=10)
    hour = models.CharField(max_length=25, null=True)
    salle=models.CharField(max_length=10,null=True)
    filiere = models.CharField(max_length=100,null=True)


    def __str__(self):
        return f"{self.subject}"




class Disponibilite(models.Model):
    id_dispo = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)

    day_of_week = models.CharField(max_length=10)
    hour = models.CharField(max_length=25)

    def _str_(self):
        return self.day_of_week + " " + self.hour
    
class Exam(models.Model):
    id_exam= models.AutoField(primary_key=True)
    subject = models.CharField(max_length=100)
    day_of_week = models.CharField(max_length=10)
    hour = models.CharField(max_length=25, null=True)
    salle=models.CharField(max_length=10,null=True)
    filiere = models.CharField(max_length=100,null=True)


    def __str__(self):
        return f"{self.subject}"
    
class Assignments(models.Model):

    id=models.AutoField(primary_key=True)
    exam=models.ForeignKey(Exam,on_delete=models.CASCADE)
    surveillant=models.CharField(max_length=100)

    def _str_(self):
        return self.exam.subject + " " + self.surveillant