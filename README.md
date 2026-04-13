# Simple CRUD App

Prosta aplikacja do dodawania, edycji, wyswietlania i usuwania uzytkownikow.

## Technologie

- Angular
- Flask
- TypeScript
- HTML
- CSS

## Jak uruchomic lokalnie

Najpierw backend Flask:

```bash
.venv\Scripts\activate
python app.py
```

W drugim terminalu frontend Angular:

```bash
npm install
npm start
```

## Adresy lokalne

- frontend: `http://127.0.0.1:4200`
- backend API: `http://127.0.0.1:5050/api/users`

## Build frontendu

```bash
npm run build
```

## Netlify

Na Netlify frontend Angular jest publikowany jako statyczna strona, a endpointy `/api/users`
sa obslugiwane przez Netlify Functions z katalogu `netlify/functions`.

Wazne: dane uzytkownikow w tej wersji sa trzymane tylko w pamieci funkcji. To oznacza, ze po
nowym uruchomieniu funkcji lub nowym deployu zmiany moga zniknac. Jesli chcesz trwale
zapisywanie danych, trzeba podlaczyc baze danych lub Netlify Blobs.
