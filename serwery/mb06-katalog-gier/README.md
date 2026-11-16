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
   cd serwery/mb06-katalog-gier
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

## Struktura projektu

| Plik | Zawartość |
|---|---|
| `serwer.js` | konfiguracja Expressa i obsługa tras HTTP |
| `dane.js` | lista gier planszowych |
| `package.json` | konfiguracja projektu i skrypty npm |
| `package-lock.json` | dokładne wersje zainstalowanych zależności |
| `.gitignore` | pliki pomijane przez system kontroli wersji |

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

### Jedna gra

Adres: `http://localhost:3000/gry/2`

```json
{
  "id": 2,
  "nazwa": "Carcassonne",
  "wydawca": "Rebel",
  "cena": 99,
  "gracze": 5
}
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
