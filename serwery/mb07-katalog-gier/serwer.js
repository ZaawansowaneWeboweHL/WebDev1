import express from 'express';
import {gry} from './dane.js';
import path from 'node:path';
import routerGier from './trasy/gry.js';

const app = express();
const PORT = 3000;

/**
 * Loguje każde żądanie w terminalu, dodając do niego czas wykonania.
 * @param {import('express').Request} req żądanie HTTP
 * @param {import('express').Response} res odpowiedź HTTP
 * @param {import('express').NextFunction} next funkcja uruchamiająca kolejne middleware
 * @returns {void} przekazuje żądanie dalej
 */
const logger = (req, res, next) => {
    req.czasZadania = new Date().toLocaleTimeString('pl-PL');
    console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
    next();
};
app.use(logger);

/** Rejestruje trasy katalogu gier pod wspólnym prefiksem `/gry`. */
app.use('/gry', routerGier);

/** Umożliwia odczyt danych JSON przesyłanych w treści żądania. */
app.use(express.json());

/** Umożliwia odczyt danych formularzy przesyłanych w treści żądania. */
app.use(express.urlencoded({ extended: true }));

/** Udostępnia pliki statyczne z katalogu `public`, w tym stronę główną. */
app.use(express.static(path.join(import.meta.dirname, "public")));

/** GET /szukaj?wydawca=&max=&gracze= - filtrowanie katalogu; brak parametrów = cała lista. */
app.get('/szukaj', (req, res) => {
    const { wydawca, max, gracze } = req.query;
    let wynik = gry;

    if (wydawca){
        wynik = wynik.filter((w) => w.wydawca.toLowerCase() === wydawca.toLowerCase());
    }
    if (max){
        wynik = wynik.filter((w) => w.cena <= Number(max));
    }
    if (gracze){
        wynik = wynik.filter((w) => w.gracze >= Number(gracze))
    }

    res.json(wynik);
});

/** GET /statystyki - liczba gier, średnia cena i nazwa najdroższej gry. */
app.get('/statystyki', (req, res) => {
    const sumaCen = gry.reduce((suma, g) => suma + g.cena, 0);
    const srednia = sumaCen / gry.length;
    const najdrozsza = gry.reduce((a, b) => (b.cena > a.cena ? b : a));

    res.json({
        liczbaGier: gry.length,
        sredniaCena: Math.round(srednia*100)/100,
        najdrozsza: najdrozsza.nazwa,
        wygenerowano: req.czasZadania
    });
});

/** POST /echo - odsyła treść żądania; służy do sprawdzania, jak serwer czyta dane. */
app.post('/echo', (req, res) => {
    console.log(req.body);
    res.json({odebrano: req.body});
});

/** GET /blad - celowo zgłasza błąd, aby można było sprawdzić obsługę błędów 500. */
app.get("/blad", () => {
    throw new Error("Testowy błąd");
});

/** Nieznany adres: JSON dla tras z danymi, strona HTML dla reszty. */
app.use((req, res) => {
    const czyDane = ["/gry", "/szukaj", "/statystyki"].some((p) => req.url.startsWith(p));

    if (czyDane){
        res.status(404).json({blad: "Nie ma takiej trasy."});
        return;
    }

    res.status(404).send("<h1>404 - Nie ma takiej strony</h1>");
});

/** Zwraca JSON ze statusem 500 po błędzie zgłoszonym przez trasę. */
app.use((err, req, res, next) => {
    console.error("Błąd:", err.message);
    res.status(500).json({blad: "Błąd serwera"});
});

app.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}`);
});
