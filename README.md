# Flask CRUD

Prosty projekt CRUD w Pythonie i Flasku z małym frontendem w HTML, CSS i JavaScript.

## Co pokazuje ten projekt

- `Create` - dodawanie użytkownika
- `Read` - pobieranie i wyświetlanie listy użytkowników
- `Update` - edycja użytkownika
- `Delete` - usuwanie użytkownika

## Technologie

- Python
- Flask
- HTML
- CSS
- JavaScript

## Jak uruchomić

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Aplikacja uruchomi się pod adresem:

```bash
http://127.0.0.1:5000
```

## Endpointy API

- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/<id>`
- `DELETE /api/users/<id>`

## Co możesz jeszcze dodać

- walidację formularza po stronie frontendowej
- bazę danych, np. SQLite
- SQLAlchemy
- komunikaty `flash`
- logowanie użytkownika
- testy jednostkowe
- deployment na Render lub Railway
