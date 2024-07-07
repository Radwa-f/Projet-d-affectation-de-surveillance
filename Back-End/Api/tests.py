#tests.py
from django.test import TestCase
from faker import Faker
from .models import Supervisor, Exam

class SupervisorExamAssignmentIntegrationTest(TestCase):
    def setUp(self):
        self.faker = Faker()
        # Créer des données de test pour les surveillants et les examens en utilisant Faker
        for _ in range(10): # Générer 10 surveillants et 10 examens
            Supervisor.objects.create(
                name=self.faker.name(),
                day_of_week=self.faker.random_element(elements=('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
                periode=self.faker.random_element(elements=('MORNING', 'AFTERNOON'))
            )
            Exam.objects.create(
                name=self.faker.name(),
                day_of_week=self.faker.random_element(elements=('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
                periode=self.faker.random_element(elements=('MORNING', 'AFTERNOON'))
            )

    def test_supervisor_exam_assignment(self):
        # Appeler votre algorithme d'affectation ici
        # Vous pouvez ensuite vérifier si les affectations sont correctes en utilisant les méthodes d'assertion de Django.
        pass