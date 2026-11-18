import express from 'express';
import {gry} from './dane.js';
import path from 'node:path';
import routerGier from './trasy/gry.js';

const app = express();
const PORT = 3000;

/**
 * Loguje każde żądanie w terminalu : godzina, metoda i adres.
 * Dodaje do żądania pole `req.czasZadania` (godzina w formacie HH:MM:SS),
 * z którego korzysta trasa /statystyki.
 */
const logger = (req, res, next) => {
    req.czasZadania = new Date().toLocaleTimeString('pl-PL');
    console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
    next();
}
app.use(logger);
app.use('/gry', routerGier);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}`);
});
