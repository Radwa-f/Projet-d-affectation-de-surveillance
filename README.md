# Plateforme-d-affectation-de-surveillance
Un projet qui a pour but l'affectation optimale des surveillants selon leurs disponibilités et un planning dans le cadre académique. 
Next.js pour le front-end et Django pour le back-end.

Avant de faire fonctionner les deux serveurs back et front, telecharger la base de donnée sur votre locale et faire fonctionner le serveur que vous utiliser (Xampp ou Wampp).

Pour faire fonctionner le back-end on effectuer ces commandes l'une apres l'autre selon l'ordre apres d'etre localiser dans le repertoire "Plateforme" sur votre terminal (ou cmd):

Sur MacOs:

1- #python3 --version ou #python3 --version 
Si selon quel version de python vous trouver vous allez l'utiliser pour les commandes qui suivent.
Ajouter python à vos variables d'environement.

2- #python(3) -m venv env 
On crée un environement virtuel.

3- #source env/bin/activate 
On active l'environement.

4- #pip install django 
Le back-end est un projet de Django, il faut être installer bien sur.

5- #pip install python-dotenv
6- #pip install djangorestframework
7- #pip install django-cors-headers
8- #pip install scipy 
On installe les differents dependencies et librairies utiliser dans le projet.

9- #pip install mysqlclient 
Ajouter mysqlclient à vos variable d'environement

10- #python(3) manage.py runserver
On fait fonctionner le serveur.


Sur Windows:

1- #python3 --version ou #python3 --version 
Ajouter python à vos variables d'environement.

2- #python(3) -m venv env 

3- #.\env\bin\activate 
C'est la seule commande qui differt de MacOs.

4- #pip install django 
5- #pip install python-dotenv
6- #pip install djangorestframework
7- #pip install django-cors-headers
8- #pip install scipy 
Même chose, on installe les differents dépendances et librairies utiliser dans le projet aussi.

9- #pip install mysqlclient 
Ajouter mysqlclient à vos variable d'environement

10- #python3 manage.py runserver
On fait fonctionner le serveur.

Pour faire fonctionner le front-end on effectuer ces commandes l'une apres l'autre apres d'etre localiser dans le repertoire "Front-End" sur votre terminal (ou cmd):

Sur MacOs ou Windows:

1- #node --version ou node -v
Installer Node.js et npm si ce n'est pas déjà fait, téléchargez et installez depuis nodejs.org.

2- #npm install -D tailwindcss postcss autoprefixer
3- #npx tailwindcss init -p
Installer Tailwind CSS et ses dépendances.

4- #npm run dev
On fait fonctionner le serveur. 
Si vous faite face à une erreur de fonctionner, il faudra intaller quelque librairies de react seulement, ils seront afficher dans votre erreur.


## Support

Si vous avez des questions, contacter nous sur ensajexams@gmail.com.


---
Fait avec ❤️ par: Boktaya Amine (https://github.com/BoktayaAmine), Elloubab Aya (https://github.com/aya-elloubab) et moi même Fattouhi Radwa (https://github.com/Radwa-f)
