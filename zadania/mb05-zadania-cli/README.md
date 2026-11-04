# Lista zadań w konsoli

Program do zarządzania listą zadań z poziomu terminala. Pozwala dodawać zadania,
wyświetlać je oraz oznaczać jako wykonane. Lista jest zapisywana w pliku JSON,
dzięki czemu zadania pozostają dostępne po ponownym uruchomieniu programu.

## Informacje o środowisku

- System operacyjny: macOS
- Środowisko programistyczne: Visual Studio Code
- Język: JavaScript
- Wersja Node.js: 26.13.0 lub nowsza

## Uruchomienie

Projekt nie ma zewnętrznych zależności, więc nie trzeba nic instalować poza
Node.js. Aby rozpocząć pracę:

1. Otwórz terminal.
2. Przejdź do katalogu projektu.
3. Uruchom jedno z poleceń opisanych w tabeli **Skrypty**.

## Struktura projektu

| Plik | Zawartość |
|---|---|
| `app.js` | obsługa poleceń z terminala oraz wyświetlanie komunikatów |
| `magazyn.js` | wczytywanie i zapisywanie listy zadań w pliku JSON |
| `zadania.json` | dane zapisane przez program |
| `package.json` | konfiguracja projektu i definicje skryptów npm |
| `.gitignore` | wskazuje pliki, których nie należy śledzić w repozytorium |

## Skrypty

| Polecenie | Działanie |
|---|---|
| `npm run lista` | wyświetla wszystkie zadania wraz z ich statusem |
| `npm run dodaj -- "tekst zadania"` | dodaje nowe zadanie do listy |
| `npm run zrobione -- numer` | oznacza zadanie o podanym numerze jako wykonane |

Podwójny myślnik `--` przekazuje argument do programu. Jest potrzebny przy
podawaniu tekstu zadania lub jego numeru przez skrypt npm.

## Przykład

```text
$ npm run dodaj -- "Kupić mleko"
Dodano zadanie nr 1: Kupić mleko

$ npm run dodaj -- "Oddać książkę"
Dodano zadanie nr 2: Oddać książkę

$ npm run zrobione -- 2
Zadanie nr 2 oznaczone jako zrobione: Oddać książkę

$ npm run lista
1. [ ] Kupić mleko
2. [x] Oddać książkę
```

## Autor

Hubert Lebioda, 4p1T