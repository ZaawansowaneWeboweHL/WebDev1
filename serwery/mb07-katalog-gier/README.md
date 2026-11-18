# Katalog gier planszowych

Serwer HTTP udostępniający katalog gier planszowych. Aplikacja pozwala pobierać
listę gier, wyszukiwać je według parametrów oraz wyświetlać podstawowe
statystyki katalogu.

## Informacje o środowisku

- System operacyjny: macOS
- Środowisko programistyczne: Visual Studio Code
- Język: JavaScript
- Środowisko uruchomieniowe: Node.js
- Framework: Express
- Port serwera: `3000`

## Uruchomienie

1. Otwórz terminal.
2. Przejdź do katalogu projektu:

   ```bash
   cd serwery/mb07-katalog-gier
   ```

3. Zainstaluj zależności:

   ```bash
   npm install
   ```

4. Uruchom serwer:

   ```bash
   npm run dev
   ```

   Serwer będzie dostępny pod adresem `http://localhost:3000`.

Do jednorazowego uruchomienia bez automatycznego restartu można użyć
`npm start`.

## Struktura projektu

| Plik lub katalog | Zawartość |
|---|---|
| `serwer.js` | konfiguracja Expressa, middleware i trasy HTTP |
| `trasy/gry.js` | router obsługujący `/gry` i `/gry/:id` |
| `dane.js` | lista gier planszowych używana przez API |
| `public/` | statyczna strona HTML i arkusz stylów |
| `zapytania.http` | przykładowe żądania do testowania endpointu `/echo` |
| `package.json` | konfiguracja projektu i skrypty npm |
| `package-lock.json` | dokładne wersje zależności |

## Skrypty

| Polecenie | Działanie |
|---|---|
| `npm install` | instaluje zależności projektu |
| `npm start` | uruchamia serwer poleceniem `node serwer.js` |
| `npm run dev` | uruchamia serwer przez `nodemon`, który restartuje go po zmianach |

## Trasy

| Metoda | Adres | Opis | Odpowiedź |
|---|---|---|---|
| GET | `/` | strona główna z listą dostępnych tras | HTML |
| GET | `/gry` | pełna lista gier planszowych | JSON |
| GET | `/gry/:id` | jedna gra o podanym numerze; `404`, gdy gra nie istnieje | JSON |
| GET | `/szukaj?wydawca=&max=&gracze=` | filtrowanie katalogu według wydawcy, ceny i liczby graczy | JSON |
| GET | `/statystyki` | liczba gier, średnia cena i nazwa najdroższej gry | JSON |

## Middleware

| Middleware | Działanie |
|---|---|
| `logger` | loguje godzinę, metodę i adres każdego żądania; dodaje `req.czasZadania` |
| `express.json()` | odczytuje treść żądania w formacie JSON |
| `express.urlencoded({ extended: true })` | odczytuje dane formularzy |
| `express.static(...)` | wysyła pliki statyczne z katalogu `public` |

## Przykłady

### Lista wszystkich gier

Adres: `http://localhost:3000/gry`

```json
[
  {
    "id": 1,
    "nazwa": "Osadnicy z Catanu",
    "wydawca": "Galakta",
    "cena": 169,
    "gracze": 4
  }
]
```

### Wyszukiwanie

Adres: `http://localhost:3000/szukaj?wydawca=Rebel&max=150`

Zwraca gry wydawcy `Rebel` w cenie nie większej niż `150`.

### Statystyki

Adres: `http://localhost:3000/statystyki`

```json
{
  "liczbaGier": 10,
  "sredniaCena": 146,
  "najdrozsza": "Azul"
}
```

## Autor

Hubert Lebioda, 4p1T
