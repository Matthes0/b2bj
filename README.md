Projekt zespołowy umcs 

Członkowie:
- Mateusz Targoński (Matthes0)
- Krzysztof Chęć (KrzysztofChec)
- Piotr Sidorowicz (Hajter74/Hajter72)
- Jakub Woźniak (Woznq)

Cechy projektu:

- 5 gier losowych, w których można obstawiać walutę
- obsługa autentyfikacji i autoryzacji użytkowników
- podział projektu na backend i frontend 
- obsługa płatności payU (częściowa)


backend: 

Serwer napisany w Django.
Wymagane zależności:
- pip install django
- pip install django-extensions
- pip install djangorestframework
- pip install django-cors-headers
- pip install django-countries
- pip install Pillow
- pip install python-dotenv
- pip install requests

Konieczne jest też stworzenie pliku .env w folderze backend z podanymi parametrami (z poprawnymi danymi zamiast XXX):
- PAYU_POS_ID=XXX
- PAYU_CLIENT_ID=XXX
- PAYU_CLIENT_SECRET=XXX
- PAYU_SECOND_KEY=XXX

launching:
- python manage.py runserver

frontend:

Aplikacja napisana w bibliotece React.
Wymagane zależności:
- node.js

launching:
- npm install
- npm run dev
